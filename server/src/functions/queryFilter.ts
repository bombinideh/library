import { Request } from "express";
import { database } from "../knex";

interface QueryParams {
  items: number;
  page: number;
  searchColumn?: string;
  searchQuery?: string;
}

interface PaginationProps {
  queryParams: Request["query"];
  table: string;
}

const defaultQueryParams: QueryParams = {
  items: 10,
  page: 1,
  searchColumn: undefined,
  searchQuery: undefined,
};

export function queryFilter({ queryParams, table }: PaginationProps) {
  const { items, page, searchColumn, searchQuery } = {
    ...defaultQueryParams,
    ...queryParams,
  };
  const query = database(table)
    .select("*")
    .limit(items)
    .offset(items * (page - 1));
  let finalQuery = query;

  if (searchColumn && searchQuery)
    finalQuery = query.where(searchColumn, "like", `%${searchQuery}%`);

  const tableTotalItems = database(table).count("*").first();

  return {
    query: finalQuery,
    total: tableTotalItems,
  };
}
