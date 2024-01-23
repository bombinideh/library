import { GetManyQueryResponse } from "@/@types/api";

export interface Book {
  book_id: number;
  user_id: number;
  bookcase_id: number;
  shelf_id: number;
  box_id: number;
  title: string;
  author: string;
  publisher: string;
  year_publication: number | null;
  number_pages: number;
  amount: number;
  observation: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface BookResponse extends Book {
  user_name: string;
  bookcase_name: string;
  shelf_name: string;
  box_name: string;
}

export type BooksResponse = GetManyQueryResponse<BookResponse>;
