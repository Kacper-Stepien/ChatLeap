import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

import classes from "./ThemeSwitcher.module.scss";

const ThemeSwitcher: React.FC = () => {
  const { mode, setMode } = useContext(ThemeContext);
  const styleClasses = [classes[mode], classes.themeButton];

  const toggleModeHandler = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <button className={styleClasses.join(" ")} onClick={toggleModeHandler}>
      {mode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeSwitcher;
