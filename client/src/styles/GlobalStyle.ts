import { createGlobalStyle, css } from "styled-components";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`${({ theme }) => css`
  ${reset};

  :root {
    font-size: ${theme.fontSizes.root};
    scroll-behavior: smooth;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }
  body {
    font-family: ${theme.fontFamily};
    font-size: ${theme.fontSizes.body};
    line-height: 1.5;
    font-weight: 400;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-tap-highlight-color: transparent;
  }
  a,
  button,
  datalist,
  input,
  select,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  img,
  video {
    max-width: 100%;
    height: auto;
  }
`}`;

export default GlobalStyle;
