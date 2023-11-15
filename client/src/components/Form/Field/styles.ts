import styled, { css } from "styled-components";

interface InputProps {
  $error: boolean;
}

export const Input = styled.input<InputProps>`
  ${({ theme, $error }) => css`
    flex: 1 100%;
    padding: ${theme.spacings[12]};
    border-radius: ${theme.borderRadius.block};
    border-width: ${theme.borders.block};
    border-style: solid;
    border: ${theme.borders.block} solid ${theme.colors.stroke};
    background-color: ${theme.colors.block};
    outline: none;
    ${theme.mixins.transition({ properties: ["border-color"], element: "form" })}

    border-color: ${$error ? theme.colors.danger : theme.colors.stroke};
    &:focus {
      border-color: ${$error ? theme.colors.danger : theme.colors.primary};
    }
  `}
`;
