import { GetManyQueryProps } from "@/@types/api";
import { useState } from "react";

interface UseTableProps extends Omit<GetManyQueryProps, "searchColumn"> {
  searchColumn: NonNullable<GetManyQueryProps["searchColumn"]>;
}

const defaultProps: Required<GetManyQueryProps> = {
  searchColumn: "",
  searchQuery: "",
  items: 10,
  page: 1,
  orderColumn: "created_at",
  orderOrientation: "DESC",
};

export default function useTable(props: UseTableProps) {
  const { items, page, searchColumn, searchQuery, orderColumn, orderOrientation } = {
    ...defaultProps,
    ...props,
  };
  const [filter, setFilter] = useState({ searchColumn, searchQuery });
  const [pagination, setPagination] = useState({ items, page });
  const [ordering, setOrdering] = useState({ orderColumn, orderOrientation });

  const applyFilter = filter.searchColumn && filter.searchQuery;
  const applyPagination = pagination.items && pagination.page;
  const applyOrdering = ordering.orderColumn && ordering.orderOrientation;

  const getManyQueryProps: GetManyQueryProps = {
    ...(applyFilter && filter),
    ...(applyPagination && pagination),
    ...(applyOrdering && ordering),
  };

  return {
    filter,
    setFilter,
    pagination,
    setPagination,
    ordering,
    setOrdering,
    getManyQueryProps,
  };
}
