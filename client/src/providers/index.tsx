import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeModeProvider } from "@/contexts/ThemeModeContext";
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MotionProvider from "./MotionProvider";
import QueryProvider from "./QueryProvider";
import StylesProvider from "./StylesProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <QueryProvider>
        <MotionProvider>
          <AuthProvider>
            <ThemeModeProvider>
              <StylesProvider>
                <NotificationProvider>
                  <HelmetProvider>{children}</HelmetProvider>
                </NotificationProvider>
              </StylesProvider>
            </ThemeModeProvider>
          </AuthProvider>
        </MotionProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
