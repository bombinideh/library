import { m } from "framer-motion";
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

export const Error = styled(m.span)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.bodySm};
    color: ${theme.colors.danger};
    margin-top: ${theme.spacings[2]};
  `}
`;
