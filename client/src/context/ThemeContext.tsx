import {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
  ReactNode,
} from "react";

import LocalStorage from "../utils/LocalStorage";

interface ThemeContextProps {
  mode: string;
  accent: string;
  theme: string;
  setThemeMode: (theme: string) => void;
  setThemeAccent: (accent: string) => void;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

const initialState: ThemeContextProps = {
  mode: "dark",
  accent: "Indigo",
  theme: "darkIndigo",
  setThemeMode: (theme: string) => {},
  setThemeAccent: (accent: string) => {},
};

const ThemeContext = createContext<ThemeContextProps>(initialState);

const ThemeProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<string>("dark");
  const [accent, setAccent] = useState<string>("Indigo");

  let theme = mode + accent;

  const localStorage = new LocalStorage();

  const setThemeMode = (theme: string) => {
    if (theme) {
      setMode(theme);
      localStorage.writeMode(theme);
    } else {
      throw new Error("No theme provided");
    }
  };

  const setThemeAccent = (accent: string) => {
    if (accent) {
      setAccent(accent);
      localStorage.writeAccent(accent);
    } else {
      throw new Error("No accent provided");
    }
  };

  useEffect(() => {
    const initializeApp = () => {
      const storedMode = localStorage.readMode();
      const storedAccent = localStorage.readAccent();
      if (storedMode) {
        setMode(storedMode);
      }
      if (storedAccent) {
        setAccent(storedAccent);
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, accent, theme, setThemeMode, setThemeAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
