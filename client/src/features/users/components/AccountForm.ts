import Form from "@/components/Form";
import styled, { css } from "styled-components";

export const AccountForm = styled(Form)`
  ${({ theme }) => css`
    max-width: 450px;
    display: flex;
    align-items: flex-start;

    > div {
      width: 100%;
    }
    > button:last-child {
      margin-top: calc(${theme.spacings[20]} - ${theme.spacings[8]});

      ${theme.breakpoints.sm} {
        width: 100%;
      }
    }

    ${theme.breakpoints.md} {
      max-width: initial;
    }
  `}
`;
