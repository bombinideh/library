import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: ${theme.spacings[3]} ${theme.spacings[15]};
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    max-width: 400px;
    text-align: center;

    > * + * {
      margin-top: 5rem;

      ${theme.breakpoints.sm} {
        margin-top: 3rem;
      }
    }
  `}
`;

export const Logo = styled.img`
  margin: 0 auto;
`;

export const Description = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.spacings[12]};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.textSupport2};
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings[2]};
  text-align: left;
`;
