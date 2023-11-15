import { m } from "framer-motion";
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import Button from "../Elements/Button";

export const Wrapper = styled(m.div)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    z-index: ${theme.zIndexes.modal};
    background-color: ${transparentize(0.4, theme.colors.black)};
    padding: ${theme.spacings[30]} ${theme.container.gutter};
  `}
`;

export const Dialog = styled(m.div)`
  ${({ theme }) => css`
    max-height: 100%;
    max-width: 550px;
    width: 100%;
    background-color: ${theme.colors.background};
    border-radius: ${theme.borderRadius.block};
    display: flex;
    flex-direction: column;

    > * {
      padding: ${theme.spacings[20]} ${theme.spacings[30]};
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: ${theme.spacings[30]};
    border-bottom: 1px solid ${theme.colors.stroke};
  `}
`;

export const CloseButton = styled(Button)`
  svg:first-child {
    width: 12px;
    height: 12px;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    max-height: 100%;
    padding-top: ${theme.spacings[30]};
    padding-bottom: ${theme.spacings[30]};
    overflow-y: auto;
    ${theme.mixins.scrollbar()}

    > p {
      text-align: center;
      color: ${theme.colors.textSupport1};
      padding: ${theme.spacings[20]} 0;
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: ${theme.spacings[15]};
    border-top: 1px solid ${theme.colors.stroke};
  `}
`;
