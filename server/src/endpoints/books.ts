import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";
import { Book } from "../models/Book";

export const booksGetMany = async (req: Request, res: Response) => {
  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "books as b",
    });

    const finalQuery = await query
      .leftJoin("users as u", "b.user_id", "u.user_id")
      .leftJoin("bookcases as bc", "b.bookcase_id", "bc.bookcase_id")
      .leftJoin("shelfs as s", "b.shelf_id", "s.shelf_id")
      .leftJoin("boxes as bx", "b.box_id", "bx.box_id")
      .select(
        "u.name as user_name",
        "bc.name as bookcase_name",
        "s.name as shelf_name",
        "bx.name as box_name",
        "b.*",
      );

    res.send({ items: finalQuery, total });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const booksPostOne = async (req: Request, res: Response) => {
  const body: Book = req.body;
  const { user_id } = req;

  try {
    const book = await database<Book>("books")
      .whereILike("title", `%${body.title}%`)
      .andWhereILike("author", `%${body.author}%`)
      .first();

    if (book) return res.status(400).send({ error: "Livro já existente" });

    const [insertedBook] = await database("books")
      .insert({ ...body, user_id })
      .returning("*");

    await database("logs").insert({
      user_id,
      description: `Livro "${body.title}" criado com sucesso`,
      method: "POST",
    });

    res.send(insertedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const booksPatchOne = async (req: Request, res: Response) => {
  const { book_id } = req.params;
  const book: Partial<Book> = req.body;

  try {
    const existBook = await database("books").where({ book_id }).first();

    if (!existBook) {
      res.status(404).send({ error: "Livro não encontrado" });
      return;
    }

    const [updatedBook] = await database("books")
      .where({ book_id })
      .update(book)
      .returning("*");

    await database("logs").insert({
      user_id: req.user_id,
      description: `Livro "${book.title}" atualizado com sucesso`,
      method: "PATCH",
    });

    res.send(updatedBook);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const booksDeleteOne = async (req: Request, res: Response) => {
  const { book_id } = req.params;
  const { user_id } = req;

  try {
    const bookQuery = database<Book>("books").where("book_id", book_id);
    const book = await bookQuery.first();

    if (!book) return res.status(404).send({ error: "Livro não encontrado" });

    const [deletedBook] = await database("books")
      .where("book_id", book_id)
      .del()
      .returning("*");

    await database("logs").insert({
      user_id,
      description: `Livro ${book.title} deletado com sucesso`,
      method: "DELETE",
    });

    res.send(deletedBook);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
