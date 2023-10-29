import { DefaultTheme, RuleSet } from "styled-components";

export type Mixin<T> = (
  customProps: T,
) => (styledProps: { theme: DefaultTheme }) => RuleSet<object>;

export { buttonColorState } from "./buttonColorState";
export { transition } from "./transition";
