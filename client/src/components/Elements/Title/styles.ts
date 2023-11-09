import styled, { css } from "styled-components";
import { TitleProps, TitleDefaultProps } from ".";

interface WrapperProps {
  $level: TitleProps["level"];
  $weight: TitleDefaultProps["weight"];
  $align: TitleDefaultProps["align"];
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $level, $weight, $align }) => css`
    font-size: ${theme.fontSizes[`h${$level}`]};
    font-weight: ${$weight};
    text-align: ${$align};
  `}
`;
