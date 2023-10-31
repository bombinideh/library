import { transparentize } from "polished";
import { DefaultTheme, css } from "styled-components";
import { Mixin } from ".";
import { TransitionProps } from "./transition";

interface ButtonColorStateProps {
  properties?: string[];
  colors?: (keyof DefaultTheme["colors"])[];
  factor?: number;
  transitionElement?: TransitionProps["element"];
  SVGChildren?: {
    selector?: string;
    properties: string[];
    colors?: (keyof DefaultTheme["colors"])[];
  };
}

const defaultProps: Required<ButtonColorStateProps> = {
  properties: ["color"],
  colors: ["primary"],
  factor: 0.2,
  transitionElement: "form",
  SVGChildren: {
    selector: "path",
    properties: [],
    colors: [],
  },
};

type State = "standard" | "hover" | "active";

interface StylesPerStateProps {
  state: State;
  properties: string[];
  isSVG?: boolean;
}

export const buttonColorState: Mixin<ButtonColorStateProps> =
  (receivedProps = {}) =>
  ({ theme }) => {
    const { properties, colors, factor, transitionElement, SVGChildren } = {
      ...defaultProps,
      ...receivedProps,
      SVGChildren: {
        ...defaultProps.SVGChildren,
        ...receivedProps.SVGChildren,
      },
    };
    const color = (color: keyof DefaultTheme["colors"], state: State) => {
      const themeColor = theme.colors[color];
      const colors = {
        standard: themeColor,
        hover: transparentize(factor, themeColor),
        active: transparentize(factor * 2, themeColor),
      };

      return colors[state];
    };
    const stylesPerState = ({ state, properties, isSVG }: StylesPerStateProps) => {
      const declarations = properties.reduce((acc, property, index) => {
        const elementColors = isSVG ? SVGChildren.colors! : colors;

        acc.push(
          `${property}: ${color(
            elementColors[index] || elementColors[0] || colors[0],
            state,
          )};`,
        );
        return acc;
      }, [] as string[]);

      return declarations.join("\n");
    };
    const handleStyles = (state: State) => {
      const applyTransition = state === "standard";
      const { transition } = theme.mixins;
      const SVGSelector = SVGChildren.selector;
      const SVGProperties = SVGChildren.properties;

      return css`
        ${stylesPerState({ state, properties })};
        ${applyTransition && transition({ properties, element: transitionElement })}

        ${SVGProperties.length &&
        css`
          ${SVGSelector} {
            ${stylesPerState({ state, properties: SVGProperties, isSVG: true })};
            ${applyTransition &&
            transition({ properties: SVGProperties, element: transitionElement })}
          }
        `}
      `;
    };

    return css`
      ${handleStyles("standard")};

      ${theme.queries.desktop} {
        &:hover {
          ${handleStyles("hover")};
        }
      }
      &:active {
        ${handleStyles("active")};
      }
    `;
  };
