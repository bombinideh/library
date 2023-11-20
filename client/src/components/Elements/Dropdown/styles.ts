import { m } from "framer-motion";
import styled, { css } from "styled-components";
import { DropdownDefaultProps, DropdownProps } from ".";

interface WrapperProps {
  $wrapperWidth: DropdownProps["wrapperWidth"];
}

type WrapperWidth = Pick<WrapperProps, "$wrapperWidth">;

export const Wrapper = styled.div<WrapperProps>`
  ${({ $wrapperWidth }) => css`
    position: relative;

    ${$wrapperWidth &&
    css`
      max-width: ${$wrapperWidth};
      width: 100%;
    `}
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    width: 100%;

    svg {
      ${theme.mixins.transition({ properties: ["transform"], element: "element" })};
    }

    &.open svg:last-child {
      transform: rotate(180deg);
    }
  `}
`;

interface ContentProps extends WrapperWidth {
  $contentPositionX: DropdownDefaultProps["contentPositionX"];
}

export const Content = styled(m.div)<ContentProps>`
  ${({ theme, $contentPositionX, $wrapperWidth }) => css`
    position: absolute;
    ${$contentPositionX}: 0;
    z-index: ${theme.zIndexes.dropdown};
    margin-top: ${theme.spacings[8]};
    background-color: ${theme.colors.blockSupport1};
    border-radius: ${theme.borderRadius.block};
    border: ${theme.borders.block} solid ${theme.colors.stroke};
    overflow: hidden;
    ${theme.mixins.scrollbar()};

    ${$wrapperWidth &&
    css`
      inset: auto 0;
    `}
  `}
`;

export const Item = styled.div<WrapperWidth>`
  ${({ theme, $wrapperWidth }) => css`
    width: 100%;
    display: block;
    padding: ${theme.spacings[8]} ${theme.spacings[12]};
    line-height: 1.3;
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color", "background-color"],
      colors: ["textSupport1", "blockSupport1"],
      polish: theme.mode === "dark" ? "lighten" : "darken",
      factor: 0.05,
    })}

    &:first-child {
      padding-top: ${theme.spacings[12]};
    }
    &:last-child {
      padding-bottom: ${theme.spacings[12]};
    }

    ${$wrapperWidth ||
    css`
      white-space: nowrap;
    `}
  `}
`;

export const EmptyItems = styled.span`
  ${({ theme }) => css`
    display: block;
    padding: ${theme.spacings[20]} ${theme.spacings[12]};
    color: ${theme.colors.textSupport1};
    text-align: center;
  `}
`;
