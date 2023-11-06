import GlobalContextsProvider from "@/contexts";
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import MotionProvider from "./MotionProvider";
import QueryProvider from "./QueryProvider";
import StylesProvider from "./StylesProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <StylesProvider>
      <HelmetProvider>
        <MotionProvider>
          <QueryProvider>
            <GlobalContextsProvider>{children}</GlobalContextsProvider>
          </QueryProvider>
        </MotionProvider>
      </HelmetProvider>
    </StylesProvider>
  );
}
