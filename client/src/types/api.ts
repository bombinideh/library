import { QueryOptions } from "./react-query";

export interface GetManyQueryResponse<T> {
  items: T[];
  total: number;
}

export interface GetManyQueryProps {
  items?: number;
  page?: number;
  searchColumn?: string;
  searchQuery?: string;
}

export interface GetManyQueryPropsHook<T> extends GetManyQueryProps {
  queryOptions?: QueryOptions<GetManyQueryResponse<T>>;
}
