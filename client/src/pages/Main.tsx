import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";

import AbsoluteWrapper from "../components/AbsoluteWrapper";
import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";

import classes from "./Main.module.scss";

function Main() {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];
  const [isAsideVisible, setAsideVisible] = useState(false);

  return (
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar setShowAside={setAsideVisible} />
      </aside>
      {isAsideVisible && (
        <AbsoluteWrapper
          theme={theme}
          children={<Sidebar setShowAside={setAsideVisible} />}
        />
      )}
      <div className={classes.main}>
        <Navbar setShowAside={setAsideVisible} />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
