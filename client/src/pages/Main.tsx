import AbsoluteWrapper from "../components/AbsoluteWrapper";
import { FC } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from ".././components/Sidebar";
import classes from "./Main.module.scss";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Main: FC = () => {
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
          children={<Sidebar setShowAside={setMobileAsideVisible} />}
        />
      )}
      <div className={classes.main}>
        <Navbar setShowAside={setMobileAsideVisible} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
