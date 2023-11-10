import { DefaultTheme } from "styled-components";
import colorScheme from "./colorScheme";
import * as mixins from "./mixins";

const theme = (mode: DefaultTheme["mode"]): DefaultTheme => ({
  mixins,
  mode,
  colors: {
    ...colorScheme[mode],
    ...colorScheme.global,
  },
  fontFamily:
    "Poppins, -apple-system, 'system-ui', 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  fontSizes: {
    root: "62.5%",
    h1: "5rem",
    h2: "4rem",
    h3: "3rem",
    h4: "2rem",
    body: "1.5rem",
    bodySm: "1.4rem",
    small: "1.3rem",
  },
  breakpoints: {
    xxl: "@media (max-width: 1399.98px)",
    xl: "@media (max-width: 1199.98px)",
    lg: "@media (max-width: 991.98px)",
    md: "@media (max-width: 767.98px)",
    sm: "@media (max-width: 575.98px)",
  },
  queries: {
    desktop: "@media not all and (hover: none)",
    animation: "@media (preferes-reduced-motion: no-preference)",
  },
  container: {
    gutter: "15px",
  },
  borderRadius: {
    block: "5px",
  },
  borders: {
    block: "1px",
  },
  transitions: {
    form: {
      duration: 200,
      timingFunction: "ease-in-out",
    },
    link: {
      duration: 200,
      timingFunction: "ease-in-out",
    },
    notification: {
      duration: 300,
      timingFunction: "ease-in-out",
    },
  },
  spacings: {
    2: "0.2rem",
    8: "0.8rem",
    12: "1.2rem",
    15: "1.5rem",
    20: "2rem",
    30: "3rem",
    40: "4rem",
  },
  zIndexes: {
    sidebar: 5,
    dropdown: 10,
    notification: 15,
  },
});

export default theme;
