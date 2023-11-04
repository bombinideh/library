import { ReactNode } from "react";
import { NotificationProvider } from "./NotificationContext";

interface GlobalContextsProviderProps {
  children: ReactNode;
}

export default function GlobalContextsProvider({
  children,
}: GlobalContextsProviderProps) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
