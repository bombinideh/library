import { QueryOptions } from "./react-query";

export interface GetManyQueryResponse<T> {
  items: T[];
  total: number;
}

export interface GetManyQueryProps {
  searchColumn?: string;
  searchQuery?: string;
  items?: number;
  page?: number;
  orderColumn?: string;
  orderOrientation?: "ASC" | "DESC";
}

export interface GetManyQueryPropsHook<T> extends GetManyQueryProps {
  queryOptions?: QueryOptions<GetManyQueryResponse<T>>;
}
