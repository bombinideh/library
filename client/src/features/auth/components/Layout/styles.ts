import DefaultLogo from "@/components/Elements/Logo";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: ${theme.spacings[30]} ${theme.container.gutter};
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    max-width: 400px;
    width: 100%;
    text-align: center;

    > * + * {
      margin-top: 5rem;

      ${theme.breakpoints.sm} {
        margin-top: 3rem;
      }
    }
  `}
`;

export const Logo = styled(DefaultLogo)`
  margin: 0 auto;
`;

export const Description = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.spacings[12]};
    font-size: ${theme.fontSizes.bodySm};
    color: ${theme.colors.textSupport2};
  `}
`;
