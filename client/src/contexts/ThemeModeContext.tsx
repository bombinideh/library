import useAuth from "@/hooks/useAuth";
import storage from "@/utils/storage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type ThemeMode = "light" | "dark";

interface ThemeModeProps {
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleThemeMode: () => void;
}

const defaultContextProps: ThemeModeProps = {
  themeMode: "light",
  setThemeMode: () => {},
  toggleThemeMode: () => {},
};

export const ThemeModeContext = createContext<ThemeModeProps>(defaultContextProps);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState(defaultContextProps.themeMode);
  const toggleThemeMode = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      storage.theme.set("dark");
    } else {
      setThemeMode("light");
      storage.theme.set("light");
    }
  };
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return setThemeMode("light");

    const userPreference = storage.theme.get();

    if (userPreference) return setThemeMode(userPreference);

    const devicePreference = () => {
      const lightQuery = matchMedia("(prefers-color-scheme: light)");

      return lightQuery.matches ? "light" : "dark";
    };

    setThemeMode(devicePreference());
  }, [isAuthenticated]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};
