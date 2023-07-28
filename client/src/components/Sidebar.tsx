import { FaAngleLeft } from "react-icons/fa";
import Footer from "./Footer";
import Logo from "./Logo";
import Menu from "./Menu";
import React from "react";
import User from "./User";
import classes from "./Sidebar.module.scss";
import { useTheme } from "../context/ThemeContext";

type Props = {
  setShowAside: (show: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ setShowAside }) => {
  const { theme } = useTheme();
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
      <Logo mode="dark" />
      <User />
      <Menu setShowAside={setShowAside} />
      <Footer mode="dark" />
    </div>
  );
};

export default Sidebar;
