import React from "react";

import { useTheme } from "../context/ThemeContext";

import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaBars } from "react-icons/fa";

import classes from "./Navbar.module.scss";

type Props = {
  setShowAside: (show: boolean) => void;
};

const Navbar: React.FC<Props> = ({ setShowAside }) => {
  const { mode, theme } = useTheme();
  const styleClasses = [classes[theme], classes.navbar];

  return (
    <div className={styleClasses.join(" ")}>
      <button
        aria-label="Menu button"
        className={classes.menu}
        onClick={() => {
          setShowAside(true);
        }}
      >
        <FaBars />
      </button>
      <SearchBar mode={mode} />
      <ThemeSwitcher />
    </div>
  );
};

export default Navbar;
