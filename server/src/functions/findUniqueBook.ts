import { database } from "../knex";
import { Book } from "../models/Book";

interface UniqueBookFields {
  title: Book["title"];
  author: Book["author"];
}

export const findUniqueBook = async ({ title, author }: UniqueBookFields) => {
  return database<Book>("books")
    .select("*")
    .whereILike("title", `%${title}%`)
    .andWhereILike("author", `%${author}%`)
    .first();
};
