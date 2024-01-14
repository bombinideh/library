import SVGChevronDown from "@/assets/chevron-down.svg?react";
import SVGMagnifyingGlass from "@/assets/magnifying-glass.svg?react";
import { GetManyQueryProps } from "@/types/api";
import { forwardRef } from "react";
import { Column } from "..";
import { PaginationState } from "../Pagination";
import * as Styled from "./styles";

type Filter = Required<Pick<GetManyQueryProps, "searchColumn" | "searchQuery">>;

export interface FilterState {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

interface FilterProps {
  columns: Column<any>[];
  filter: FilterState["filter"];
  setFilter: FilterState["setFilter"];
  pagination: PaginationState["pagination"];
  setPagination: PaginationState["setPagination"];
}

export default function Filter({
  columns,
  filter,
  setFilter,
  pagination,
  setPagination,
}: FilterProps) {
  const items = columns.map(({ title, key }) => ({
    text: title,
    onClick: () => setFilter({ ...filter, searchColumn: key as string }),
  }));
  const { title: columnTitle } = columns.filter(
    ({ key }) => key === filter.searchColumn,
  )[0];

  return (
    <Styled.Wrapper>
      <Styled.Dropdown
        Button={forwardRef<HTMLButtonElement>((props, ref) => (
          <Styled.SelectFilter
            {...props}
            ref={ref}
            variant="support"
            text={columnTitle}
            SVG={{ Component: SVGMagnifyingGlass, color: "textSupport1" }}
          >
            <SVGChevronDown />
          </Styled.SelectFilter>
        ))}
        items={items}
        wrapperWidth="230px"
      />

      <Styled.InputSearch
        id="search"
        placeholder={`Pesquisar por ${columnTitle.toLowerCase()}`}
        onChange={({ target }) => {
          setPagination({ ...pagination, page: 1 });
          setFilter({ ...filter, searchQuery: target.value });
        }}
      />
    </Styled.Wrapper>
  );
}
