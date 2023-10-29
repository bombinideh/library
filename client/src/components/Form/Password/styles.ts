import Link from "@/components/Elements/Link";
import styled, { css } from "styled-components";
import { Input as DefaultInput } from "../styles";

export const ForgotPassword = styled(Link)`
  margin-left: auto;
`;

export const PasswordWrapper = styled.div`
  flex: 1 100%;
  display: flex;
`;

export const Input = styled(DefaultInput)`
  ${({ theme }) => css`
    border-right: none;
    border-radius: ${theme.borderRadius.block} 0 0 ${theme.borderRadius.block};

    &:focus + button {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const ToggleShowPassword = styled.button`
  ${({ theme }) => css`
    padding: ${theme.spacings[12]};
    padding-left: ${theme.spacings[8]};
    border: ${theme.borders.block} solid ${theme.colors.stroke};
    border-left: none;
    border-radius: 0 ${theme.borderRadius.block} ${theme.borderRadius.block} 0;
    font-weight: 500;
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
