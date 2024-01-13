import styled, { css } from "styled-components";

export const BookFields = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings[10]};
`;

export const Pagination = styled.div`
  ${({ theme }) => css`
    border-top: ${theme.borders.block} solid ${theme.colors.stroke};
    padding: ${theme.spacings[15]} ${theme.spacings[30]};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings[15]};
  `}
`;

export const Buttons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacings[10]};

    > * {
      flex: 1;
    }
  `}
`;

export const Infos = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > span + span {
      margin-left: ${theme.spacings[10]};
      padding-left: ${theme.spacings[10]};
      border-left: ${theme.borders.block} solid ${theme.colors.stroke};
      color: ${theme.colors.textSupport1};
    }
    > span:last-child {
      font-size: ${theme.fontSizes.bodySm};
    }
  `}
`;
