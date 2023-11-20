import { ThemeModeContext } from "@/contexts/ThemeModeContext";
import { useContext } from "react";

export default function useThemeMode() {
  return useContext(ThemeModeContext);
}
