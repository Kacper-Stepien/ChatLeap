import { FaUserFriends, FaBookmark, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import classes from "./Menu.module.scss";

type Props = {
  mode: string;
  accent: string;
  openTab: string;
  changeOpenTab: (isOpen: string) => void;
};

const Menu: React.FC<Props> = ({ mode, accent, openTab, changeOpenTab }) => {
  const theme: string = mode + accent;
  const styleClasses: string[] = [classes.menu, classes[theme]];
  return (
    <nav className={styleClasses.join(" ")}>
      <button
        className={openTab === "main" ? classes.active : ""}
        onClick={() => {
          changeOpenTab("main");
        }}
      >
        <FaHome className={classes.icon} />
        Main
      </button>
      <button
        className={openTab === "friends" ? classes.active : ""}
        onClick={() => {
          changeOpenTab("friends");
        }}
      >
        <FaUserFriends className={classes.icon} />
        Friends
      </button>
      {/* <button>
        <FaBookmark className={classes.icon} />
        Bookmarks
      </button> */}
      <button
        className={openTab === "settings" ? classes.active : ""}
        onClick={() => {
          changeOpenTab("settings");
        }}
      >
        <AiFillSetting className={classes.icon} />
        Settings
      </button>
    </nav>
  );
};

export default Menu;
