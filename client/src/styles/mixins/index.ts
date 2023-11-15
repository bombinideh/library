import { DefaultTheme, RuleSet } from "styled-components";

export type Mixin<T> = (
  customProps?: T,
) => (styledProps: { theme: DefaultTheme }) => RuleSet<object>;

export { buttonColorState } from "./buttonColorState";
export { scrollbar } from "./scrollbar";
export { transition } from "./transition";
