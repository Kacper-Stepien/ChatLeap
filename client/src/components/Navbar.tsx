import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";

import classes from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.navbar];

  return (
    <div className={styleClasses.join(" ")}>
      <SearchBar mode={mode} />
      <ThemeSwitcher />
    </div>
  );
};

export default Navbar;
