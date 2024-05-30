import { DefaultTheme, RuleSet, css } from "styled-components";
import { Mixin } from ".";

export interface TransitionProps {
  properties: string[];
  element: keyof DefaultTheme["transitions"];
}

export const transition: Mixin<TransitionProps> =
  ({ properties, element } = { properties: [], element: "element" }) =>
  ({ theme }): RuleSet<object> => css`
    transition-property: ${properties.join(", ")};
    transition-duration: ${theme.transitions[element].duration}ms;
    transition-timing-function: ${theme.transitions[element].timingFunction};
  `;
