import { GetManyQueryProps } from "@/@types/api";
import { TableTitle } from "@/@types/table";
import SVGChevronDown from "@/assets/chevron-down.svg?react";
import SVGNext from "@/assets/next.svg?react";
import SVGPrev from "@/assets/prev.svg?react";
import { forwardRef } from "react";
import Button from "../../Button";
import Dropdown from "../../Dropdown";
import * as Styled from "./styles";

type Pagination = Required<Pick<GetManyQueryProps, "items" | "page">>;

export interface PaginationState {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}

interface PaginationProps {
  pagination: PaginationState["pagination"];
  setPagination: PaginationState["setPagination"];
  total: number;
  currentItems: number;
  tableTitle: TableTitle;
}

export default function Pagination({
  pagination,
  setPagination,
  total,
  currentItems,
  tableTitle,
}: PaginationProps) {
  const { items, page } = pagination;
  const itemOptions = [10, 20, 30, 40, 50].map(option => ({
    text: String(option),
    onClick: () => setPagination({ ...pagination, items: option }),
  }));

  return (
    <Styled.Wrapper>
      <Styled.Items>
        <span>Exibir</span>

        <Dropdown
          Button={forwardRef<HTMLButtonElement>((props, ref) => (
            <Button
              {...props}
              ref={ref}
              variant="support"
              text={String(items)}
              SVG={{ color: "textSupport1" }}
            >
              <SVGChevronDown />
            </Button>
          ))}
          items={itemOptions}
          wrapperWidth="65px"
        />

        <span>{tableTitle.plural.toLowerCase()} por página</span>
      </Styled.Items>

      <Styled.Pages>
        <span>
          {total} {tableTitle.plural.toLowerCase()}
        </span>

        <Styled.PagesNavigation>
          <Button
            variant="support"
            SVG={{ Component: SVGPrev, color: "textSupport1" }}
            onClick={() => setPagination({ ...pagination, page: page - 1 })}
            disabled={page <= 1}
          />

          <span>{page}</span>

          <Button
            variant="support"
            SVG={{ Component: SVGNext, color: "textSupport1" }}
            onClick={() => setPagination({ ...pagination, page: page + 1 })}
            disabled={currentItems < items}
          />
        </Styled.PagesNavigation>
      </Styled.Pages>
    </Styled.Wrapper>
  );
}
