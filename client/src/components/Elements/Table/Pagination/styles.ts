import { varMobileSidebar } from "@/components/Layout/Dashboard/Sidebar/styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[30]};
    padding: ${theme.spacings[30]};
    padding-top: ${theme.spacings[20]};
    color: ${theme.colors.textSupport1};

    ${theme.breakpoints[varMobileSidebar]} {
      padding: ${theme.spacings[20]} ${theme.container.gutter};
    }

    ${theme.breakpoints.md} {
      flex-direction: column;
      row-gap: ${theme.spacings[15]};
    }
  `}
`;

export const Items = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[10]};

    ${theme.breakpoints.md} {
      width: 100%;

      > span:first-child {
        display: none;
      }
    }
  `}
`;

export const Pages = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${theme.breakpoints.md} {
      width: 100%;
      justify-content: initial;
      column-gap: ${theme.spacings[10]};

      > span:first-child {
        order: 1;
      }
    }
  `}
`;

export const PagesNavigation = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[15]};
    padding-left: ${theme.spacings[15]};
    margin-left: ${theme.spacings[15]};
    border-left: ${theme.borders.block} solid ${theme.colors.stroke};

    span {
      font-weight: 500;
      color: ${theme.colors.text};
    }

    ${theme.breakpoints.md} {
      padding-left: initial;
      margin-left: initial;
      border-left: initial;
    }
  `}
`;
