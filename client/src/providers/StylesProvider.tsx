import theme from "@/styles/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface StylesProviderProps {
  children: ReactNode;
}

export default function StylesProvider({ children }: StylesProviderProps) {
  const mode = "light";

  return <ThemeProvider theme={theme(mode)}>{children}</ThemeProvider>;
}
