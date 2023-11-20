import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { ButtonDefaultProps, ButtonProps } from ".";

interface WrapperProps {
  $variant: ButtonDefaultProps["variant"];
  $SVGElement: ButtonDefaultProps["SVG"]["element"];
  $SVGShape: ButtonDefaultProps["SVG"]["shape"];
  $SVGColor: NonNullable<ButtonProps["SVG"]>["color"];
  $align: ButtonDefaultProps["align"];
}

type Variants = Record<
  WrapperProps["$variant"],
  Record<"text" | "background" | "border", keyof DefaultTheme["colors"]>
>;

const variants: Variants = {
  primary: {
    text: "white",
    background: "primary",
    border: "primary",
  },
  support: {
    text: "text",
    background: "blockSupport1",
    border: "stroke",
  },
  danger: {
    text: "white",
    background: "danger",
    border: "danger",
  },
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, $align, $SVGElement, $SVGShape, $SVGColor, $variant }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: ${theme.spacings[12]};
    column-gap: ${theme.spacings[8]};
    background-clip: padding-box;
    text-align: ${$align};
    font-weight: 500;
    border-radius: ${theme.borderRadius.block};
    border-width: ${theme.borders.block};
    border-style: solid;
    cursor: pointer;

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }

    svg {
      flex-shrink: 0;
    }
    svg:first-child {
      width: 16px;
      height: 16px;
    }

    ${() => {
      const { text, background, border } = variants[$variant];

      return css`
        ${theme.mixins.buttonColorState({
          properties: ["color", "background-color", "border-color"],
          colors: [text, background, border],
          SVGChildren: {
            selector: $SVGElement,
            properties: [$SVGShape],
            colors: [$SVGColor || text],
          },
        })}
        ${theme.mixins.transition({
          element: "form",
          properties: ["color", "background-color", "border-color", "opacity"],
        })}
      `;
    }};
  `}
`;
