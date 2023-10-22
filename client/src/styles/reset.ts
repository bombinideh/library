import { css } from "styled-components";

const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border-radius: 0;
    border: none;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  img,
  menu,
  nav,
  section,
  svg,
  video {
    display: block;
  }
  blockquote,
  q {
    quotes: none;

    &::before,
    &::after {
      content: "";
      content: none;
    }
  }
  ol,
  ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a,
  abbr[title] {
    text-decoration: none;
  }
  button {
    background: none;
    text-align: left;
  }
`;

export default reset;
