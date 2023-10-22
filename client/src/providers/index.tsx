import { ReactNode } from "react";
import StylesProvider from "./StylesProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return <StylesProvider>{children}</StylesProvider>;
}
