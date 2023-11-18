import Button from "@/components/Elements/Button";
import DefaultDropdown from "@/components/Elements/Dropdown";
import styled, { css } from "styled-components";
import DefaultField from "../Field";

export const Dropdown = styled(DefaultDropdown)`
  width: 100%;
`;

interface SelectButtonProps {
  $error: boolean;
}

export const SelectButton = styled(Button)<SelectButtonProps>`
  ${({ theme, $error }) => css`
    justify-content: flex-start;

    ${$error &&
    css`
      border-color: ${theme.colors.danger};
    `}

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    > *:last-child {
      margin-left: auto;
    }
  `}
`;

export const Field = styled(DefaultField)`
  display: none;
`;
