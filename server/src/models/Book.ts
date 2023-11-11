interface CommonBook {
  title: string;
  author: string;
  publisher: string;
  year_publication: number;
  number_pages: number;
  observation: string;
  amount: number;
}

export interface Book extends CommonBook {
  book_id: number;
  user_id: number;
  bookcase_id: number;
  shelf_id: number;
  box_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface PostBook extends CommonBook {
  bookcase_name: string;
  shelf_name: string;
  box_name: string;
}
