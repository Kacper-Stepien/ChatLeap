import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Friends from "../components/Friends";
import Settings from "../components/Settings";
import AbsoluteWrapper from "../components/AbsoluteWrapper";

import classes from "./Main.module.scss";

function Main() {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];
  const [openTab, setOpenTab] = useState("main");
  const [showAside, setShowAside] = useState(false);

  return (
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar
          changeOpenTab={setOpenTab}
          openTab={openTab}
          setShowAside={setShowAside}
        />
      </aside>
      {showAside && (
        <AbsoluteWrapper
          theme={theme}
          children={
            <Sidebar
              changeOpenTab={setOpenTab}
              openTab={openTab}
              setShowAside={setShowAside}
            />
          }
        />
      )}
      <div className={classes.main}>
        <Navbar setShowAside={setShowAside} />
        {openTab === "main" && <Posts />}
        {openTab === "settings" && <Settings />}
        {openTab === "friends" && <Friends />}
      </div>
    </div>
  );
}

export default Main;
