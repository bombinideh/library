import { INotification } from "@/types/notification";
import { m } from "framer-motion";
import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { Variants } from ".";

interface Colors {
  background: keyof DefaultTheme["colors"];
  backgroundIcon: keyof DefaultTheme["colors"];
  timeBar: keyof DefaultTheme["colors"];
}

const colors: Variants<Colors> = {
  info: {
    background: "primaryLight1",
    backgroundIcon: "primary",
    timeBar: "primary",
  },
  error: {
    background: "dangerLight1",
    backgroundIcon: "danger",
    timeBar: "danger",
  },
  success: {
    background: "successLight1",
    backgroundIcon: "success",
    timeBar: "success",
  },
};

interface VariantProps {
  $variant: NonNullable<INotification["variant"]>;
}

export const Wrapper = styled(m.div)<VariantProps>`
  ${({ theme, $variant }) => css`
    max-width: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: ${theme.zIndexes.notification};
    padding: ${theme.spacings[12]};
    margin: ${theme.spacings[20]};
    border-radius: ${theme.borderRadius.block};
    background-color: ${theme.colors[colors[$variant].background]};
    box-shadow:
      0 8px 10px 1px rgba(0, 0, 0, 0.05),
      0 3px 14px 3px rgba(0, 0, 0, 0.06),
      0 4px 5px 0 rgba(0, 0, 0, 0.07);
  `}
`;

export const Icon = styled.div<VariantProps>`
  ${({ theme, $variant }) => css`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${theme.colors[colors[$variant].backgroundIcon]};

    svg {
      display: block;
      max-width: 100%;

      path[stroke] {
        stroke: ${theme.colors.white};
        stroke-width: 2px;
      }
      path[fill] {
        fill: ${theme.colors.white};
      }
    }
  `}
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSupport1};
`;

export const TimeBar = styled(m.span)<VariantProps>`
  ${({ theme, $variant }) => css`
    display: block;
    height: 6px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 0 0 ${theme.borderRadius.block} 0;
    background-color: ${theme.colors[colors[$variant].timeBar]};
  `}
`;
