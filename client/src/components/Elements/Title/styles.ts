import styled, { css } from "styled-components";
import { Heading, Level, TitleDefaultProps } from ".";

interface WrapperProps {
  $level: Level;
  $weight: TitleDefaultProps["weight"];
  $align: TitleDefaultProps["align"];
}

const lineHeights: Record<Heading, number> = {
  h1: 1.5,
  h2: 1.5,
  h3: 1.2,
  h4: 1.2,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $level, $weight, $align }) => {
    const heading: Heading = `h${$level}`;

    return css`
      font-size: ${theme.fontSizes[heading]};
      font-weight: ${$weight};
      text-align: ${$align};
      line-height: ${lineHeights[heading]};
    `;
  }}
`;
