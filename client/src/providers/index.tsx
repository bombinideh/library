import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import StylesProvider from "./StylesProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <StylesProvider>
      <HelmetProvider>{children}</HelmetProvider>
    </StylesProvider>
  );
}
