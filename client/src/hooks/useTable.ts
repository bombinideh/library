import { GetManyQueryProps } from "@/types/api";
import { useState } from "react";

interface UseTableProps extends Omit<GetManyQueryProps, "searchColumn"> {
  searchColumn: NonNullable<GetManyQueryProps["searchColumn"]>;
}

const defaultProps = {
  items: 10,
  page: 1,
  searchQuery: "",
} as const;

export default function useTable(props: UseTableProps) {
  const { items, page, searchColumn, searchQuery } = { ...defaultProps, ...props };
  const [pagination, setPagination] = useState({ items, page });
  const [filter, setFilter] = useState({ searchColumn, searchQuery });

  const applyPagination = pagination.items && pagination.page;
  const applyFilter = filter.searchColumn && filter.searchQuery;
  const getManyQueryProps: GetManyQueryProps = {
    ...(applyPagination && pagination),
    ...(applyFilter && filter),
  };

  return { filter, setFilter, pagination, setPagination, getManyQueryProps };
}
