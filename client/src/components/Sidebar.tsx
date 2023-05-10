import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";
import User from "./User";
import Menu from "./Menu";
import Footer from "./Footer";
import classes from "./Sidebar.module.scss";

type Props = {
  changeOpenTab: (isOpen: string) => void;
};

const Sidebar: React.FC<Props> = ({ changeOpenTab }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses: string[] = [classes.sidebar, classes[theme]];
  return (
    <div className={styleClasses.join(" ")}>
      <Logo mode={"dark"} />
      <User />
      <Menu mode={mode} accent={accent} changeOpenTab={changeOpenTab} />
      <Footer mode={"dark"} />
    </div>
  );
};

export default Sidebar;
