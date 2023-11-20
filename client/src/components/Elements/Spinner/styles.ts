import { m } from "framer-motion";
import { css, keyframes, styled } from "styled-components";
import { SpinnerProps } from ".";

interface WrapperProps {
  $size: NonNullable<SpinnerProps["size"]>;
  $padding: NonNullable<SpinnerProps["padding"]>;
  $color: NonNullable<SpinnerProps["color"]>;
}

const spin = keyframes`
  from {
      transform: rotate(180deg);
  }
  to {
      transform: rotate(540deg);
  }
`;

export const Wrapper = styled(m.div)<WrapperProps>`
  ${({ theme, $size, $padding, $color }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${$padding};

    svg {
      width: ${$size};
      height: ${$size};
      animation-name: ${spin};
      animation-duration: 0.8s;
      animation-iteration-count: infinite;
      animation-timing-function: steps(8, end);

      path {
        fill: ${theme.colors[$color]};
      }
    }
  `}
`;
