import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacings[40]};
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: ${theme.spacings[40]};
    padding: ${theme.spacings[30]};
    padding-top: ${theme.spacings[40]};
    border-bottom: ${theme.borders.block} solid ${theme.colors.stroke};
  `}
`;

export const ProfileButton = styled.button`
  ${({ theme }) => css`
    max-width: 300px;
    display: flex;
    align-items: center;
    column-gap: ${theme.spacings[12]};
    cursor: pointer;

    ${theme.mixins.buttonColorState({
      properties: ["color"],
      colors: ["text"],
      transitionElement: "link",
      SVGChildren: {
        properties: ["stroke"],
        colors: ["textSupport1"],
      },
    })}

    svg {
      flex-shrink: 0;
    }
    span {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`;

export const Content = styled.main``;
