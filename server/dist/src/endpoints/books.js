"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/endpoints/books.ts
var books_exports = {};
__export(books_exports, {
  booksDeleteOne: () => booksDeleteOne,
  booksGetMany: () => booksGetMany,
  booksPatchOne: () => booksPatchOne,
  booksPostMany: () => booksPostMany,
  booksPostOne: () => booksPostOne
});
module.exports = __toCommonJS(books_exports);

// src/knex.ts
var import_knex = __toESM(require("knex"));
var connection = process.env.POSTGRES_URL ? process.env.POSTGRES_URL : {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};
var database = (0, import_knex.default)({
  client: "pg",
  connection
});

// src/functions/findUniqueBook.ts
var findUniqueBook = async ({ title, author }) => {
  return database("books").select("*").whereILike("title", `%${title}%`).andWhereILike("author", `%${author}%`).first();
};

// src/functions/processQueryThatFindMany.ts
var defaultQueryParams = {
  items: 10,
  page: 1,
  orderColumn: "created_at",
  orderOrientation: "DESC"
};
async function processQueryThatFindMany({
  queryBuilder,
  queryParams
}) {
  const { searchColumn, searchQuery, items, page, orderColumn, orderOrientation } = {
    ...defaultQueryParams,
    ...queryParams
  };
  let query = database.with("query", queryBuilder).from("query");
  if (searchColumn && searchQuery) {
    const register = await query.clone().first();
    if (searchColumn in register)
      query = query.whereRaw(`${searchColumn}::TEXT ILIKE '%${searchQuery}%'`);
  }
  query = query.orderBy(orderColumn, orderOrientation);
  if (items)
    query = query.limit(Number(items));
  if (items && page)
    query = query.offset(Number(items) * (Number(page) - 1));
  const count = await database(queryBuilder._single.table).count("*", { as: "total" }).first();
  return { items: await query, total: Number(count?.total) };
}

// src/endpoints/books.ts
var booksGetMany = async (req, res) => {
  try {
    const query = database("books as b").leftJoin("users as u", "b.user_id", "u.user_id").leftJoin("bookcases as bc", "b.bookcase_id", "bc.bookcase_id").leftJoin("shelfs as s", "b.shelf_id", "s.shelf_id").leftJoin("boxes as bx", "b.box_id", "bx.box_id").select(
      "u.name as user_name",
      "bc.name as bookcase_name",
      "s.name as shelf_name",
      "bx.name as box_name",
      "b.*"
    );
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query
    });
    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var booksPostOne = async (req, res) => {
  const body = req.body;
  const { user_id } = req;
  try {
    const book = await findUniqueBook({ title: body.title, author: body.author });
    if (book)
      return res.status(400).send({ error: "Livro j\xE1 existente" });
    const [insertedBook] = await database("books").insert({ ...body, user_id }).returning("*");
    await database("logs").insert({
      user_id,
      description: `Livro "${body.title}" criado com sucesso`,
      method: "POST"
    });
    res.send(insertedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var booksPatchOne = async (req, res) => {
  const { book_id } = req.params;
  const book = req.body;
  try {
    const existBook = await database("books").where({ book_id }).first();
    if (!existBook) {
      res.status(404).send({ error: "Livro n\xE3o encontrado" });
      return;
    }
    const [updatedBook] = await database("books").where({ book_id }).update(book).returning("*");
    await database("logs").insert({
      user_id: req.user_id,
      description: `Livro "${book.title}" atualizado com sucesso`,
      method: "PATCH"
    });
    res.send(updatedBook);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var booksDeleteOne = async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req;
  try {
    const bookQuery = database("books").where("book_id", book_id);
    const book = await bookQuery.first();
    if (!book)
      return res.status(404).send({ error: "Livro n\xE3o encontrado" });
    const [deletedBook] = await database("books").where("book_id", book_id).del().returning("*");
    await database("logs").insert({
      user_id,
      description: `Livro ${book.title} deletado com sucesso`,
      method: "DELETE"
    });
    res.send(deletedBook);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var booksPostMany = async (req, res) => {
  const {
    bookcase_id,
    shelf_id,
    box_id,
    books
  } = req.body;
  const { user_id } = req;
  try {
    const hasRepeteadBook = books.map(({ title, author }) => title + author).some((item, index, array) => array.indexOf(item) !== index);
    if (hasRepeteadBook)
      return res.status(400).send({ error: "Os livros n\xE3o podem ser repetidos." });
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
      { total: 0, pages: [] }
    );
    if (booksInDatabase.total) {
      const message = (pages) => {
        if (booksInDatabase.total > 1)
          return `Os livros das seguintes p\xE1ginas j\xE1 est\xE3o cadastrados: ${pages}.`;
        return `O livro da p\xE1gina ${pages} j\xE1 est\xE1 cadastrado.`;
      };
      return res.status(409).send({
        error: message(booksInDatabase.pages.join(", "))
      });
    }
    const insertedBooks = await database.transaction(async (db) => {
      const _insertedBooks = await db("books").insert(
        books.map((book) => ({
          user_id,
          bookcase_id,
          shelf_id,
          box_id,
          ...book
        }))
      ).returning("*");
      await database("logs").insert(
        _insertedBooks.map((book) => ({
          user_id,
          description: `Livro "${book.title}" criado com sucesso`,
          method: "POST"
        }))
      );
      return _insertedBooks;
    });
    res.send({ books: insertedBooks });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  booksDeleteOne,
  booksGetMany,
  booksPatchOne,
  booksPostMany,
  booksPostOne
});
