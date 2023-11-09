import styled, { css } from "styled-components";
import { LogoProps } from ".";

interface WrapperProps {
  $width: LogoProps["width"];
}

export const Wrapper = styled.img<WrapperProps>`
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;
