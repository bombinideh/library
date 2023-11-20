import { GetManyQueryResponse } from "@/types/api";

export interface Shelf {
  shelf_id: number;
  bookcase_id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ShelfsResponse = GetManyQueryResponse<Shelf>;
