import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaBars } from "react-icons/fa";

import classes from "./Navbar.module.scss";

type Props = {
  setShowAside: (show: boolean) => void;
};

const Navbar: React.FC<Props> = ({ setShowAside }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.navbar];

  return (
    <div className={styleClasses.join(" ")}>
      <button
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
