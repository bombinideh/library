import DefaultInputSearch from "@/components/Form/InputSearch";
import styled, { css } from "styled-components";
import Button from "../../Button";
import DefaultDropdown from "../../Dropdown";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;

    > *:last-child {
      max-width: 260px;
      width: 100%;
    }
    ${theme.breakpoints.md} {
      width: 100%;
    }
    ${theme.breakpoints.sm} {
      flex-direction: column;
      row-gap: ${theme.spacings[10]};

      > *:last-child {
        max-width: initial;
      }
    }
  `}
`;

export const Dropdown = styled(DefaultDropdown)`
  ${({ theme }) => css`
    ${theme.breakpoints.sm} {
      max-width: initial;
    }
  `}
`;

export const SelectFilter = styled(Button)`
  ${({ theme }) => css`
    justify-content: flex-start;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 0;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    > *:last-child {
      margin-left: auto;
    }

    ${theme.breakpoints.sm} {
      border-top-right-radius: ${theme.borderRadius.block};
      border-bottom-right-radius: ${theme.borderRadius.block};
      border-right-width: ${theme.borders.block};
    }
  `}
`;

export const InputSearch = styled(DefaultInputSearch)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
