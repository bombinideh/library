import useThemeMode from "@/hooks/useThemeMode";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface StylesProviderProps {
  children: ReactNode;
}

export default function StylesProvider({ children }: StylesProviderProps) {
  const { themeMode } = useThemeMode();

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <GlobalStyle />

      {children}
    </ThemeProvider>
  );
}
