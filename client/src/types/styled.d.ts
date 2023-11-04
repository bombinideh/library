import * as mixins from "@/styles/mixins";
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
  primaryText: string;
  dangerLight1: string;
  danger: string;
  successLight1: string;
  success: string;
}

interface Transition {
  duration: number;
  timingFunction: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    mixins: typeof mixins;
    mode: "light" | "dark";
    colors: ThemeColors & StaticColors;
    fontFamily: string;
    fontSizes: {
      root: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body: string;
      bodySm: string;
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
    borderRadius: {
      block: string;
    };
    borders: {
      block: string;
    };
    transitions: {
      form: Transition;
      link: Transition;
      notification: Transition;
    };
    spacings: {
      2: string;
      8: string;
      12: string;
      15: string;
      20: string;
      30: string;
    };
    zIndexes: {
      notification: number;
    };
  }
}
