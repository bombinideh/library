import { database } from "../knex";

interface QueryParams {
  items?: number;
  page?: number;
  searchColumn?: string;
  searchQuery?: string;
}

interface PaginationProps {
  queryParams: QueryParams;
  table: string;
}

export async function queryFilter({ queryParams, table }: PaginationProps) {
  const { items, page, searchColumn, searchQuery } = queryParams;
  const tableName = table.split(" ")[table.split(" ").length - 1];
  let query = database(table);

  if (items) query = query.limit(items);

  if (items && page) query = query.offset(items * (page - 1));

  if (searchColumn && searchQuery)
    query = query.whereILike(`${tableName}.${searchColumn}`, `%${searchQuery}%`);

  const totalItems = await database(table).count("*").first();

  return {
    query,
    total: Number(totalItems?.count),
  };
}
