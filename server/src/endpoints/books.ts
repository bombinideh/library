import { Request, Response } from "express";
import { findUniqueBook } from "../functions/findUniqueBook";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";
import { Book, BookRequestBody } from "../models/Book";
import { Bookcase } from "../models/Bookcase";
import { Box } from "../models/Box";
import { Log } from "../models/Log";
import { Shelf } from "../models/Shelf";

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
  const body: BookRequestBody = req.body;
  const { user_id } = req;

  try {
    const book = await findUniqueBook({ title: body.title, author: body.author });

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

export const booksPostMany = async (req: Request, res: Response) => {
  const {
    bookcase_id,
    shelf_id,
    box_id,
    books,
  }: {
    bookcase_id: Bookcase["bookcase_id"];
    shelf_id: Shelf["shelf_id"];
    box_id: Box["box_id"];
    books: Omit<BookRequestBody, "bookcase_id" | "shelf_id" | "box_id">[];
  } = req.body;
  const { user_id } = req;

  try {
    const hasRepeteadBook = books
      .map(({ title, author }) => title + author)
      .some((item, index, array) => array.indexOf(item) !== index);

    if (hasRepeteadBook)
      return res.status(400).send({ error: "Os livros não podem ser repetidos." });

    const checkBooksInDatabase = books.map(({ title, author }) => {
      return findUniqueBook({ title, author });
    });
    const booksInDatabase = (await Promise.all(checkBooksInDatabase)).reduce(
      (acc, book, index) => {
        if (book) {
          acc.total += 1;
          acc.pages.push(index + 1);
        }

        return acc;
      },
      { total: 0, pages: [] as number[] },
    );

    if (booksInDatabase.total) {
      const message = (pages: string) => {
        if (booksInDatabase.total > 1)
          return `Os livros das seguintes páginas já estão cadastrados: ${pages}.`;

        return `O livro da página ${pages} já está cadastrado.`;
      };

      return res.status(409).send({
        error: message(booksInDatabase.pages.join(", ")),
      });
    }

    const insertedBooks = await database.transaction(async db => {
      const _insertedBooks = await db<Book>("books")
        .insert(
          books.map(book => ({
            user_id,
            bookcase_id,
            shelf_id,
            box_id,
            ...book,
          })),
        )
        .returning("*");

      await database<Log>("logs").insert(
        _insertedBooks.map(book => ({
          user_id,
          description: `Livro "${book.title}" criado com sucesso`,
          method: "POST",
        })),
      );

      return _insertedBooks;
    });

    res.send({ books: insertedBooks });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
