import { GetManyQueryResponse } from "@/types/api";

export interface Bookcase {
  bookcase_id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type BookcasesResponse = GetManyQueryResponse<Bookcase>;
