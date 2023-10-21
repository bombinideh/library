import "styled-components";

interface ThemeColors {
  background: string;
  block: string;
  blockSupport1: string;
  blockSupport2: string;
  text: string;
  textSupport1: string;
  textSupport2: string;
  stroke: string;
}

interface StaticColors {
  primaryLight1: string;
  primary: string;
  primaryDark1: string;
  primaryDark2: string;
  dangerLight1: string;
  danger: string;
  successLight1: string;
  success: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: ThemeColors & StaticColors;
    fontFamily: string;
    fontSizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body: string;
      small: string;
    };
    breakpoints: {
      xxl: string;
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
    queries: {
      desktop: string;
      animation: string;
    };
  }
}
