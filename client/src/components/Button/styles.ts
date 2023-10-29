import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { ButtonProps } from ".";

interface WrapperProps {
  $variant: NonNullable<ButtonProps["variant"]>;
  $align: ButtonProps["align"];
}

type Variants = Record<
  WrapperProps["$variant"],
  Record<"text" | "background" | "border", keyof DefaultTheme["colors"]>
>;

const variants: Variants = {
  primary: {
    text: "primaryText",
    background: "primary",
    border: "primary",
  },
  support: {
    text: "text",
    background: "blockSupport1",
    border: "stroke",
  },
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, $align, $variant }) => css`
    display: inline-flex;
    justify-content: center;
    padding: ${theme.spacings[12]};
    column-gap: ${theme.spacings[8]};
    background-clip: padding-box;
    text-align: ${$align};
    font-weight: 500;
    border-radius: ${theme.borderRadius.block};
    border-width: ${theme.borders.block};
    border-style: solid;
    cursor: pointer;

    ${() => {
      const { text, background, border } = variants[$variant];

      return css`
        ${theme.mixins.buttonColorState({
          properties: ["color", "background-color", "border-color"],
          colors: [text, background, border],
        })}
      `;
    }};
  `}
`;
