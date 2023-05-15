import { createContext } from "react";

export const ThemeContext = createContext({
  mode: "dark",
  accent: "Indigo",
  setMode: (theme: string) => {},
  setAccent: (accent: string) => {},
});
