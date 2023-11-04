import { DefaultTheme } from "styled-components";

type Transitions = DefaultTheme["transitions"];
type ThemeTransition = Transitions[keyof Transitions];

export default function motionTransition({
  duration,
  timingFunction,
}: ThemeTransition) {
  const toCamelCase = (text: string) => {
    return text.toLowerCase().replace(/-(.)/g, (...props) => props[1].toUpperCase());
  };

  return {
    duration: duration / 1000,
    ease: toCamelCase(timingFunction),
  };
}
