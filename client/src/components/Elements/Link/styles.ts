import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { LinkProps } from ".";

interface WrapperProps {
  $align: LinkProps["align"];
}

export const Wrapper = styled(Link)<WrapperProps>`
  ${({ theme, $align }) => css`
    display: inline-flex;
    column-gap: ${theme.spacings[8]};
    align-items: center;
    text-align: ${$align};

    ${theme.mixins.buttonColorState({
      colors: ["primaryDark2"],
      properties: ["color"],
      transitionElement: "link",
      SVGChildren: { properties: ["stroke"] },
    })}
  `}
`;
