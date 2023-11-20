import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings[30]};
    padding-bottom: 0;
  `}
`;

export const Section = styled.section`
  ${({ theme }) => css`
    display: flex;
    column-gap: ${theme.spacings[40]};
    padding: ${theme.spacings[20]};
    padding-bottom: ${theme.spacings[30]};
    background-color: ${theme.colors.block};
    border: ${theme.borders.block} solid ${theme.colors.stroke};

    & + & {
      border-top: initial;
      padding-top: ${theme.spacings[30]};
    }
    &:first-child {
      border-radius: ${theme.borderRadius.block} ${theme.borderRadius.block} 0 0;
    }
    &:last-child {
      border-radius: 0 0 ${theme.borderRadius.block} ${theme.borderRadius.block};
    }

    > * {
      flex: 1;
    }

    ${theme.breakpoints.md} {
      row-gap: ${theme.spacings[30]};
      flex-direction: column;
    }
    ${theme.breakpoints.sm} {
      padding: ${theme.spacings[20]};

      & + & {
        padding-top: ${theme.spacings[20]};
      }
    }
  `}
`;

export const Texts = styled.div`
  ${({ theme }) => css`
    max-width: 500px;

    > p {
      margin-top: ${theme.spacings[8]};
      color: ${theme.colors.textSupport2};
    }
  `}
`;
