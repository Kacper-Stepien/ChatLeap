import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Settings from "../components/Settings";

import classes from "./Main.module.scss";

function Main() {
  const navigate = useNavigate();
  const { mode, accent, setMode } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];
  const [isOpen, setIsOpen] = useState("main");

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar changeOpenTab={setIsOpen} />
      </aside>
      <div className={classes.main}>
        <Navbar />
        {isOpen === "main" && <Posts />}
        {isOpen === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default Main;
