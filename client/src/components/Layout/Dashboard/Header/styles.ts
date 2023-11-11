import DefaultTitle from "@/components/Elements/Title";
import { m } from "framer-motion";
import styled, { css } from "styled-components";
import { varMobileSidebar } from "../Sidebar/styles";

export const Wrapper = styled.header`
  ${({ theme }) => css`
    padding: ${theme.spacings[30]};
    padding-top: ${theme.spacings[40]};
    border-bottom: ${theme.borders.block} solid ${theme.colors.stroke};

    ${theme.breakpoints[varMobileSidebar]} {
      padding: ${theme.spacings[20]} ${theme.container.gutter};
    }
  `}
`;

export const Container = styled(m.div)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: ${theme.spacings[40]};

    ${theme.breakpoints[varMobileSidebar]} {
      column-gap: ${theme.spacings[30]};
    }
  `}
`;

export const Title = styled(DefaultTitle)`
  ${({ theme }) => css`
    max-width: 500px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    ${theme.breakpoints[varMobileSidebar]} {
      display: none;
    }
  `}
`;

export const MobileTitle = styled(DefaultTitle)`
  ${({ theme }) => css`
    display: none;

    ${theme.breakpoints[varMobileSidebar]} {
      display: initial;
    }
  `}
`;

export const ProfileButton = styled.button`
  ${({ theme }) => css`
    max-width: 200px;
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[12]};
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color"],
      colors: ["text"],
      transitionElement: "link",
      SVGChildren: {
        properties: ["stroke"],
        colors: ["textSupport1"],
      },
    })}

    svg {
      flex-shrink: 0;
    }
    span {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      ${theme.breakpoints[varMobileSidebar]} {
        display: none;
      }
    }
  `}
`;
