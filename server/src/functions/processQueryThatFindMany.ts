import { Knex } from "knex";
import { database } from "../knex";

interface InternalQueryBuilder extends Knex.QueryBuilder {
  _single: { table: string };
}

interface ProcessQueryThatFindManyParams {
  queryBuilder: Knex.QueryBuilder;
  queryParams: {
    searchColumn?: string;
    searchQuery?: string;
    items?: string;
    page?: string;
    orderColumn?: string;
    orderOrientation?: "ASC" | "DESC";
  };
}

const defaultQueryParams = {
  items: 10,
  page: 1,
  orderColumn: "created_at",
  orderOrientation: "DESC",
} as const;

export async function processQueryThatFindMany({
  queryBuilder,
  queryParams,
}: ProcessQueryThatFindManyParams) {
  const { searchColumn, searchQuery, items, page, orderColumn, orderOrientation } = {
    ...defaultQueryParams,
    ...queryParams,
  };
  let query = database.with("query", queryBuilder).from("query");

  if (searchColumn && searchQuery) {
    const register = await query.clone().first();

    if (searchColumn in register)
      query = query.whereRaw(`${searchColumn}::TEXT ILIKE '%${searchQuery}%'`);
  }

  query = query.orderBy(orderColumn, orderOrientation);

  const mustApplyPagination = Number(items) !== 0;

  if (mustApplyPagination && items) query = query.limit(Number(items));

  if (mustApplyPagination && items && page)
    query = query.offset(Number(items) * (Number(page) - 1));

  const count = await database((queryBuilder as InternalQueryBuilder)._single.table)
    .count("*", { as: "total" })
    .first();

  return { items: await query, total: Number(count?.total) };
}
