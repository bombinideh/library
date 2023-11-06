import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";

interface GlobalContextsProviderProps {
  children: ReactNode;
}

export default function GlobalContextsProvider({
  children,
}: GlobalContextsProviderProps) {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  );
}
