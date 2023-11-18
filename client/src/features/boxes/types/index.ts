import { GetManyQueryResponse } from "@/types/api";

export interface Box {
  box_id: number;
  shelf_id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type BoxesResponse = GetManyQueryResponse<Box>;
