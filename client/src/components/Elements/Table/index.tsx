import { GetManyQueryProps, GetManyQueryResponse } from "@/@types/api";
import { RequestError } from "@/@types/react-query";
import { Column, TableTitle } from "@/@types/table";
import SVGChevronUpDown from "@/assets/chevron-up-down.svg?react";
import SVGEllipsisHorizontal from "@/assets/ellipsis-horizontal.svg?react";
import useAuth from "@/hooks/useAuth";
import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { ReactNode, forwardRef, useEffect } from "react";
import Spinner from "../Spinner";
import Filter, { FilterState } from "./Filter";
import Pagination, { PaginationState } from "./Pagination";
import * as Styled from "./styles";

type Ordering = Required<
  Pick<GetManyQueryProps, "orderColumn" | "orderOrientation">
>;

export interface OrderingState {
  ordering: Ordering;
  setOrdering: React.Dispatch<React.SetStateAction<Ordering>>;
}

interface TableProps<T extends object> {
  tableTitle: TableTitle;
  queryResult: UseQueryResult<GetManyQueryResponse<any>, RequestError>;
  columns: Column<T>[];
  filter: FilterState["filter"];
  setFilter: FilterState["setFilter"];
  pagination: PaginationState["pagination"];
  setPagination: PaginationState["setPagination"];
  ordering: OrderingState["ordering"];
  setOrdering: OrderingState["setOrdering"];
  CreateButton?: ReactNode;
  actions?: {
    text: string;
    onClick: (item: any) => void;
  }[];
}

const defaultColumn = {
  order: true,
  filter: true,
} as const;

export default function Table<T extends object>(props: TableProps<T>) {
  const {
    tableTitle,
    queryResult,
    columns,
    filter,
    setFilter,
    pagination,
    setPagination,
    ordering,
    setOrdering,
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
    { ordering, setOrdering },
  ]);

  if (isLoading) return <Spinner padding="30px" />;

  if (isError || !data) return <>Um erro ocorreu.</>;

  return (
    <Styled.Wrapper>
      <Styled.Options>
        <Filter
          columns={columns.filter(({ key, filter }) => {
            const ignoreKeys = ["id", "active", "created_at"];

            return (
              filter &&
              ignoreKeys.every(ignoreKey => !(key as string).includes(ignoreKey))
            );
          })}
          filter={filter}
          setFilter={setFilter}
          pagination={pagination}
          setPagination={setPagination}
        />

        {CreateButton}
      </Styled.Options>

      <Styled.Table>
        <thead>
          <tr>
            {actions && isAuthenticated && <th>Ação</th>}

            {columns.map(({ key, title, order }) => (
              <th key={title}>
                {order ? (
                  <Styled.OrderButton
                    type="button"
                    onClick={() => {
                      setOrdering({
                        orderColumn: key as string,
                        orderOrientation:
                          ordering.orderOrientation === "ASC" ? "DESC" : "ASC",
                      });
                    }}
                    $active={ordering.orderColumn === key}
                  >
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

              {columns.map(({ key }, columnIndex) => {
                const handleData = (data: any) => {
                  if (typeof data === "boolean") return data ? "Sim" : "Não";

                  if (moment(data, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid())
                    return new Date(data).toLocaleString("pt-BR");

                  return data;
                };

                return (
                  <td key={columnIndex} title={handleData(item[key]) || "Vazio"}>
                    <span>{handleData(item[key]) || "-"}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Styled.Table>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        total={data.total}
        currentItems={data.items.length}
        tableTitle={tableTitle}
      />
    </Styled.Wrapper>
  );
}
