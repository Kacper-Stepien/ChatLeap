import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import AbsoluteWrapper from "../components/AbsoluteWrapper";
import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";

import classes from "./Main.module.scss";

function Main() {
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.page];
  const [isMobileAsideVisible, setMobileAsideVisible] = useState(false);

  return (
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar setShowAside={setMobileAsideVisible} />
      </aside>
      {isMobileAsideVisible && (
        <AbsoluteWrapper
          theme={theme}
          children={<Sidebar setShowAside={setMobileAsideVisible} />}
        />
      )}
      <div className={classes.main}>
        <Navbar setShowAside={setMobileAsideVisible} />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
