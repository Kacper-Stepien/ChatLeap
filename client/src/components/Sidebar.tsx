import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";
import User from "./User";
import Menu from "./Menu";
import Footer from "./Footer";
import { FaAngleLeft } from "react-icons/fa";
import classes from "./Sidebar.module.scss";

type Props = {
  openTab: string;
  changeOpenTab: (isOpen: string) => void;
  setShowAside: (show: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ openTab, changeOpenTab, setShowAside }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses: string[] = [classes.sidebar, classes[theme]];
  return (
    <div className={styleClasses.join(" ")}>
      <button
        className={classes.backBtn}
        onClick={() => {
          setShowAside(false);
        }}
      >
        <FaAngleLeft />
      </button>
      <Logo mode={"dark"} />
      <User />
      <Menu
        mode={mode}
        accent={accent}
        openTab={openTab}
        changeOpenTab={changeOpenTab}
      />
      <Footer mode={"dark"} />
    </div>
  );
};

export default Sidebar;
