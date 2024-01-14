import { GetManyQueryResponse } from "@/types/api";

export interface Box {
  box_id: number;
  shelf_id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BoxResponse extends Box {
  bookcase_id: number;
  bookcase_name: string;
  shelf_name: string;
}

export type BoxesResponse = GetManyQueryResponse<BoxResponse>;
