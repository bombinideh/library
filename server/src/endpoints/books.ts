import { Request, Response } from "express";
import { IBook } from "../models/Book";
import { database } from "../knex";
import { queryFilter } from "../functions/queryFilter";

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

type BookBody = Omit<
  IBook,
  "book_id" | "user_id" | "book_id" | "created_at" | "updated_at"
>;

export const booksPostOne = async (req: Request, res: Response) => {
  const book: BookBody = req.body;
  const { user_id } = req;

  try {
    const findBook = await database("books")
      .whereILike("title", `%${book.title}%`)
      .andWhereILike("author", `%${book.author}%`)
      .first();

    if (findBook) {
      res.status(400).send({ error: "Book already exists" });
      return;
    }

    const [insertedBook] = await database("books")
      .insert({ user_id: user_id, ...book })
      .returning("*");

    await database("logs").insert({
      user_id: req.user_id,
      description: `Livro ${book.title} criado com sucesso`,
      method: "POST",
    });

    res.send(insertedBook);
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const booksPatchOne = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  const book: Partial<BookBody> = req.body;

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
