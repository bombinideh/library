import styled, { css } from "styled-components";
import { varMobileSidebar } from "./Sidebar/styles";

interface WrapperProps {
  $sidebarHeight: string;
  $sidebarWidth: string;
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $sidebarHeight, $sidebarWidth }) => css`
    padding-left: ${$sidebarWidth};

    ${theme.breakpoints[varMobileSidebar]} {
      padding-left: initial;
      padding-bottom: ${$sidebarHeight};
    }
  `}
`;
