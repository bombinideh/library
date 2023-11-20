import { m } from "framer-motion";
import styled, { css } from "styled-components";
import { IField } from "../form";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

interface LabelProps {
  $disabled: IField["disabled"];
}

export const Label = styled.label<LabelProps>`
  ${({ theme, $disabled }) => css`
    display: block;
    padding-bottom: ${theme.spacings[8]};
    ${theme.mixins.transition({ element: "form", properties: ["opacity"] })}

    ${$disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}
  `}
`;

export const Error = styled(m.span)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.bodySm};
    color: ${theme.colors.danger};
    margin-top: ${theme.spacings[2]};
  `}
`;
