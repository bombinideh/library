import { darken, lighten, transparentize } from "polished";
import { DefaultTheme, css } from "styled-components";
import { Mixin } from ".";
import { TransitionProps } from "./transition";

interface ButtonColorStateProps {
  properties?: string[];
  colors?: (keyof DefaultTheme["colors"])[];
  polish?: "transparentize" | "darken" | "lighten";
  factor?: number;
  transitionElement?: TransitionProps["element"];
  SVGChildren?: {
    selector?: string;
    properties: string[];
    colors?: (keyof DefaultTheme["colors"])[];
  };
}

type DefaultProps = Required<ButtonColorStateProps> & {
  SVGChildren: Required<NonNullable<ButtonColorStateProps["SVGChildren"]>>;
};

const defaultProps: DefaultProps = {
  properties: ["color"],
  colors: ["primary"],
  polish: "transparentize",
  factor: 0.2,
  transitionElement: "form",
  SVGChildren: {
    selector: "path",
    properties: ["stroke"],
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
    const { properties, colors, polish, factor, transitionElement, SVGChildren } = {
      ...defaultProps,
      ...receivedProps,
      SVGChildren: {
        ...defaultProps.SVGChildren,
        ...receivedProps.SVGChildren,
      },
    };
    const polishedFn = { lighten, darken, transparentize };
    const color = (color: keyof DefaultTheme["colors"], state: State) => {
      const themeColor = theme.colors[color];
      const colors = {
        standard: themeColor,
        hover: polishedFn[polish](factor, themeColor),
        active: polishedFn[polish](factor * 2, themeColor),
      };

      return colors[state];
    };
    const stylesPerState = ({ state, properties, isSVG }: StylesPerStateProps) => {
      const declarations = properties.reduce((acc, property, index) => {
        const elementColors = isSVG ? SVGChildren.colors : colors;

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

        ${SVGSelector} {
          ${stylesPerState({ state, properties: SVGProperties, isSVG: true })};
          ${applyTransition &&
          transition({ properties: SVGProperties, element: transitionElement })}
        }
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
