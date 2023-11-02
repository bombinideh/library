export interface IBook {
  book_id: number;
  user_id: number;
  boockcase_id: number;
  shelf_id: number;
  box_id: number;
  title: string;
  author: string;
  publisher: string;
  year_publication: number;
  number_pages: number;
  observation: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
