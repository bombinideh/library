import Link from "@/components/Elements/Link";
import styled, { css } from "styled-components";
import DefaultField from "../Field";

export const ForgotPassword = styled(Link)`
  margin-left: auto;
`;

export const PasswordWrapper = styled.div`
  flex: 1 100%;
  display: flex;
`;

interface FieldProps {
  $showPassBtn: boolean;
}

export const Field = styled(DefaultField)<FieldProps>`
  ${({ theme, $showPassBtn, error }) => css`
    ${$showPassBtn &&
    css`
      border-right: none;
      border-radius: ${theme.borderRadius.block} 0 0 ${theme.borderRadius.block};

      &:focus + button {
        border-color: ${error ? theme.colors.danger : theme.colors.primary};
      }
    `}
  `}
`;

interface ToggleShowPasswordProps {
  $error: boolean;
}

export const ToggleShowPassword = styled.button<ToggleShowPasswordProps>`
  ${({ theme, $error }) => css`
    padding: ${theme.spacings[12]};
    padding-left: ${theme.spacings[8]};
    border-width: ${theme.borders.block};
    border-style: solid;
    border-left: none;
    border-radius: 0 ${theme.borderRadius.block} ${theme.borderRadius.block} 0;
    font-weight: 500;
    border-color: ${$error ? theme.colors.danger : theme.colors.stroke};
    background-color: ${theme.colors.block};
    cursor: pointer;
    ${theme.mixins.buttonColorState({
      properties: ["color"],
      colors: ["textSupport1"],
    })};
    ${theme.mixins.transition({
      properties: ["color", "border-color"],
      element: "form",
    })}
  `}
`;
