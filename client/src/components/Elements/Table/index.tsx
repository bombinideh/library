import SVGChevronUpDown from "@/assets/chevron-up-down.svg?react";
import SVGEllipsisHorizontal from "@/assets/ellipsis-horizontal.svg?react";
import useAuth from "@/hooks/useAuth";
import { GetManyQueryResponse } from "@/types/api";
import { RequestError } from "@/types/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode, forwardRef, useEffect } from "react";
import Spinner from "../Spinner";
import Filter, { FilterState } from "./Filter";
import Pagination, { PaginationState } from "./Pagination";
import * as Styled from "./styles";

export interface Column {
  title: string;
  key: string;
  orderButton?: boolean;
}

interface TableProps {
  title: string;
  queryResult: UseQueryResult<GetManyQueryResponse<any>, RequestError>;
  columns: Column[];
  filterColumns: string[];
  filter: FilterState["filter"];
  setFilter: FilterState["setFilter"];
  pagination: PaginationState["pagination"];
  setPagination: PaginationState["setPagination"];
  CreateButton?: ReactNode;
  actions?: {
    text: string;
    onClick: (item: any) => void;
  }[];
}

const defaultColumn = {
  orderButton: true,
};

export default function Table(props: TableProps) {
  const {
    title,
    queryResult,
    columns,
    filterColumns,
    filter,
    setFilter,
    pagination,
    setPagination,
    CreateButton,
    actions,
  } = {
    ...props,
    columns: props.columns.map(column => ({ ...defaultColumn, ...column })),
  };
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError, refetch } = queryResult;

  useEffect(() => {
    refetch();
  }, [
    { filter, setFilter },
    { pagination, setPagination },
  ]);

  if (isLoading) return <Spinner padding="30px" />;

  if (isError || !data) return <>Um erro ocorreu.</>;

  return (
    <Styled.Wrapper>
      <Styled.Options>
        <Filter
          columns={columns.filter(({ key }) => filterColumns.includes(key))}
          filter={filter}
          setFilter={setFilter}
          pagination={pagination}
          setPagination={setPagination}
        />

        {CreateButton && isAuthenticated && CreateButton}
      </Styled.Options>

      <Styled.Table>
        <thead>
          <tr>
            {actions && isAuthenticated && <th>Ação</th>}

            {columns.map(({ title, orderButton }) => (
              <th key={title}>
                {orderButton ? (
                  <Styled.OrderButton type="button">
                    {title}

                    <SVGChevronUpDown />
                  </Styled.OrderButton>
                ) : (
                  title
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.items.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {actions && isAuthenticated && (
                <Styled.ActionTd>
                  <Styled.ActionDropdown
                    Button={forwardRef<HTMLButtonElement>((props, ref) => (
                      <Styled.ActionButton {...props} ref={ref}>
                        <SVGEllipsisHorizontal />
                      </Styled.ActionButton>
                    ))}
                    items={actions.map(({ onClick, ...rest }) => ({
                      onClick: () => onClick(item),
                      ...rest,
                    }))}
                    $lastItems={
                      itemIndex === data.items.length - 1 ||
                      itemIndex === data.items.length - 2
                    }
                  />
                </Styled.ActionTd>
              )}

              {columns.map(({ key }, columnIndex) => (
                <td key={columnIndex} title={item[key]}>
                  {item[key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Styled.Table>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        total={data.total}
        currentItems={data.items.length}
        title={title}
      />
    </Styled.Wrapper>
  );
}
