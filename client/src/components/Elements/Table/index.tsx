import SVGChevronUpDown from "@/assets/chevron-up-down.svg?react";
import SVGEllipsisHorizontal from "@/assets/ellipsis-horizontal.svg?react";
import useAuth from "@/hooks/useAuth";
import { GetManyQueryResponse } from "@/types/api";
import { ReactNode, forwardRef } from "react";
import Filter, { FilterState } from "./Filter";
import * as Styled from "./styles";

export interface Column {
  title: string;
  key: string;
  orderButton?: boolean;
}

interface TableProps<T> {
  data: GetManyQueryResponse<any>;
  columns: Column[];
  filter?: FilterState;
  CreateButton?: ReactNode;
  actions?: {
    text: string;
    onClick: (item: T) => void;
  }[];
}

const defaultColumn = {
  orderButton: true,
};

export default function Table<T>(props: TableProps<T>) {
  const { data, columns, filter, CreateButton, actions } = {
    ...props,
    columns: props.columns.map(column => ({ ...defaultColumn, ...column })),
  };
  const { isAuthenticated } = useAuth();

  return (
    <Styled.Wrapper>
      <Styled.Options>
        {filter && <Filter columns={columns} filter={filter} />}

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
    </Styled.Wrapper>
  );
}
