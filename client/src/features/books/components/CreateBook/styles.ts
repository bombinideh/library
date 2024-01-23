import Button from "@/components/Elements/Button";
import styled, { css } from "styled-components";

export const Nav = styled.ul`
  display: flex;
`;

export const NavItem = styled.li`
  flex: 1;

  &:first-child > * {
    border-left: initial;
  }
  &:last-child > * {
    border-right: initial;
  }
  & + & > * {
    border-left: initial;
  }
`;

interface NavButtonProps {
  $active: boolean;
}

export const NavButton = styled(Button)<NavButtonProps>`
  width: 100%;
  height: 100%;
  border-radius: initial;
  border-bottom: initial;

  ${({ $active }) => {
    if ($active)
      return css`
        pointer-events: none;
      `;

    return css`
      background-color: initial;
    `;
  }}
`;
