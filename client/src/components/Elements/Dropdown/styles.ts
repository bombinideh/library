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
  width: 100%;
`;

interface ContentProps extends WrapperWidth {
  $contentPosition: DropdownDefaultProps["contentPosition"];
}

export const Content = styled.div<ContentProps>`
  ${({ theme, $contentPosition, $wrapperWidth }) => css`
    position: absolute;
    ${$contentPosition}: 0;
    z-index: ${theme.zIndexes.dropdown};
    margin-top: ${theme.spacings[8]};
    background-color: ${theme.colors.blockSupport1};
    border-radius: ${theme.borderRadius.block};
    border: ${theme.borders.block} solid ${theme.colors.stroke};

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
