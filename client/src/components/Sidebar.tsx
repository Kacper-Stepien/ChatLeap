import React, { useContext } from "react";
import { FaAngleLeft } from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";

import Logo from "./Logo";
import User from "./User";
import Menu from "./Menu";
import Footer from "./Footer";

import classes from "./Sidebar.module.scss";

type Props = {
  setShowAside: (show: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ setShowAside }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses: string[] = [classes.sidebar, classes[theme]];
  return (
    <div className={styleClasses.join(" ")}>
      <button
        aria-label="Hide menu button"
        className={classes.backBtn}
        onClick={() => {
          setShowAside(false);
        }}
      >
        <FaAngleLeft />
      </button>
      <Logo mode={"dark"} />
      <User />
      <Menu mode={mode} accent={accent} />
      <Footer mode={"dark"} />
    </div>
  );
};

export default Sidebar;
