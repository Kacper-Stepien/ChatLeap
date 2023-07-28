import { FaSun, FaMoon } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

import classes from "./ThemeSwitcher.module.scss";

const ThemeSwitcher: React.FC = () => {
  const { mode, setThemeMode } = useTheme();
  const styleClasses = [classes[mode], classes.themeButton];

  const toggleModeHandler = () => {
    if (mode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  return (
    <button
      aria-label="Theme switcher button"
      className={styleClasses.join(" ")}
      onClick={toggleModeHandler}
    >
      {mode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeSwitcher;
