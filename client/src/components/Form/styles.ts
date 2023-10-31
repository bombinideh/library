import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Label = styled.label`
  display: block;
  padding-bottom: ${({ theme }) => theme.spacings[8]};
`;

export const Input = styled.input`
  ${({ theme }) => css`
    flex: 1 100%;
    padding: ${theme.spacings[12]};
    border-radius: ${theme.borderRadius.block};
    border: ${theme.borders.block} solid ${theme.colors.stroke};
    background-color: ${theme.colors.block};
    outline: none;
    ${theme.mixins.transition({ properties: ["border-color"], element: "form" })}

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;
