import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";
import { Book, PostBook } from "../models/Book";

export const booksGetMany = async (req: Request, res: Response) => {
  try {
    const { query, total } = queryFilter({
      queryParams: req.query,
      table: "books as b",
    });

    const finalQuery = await query
      .leftJoin("users as u", "b.user_id", "u.user_id")
      .leftJoin("bookcases as bc", "b.bookcase_id", "bc.bookcase_id")
      .leftJoin("shelfs as s", "b.shelf_id", "s.shelf_id")
      .leftJoin("boxes as bx", "b.box_id", "bx.box_id")
      .select(
        "b.*",
        "bc.name as bookcase_name",
        "s.name as shelf_name",
        "bx.name as box_name",
        "u.name as user_name",
      );

    const totalItems = await total;

    res.send({ items: finalQuery, total: Number(totalItems?.count) });
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const booksPostOne = async (req: Request, res: Response) => {
  const body: PostBook = req.body;
  const { user_id } = req;

  try {
    const book = await database<Book>("books")
      .whereILike("title", `%${body.title}%`)
      .andWhereILike("author", `%${body.author}%`)
      .first();

    if (book) return res.status(400).send({ error: "Book already exists" });

    const [insertedBook] = await database.transaction(async db => {
      const { bookcase_name, shelf_name, box_name, ...bookData } = body;
      const entities = {
        bookcases: {
          name: bookcase_name,
          id: 0,
        },
        shelfs: {
          name: shelf_name,
          id: 0,
        },
        boxes: {
          name: box_name,
          id: 0,
        },
      };
      const handleRelationship = async (entityName: string) => {
        const entity = entities[entityName as keyof typeof entities];
        const existingRegister = await db(entityName)
          .where("name", entity.name)
          .first();
        const getId = (register: object) => {
          return Object.keys(register).filter(key => key.endsWith("_id"))[0];
        };

        if (existingRegister) {
          entity.id = existingRegister[getId(existingRegister)];
        } else {
          const [insertedRegister] = await db(entityName)
            .insert({ name: entity.name })
            .returning("*");

          entity.id = insertedRegister[getId(insertedRegister)];
        }
      };

      await Promise.all(Object.keys(entities).map(handleRelationship));

      return await db<Book>("books")
        .insert({
          ...bookData,
          user_id,
          bookcase_id: entities.bookcases.id,
          shelf_id: entities.shelfs.id,
          box_id: entities.boxes.id,
        })
        .returning("*");
    });

    await database("logs").insert({
      user_id,
      description: `Livro ${body.title} criado com sucesso`,
      method: "POST",
    });

    res.send(insertedBook);
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const booksPatchOne = async (req: Request, res: Response) => {
  const { book_id } = req.params;
  const book: Partial<PostBook> = req.body;

  try {
    const existBook = await database("books").where({ book_id }).first();

    if (!existBook) {
      res.status(404).send({ error: "Book not found" });
      return;
    }

    const [updatedBook] = await database("books")
      .where({ book_id })
      .update(book)
      .returning("*");

    await database("logs").insert({
      user_id: req.user_id,
      description: `Livro ${book.title} atualizado com sucesso`,
      method: "PATCH",
    });

    res.send(updatedBook);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
