import SVGChevronDown from "@/assets/chevron-down.svg?react";
import SVGMagnifyingGlass from "@/assets/magnifying-glass.svg?react";
import { forwardRef } from "react";
import { Column } from "..";
import * as Styled from "./styles";

interface FilterStateData {
  searchColumn: string;
  searchQuery: string;
}

export interface FilterState {
  filter: FilterStateData;
  setFilter: React.Dispatch<React.SetStateAction<FilterStateData>>;
}

interface FilterProps {
  columns: Column[];
  filter: FilterState;
}

export default function Filter({
  columns,
  filter: { filter, setFilter },
}: FilterProps) {
  const items = columns
    .map(({ title, key }) => ({
      text: title,
      onClick: () => setFilter({ ...filter, searchColumn: key }),
    }))
    .slice(1);
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
        placeholder={`Pesquisar por ${columnTitle.toLowerCase()}...`}
        onChange={({ target }) =>
          setFilter({ ...filter, searchQuery: target.value })
        }
      />
    </Styled.Wrapper>
  );
}
