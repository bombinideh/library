import Button from "@/components/Elements/Button";
import { ComponentProps, RefAttributes } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styled, { css } from "styled-components";

export const varMobileSidebar = "md";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;
    position: fixed;
    inset: 0 auto 0 0;
    z-index: ${theme.zIndexes.sidebar};
    padding: ${theme.spacings[40]} 0;
    border-right: 1px solid ${theme.colors.stroke};

    ${theme.breakpoints[varMobileSidebar]} {
      flex-direction: initial;
      max-width: initial;
      inset: auto 0 0;
      padding: 0 ${theme.container.gutter};
      border-right: initial;
      border-top: 1px solid ${theme.colors.stroke};
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 ${theme.spacings[30]} ${theme.spacings[30]};
    border-bottom: 1px solid ${theme.colors.stroke};

    ${theme.breakpoints[varMobileSidebar]} {
      display: none;
    }
  `}
`;

export const ResizeSidebar = styled(Button)`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    transform: translateX(50%);
    padding: ${theme.spacings[8]};
    border-radius: 50%;

    svg {
      width: 14px;
      height: 14px;
    }
  `}
`;

export const DesktopNavigation = styled.nav`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 ${theme.spacings[30]};

    > * {
      padding: ${theme.spacings[30]} 0;

      &:last-child {
        padding-bottom: 0;
        margin-top: auto;
        border-top: 1px solid ${theme.colors.stroke};
      }
    }

    ${theme.breakpoints[varMobileSidebar]} {
      display: none;
    }
  `}
`;

export const MobileNavigation = styled.nav`
  ${({ theme }) => css`
    display: none;

    ${theme.breakpoints[varMobileSidebar]} {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 100%;
      max-width: 500px;
      margin: 0 auto;
    }
  `}
`;

interface LinkItemProps extends NavLinkProps, RefAttributes<HTMLAnchorElement> {
  as: typeof NavLink;
}

interface ButtonItemProps extends ComponentProps<"button"> {
  as: "button";
}

export const NavigationItem = styled.div<LinkItemProps | ButtonItemProps>`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[12]};
    padding: ${theme.spacings[12]} ${theme.spacings[20]};
    border-radius: ${theme.borderRadius.block};
    white-space: nowrap;
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color", "background-color"],
      colors: ["textSupport1", "background"],
      polish: theme.mode === "dark" ? "lighten" : "darken",
      factor: 0.03,
      transitionElement: "link",
    })};

    &.active {
      color: ${theme.colors.text};
      background-color: ${theme.colors.blockSupport1};
      font-weight: 500;
      cursor: initial;

      path {
        stroke: ${theme.colors.text};
        stroke-width: 2px;
      }
    }

    ${theme.breakpoints[varMobileSidebar]} {
      width: initial;
      justify-content: center;
      padding-top: ${theme.spacings[15]};
      padding-bottom: ${theme.spacings[15]};
      flex: 1;

      span {
        display: none;
      }
    }
    ${theme.breakpoints.sm} {
      padding-left: ${theme.spacings[8]};
      padding-right: ${theme.spacings[8]};

      svg {
        width: 24px;
        height: 24px;
      }
    }
  `}
`;
