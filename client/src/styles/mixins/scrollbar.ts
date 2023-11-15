import { DefaultTheme, RuleSet, css } from "styled-components";
import { Mixin } from ".";

interface ScrollbarProps {
  colorThumb?: keyof DefaultTheme["colors"];
  colorTrack?: keyof DefaultTheme["colors"];
  size?: number;
}

const defaultOptions: Required<ScrollbarProps> = {
  colorThumb: "blockSupport2",
  colorTrack: "blockSupport1",
  size: 8,
};

export const scrollbar: Mixin<ScrollbarProps> =
  (props = {}) =>
  ({ theme }): RuleSet<object> => {
    const { colorThumb, colorTrack, size } = { ...defaultOptions, ...props };
    const color = (name: keyof DefaultTheme["colors"]) => theme.colors[name];

    return css`
      & {
        scrollbar-width: auto;
        scrollbar-color: ${color(colorThumb)} ${color(colorTrack)};
      }
      &::-webkit-scrollbar {
        width: ${size}px;
        height: ${size}px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${color(colorTrack)};
      }
      &::-webkit-scrollbar-thumb {
        border-radius: ${theme.borderRadius.block};
        background-color: ${color(colorThumb)};

        ${theme.mixins.buttonColorState({
          properties: ["background-color"],
          colors: [colorThumb],
        })}
      }
    `;
  };
