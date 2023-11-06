import { NotificationContext } from "@/contexts/NotificationContext";
import { useContext } from "react";

export default function useNotification() {
  return useContext(NotificationContext);
}
