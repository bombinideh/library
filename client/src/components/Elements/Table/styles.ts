import { varMobileSidebar } from "@/components/Layout/Dashboard/Sidebar/styles";
import styled, { css } from "styled-components";
import Dropdown from "../Dropdown";

export const Wrapper = styled.div``;

export const Options = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: ${theme.spacings[30]};
    padding: ${theme.spacings[30]};
    padding-bottom: ${theme.spacings[20]};

    ${theme.breakpoints[varMobileSidebar]} {
      padding: ${theme.spacings[20]} ${theme.container.gutter};
    }
    ${theme.breakpoints.md} {
      flex-direction: column;
      align-items: flex-start;
      row-gap: ${theme.spacings[15]};
    }
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    display: block;
    font-size: ${theme.fontSizes.bodySm};
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
    table-layout: fixed;
    ${theme.mixins.scrollbar()};
    border-bottom: 1px solid ${theme.colors.stroke};


    thead {
      background-color: ${theme.colors.blockSupport1};
      color: ${theme.colors.textSupport1};
      font-weight: 500;
    }
    tbody {
      background-color: ${theme.colors.block};
    }
    tr {
      border-top: 1px solid ${theme.colors.stroke};
    }
    th {
      padding-top: ${theme.spacings[10]};
      padding-bottom: ${theme.spacings[10]};
    }
    td {
      width: 1%;
      padding-top: ${theme.spacings[20]};
      padding-bottom: ${theme.spacings[20]};

      > span {
        display: block;
        max-width: 300px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    th:first-child,
    td:first-child {
      padding-left: ${theme.spacings[30]};
    }
    th:last-child,
    td:last-child {
      padding-right: ${theme.spacings[30]};
    }
    th + th,
    td + td {
      padding-left: 7rem;

      ${theme.breakpoints.lg} {
        padding-left: ${theme.spacings[40]};
      }
    }
  `}
`;

export const OrderButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[8]};
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color"],
      colors: ["textSupport1"],
    })}
  `}
`;

export const ActionTd = styled.td`
  overflow: initial !important;
  padding-top: initial !important;
  padding-bottom: initial !important;
`;

interface ActionDropdownProps {
  $lastItems: boolean;
}

export const ActionDropdown = styled(Dropdown)<ActionDropdownProps>`
  ${({ $lastItems }) => css`
    ${$lastItems &&
    css`
      > div:last-child {
        bottom: 100%;
      }
    `}
  `}
`;

export const ActionButton = styled.button`
  ${({ theme }) => css`
    padding-top: ${theme.spacings[10]};
    padding-bottom: ${theme.spacings[10]};
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color"],
      colors: ["text"],
    })}
  `}
`;
