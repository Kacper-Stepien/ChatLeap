import { useContext, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";

import AbsoluteWrapper from "../components/AbsoluteWrapper";
import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Friends from "../components/Friends";
import Settings from "../components/Settings";

import classes from "./Main.module.scss";

type Tabs = {
  [key: string]: React.ReactNode;
};

function Main() {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  const [activeTab, setActiveTab] = useState("main");
  const [isAsideVisible, setAsideVisible] = useState(false);

  const tabs: Tabs = {
    main: <Posts />,
    settings: <Settings />,
    friends: <Friends />,
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAsideVisible(false);
  };

  return (
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar
          changeOpenTab={handleTabChange}
          openTab={activeTab}
          setShowAside={setAsideVisible}
        />
      </aside>
      {isAsideVisible && (
        <AbsoluteWrapper
          theme={theme}
          children={
            <Sidebar
              changeOpenTab={handleTabChange}
              openTab={activeTab}
              setShowAside={setAsideVisible}
            />
          }
        />
      )}
      <div className={classes.main}>
        <Navbar setShowAside={setAsideVisible} />
        {tabs[activeTab]}
      </div>
    </div>
  );
}

export default Main;
