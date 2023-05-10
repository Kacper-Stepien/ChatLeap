import { FaUserFriends, FaBookmark, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import classes from "./Menu.module.scss";

type Props = {
  mode: string;
  accent: string;
  changeOpenTab: (isOpen: string) => void;
};

const Menu: React.FC<Props> = ({ mode, accent, changeOpenTab }) => {
  const theme: string = mode + accent;
  const styleClasses: string[] = [classes.menu, classes[theme]];
  return (
    <nav className={styleClasses.join(" ")}>
      <button
        onClick={() => {
          changeOpenTab("main");
        }}
      >
        <FaHome className={classes.icon} />
        Main
      </button>
      <button>
        <FaUserFriends className={classes.icon} />
        Friends
      </button>
      <button>
        <FaBookmark className={classes.icon} />
        Bookmarks
      </button>
      <button
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
