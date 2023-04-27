import { FaUserFriends, FaBookmark, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import classes from "./Menu.module.scss";

const Menu: React.FC<{ mode: string; accent: string }> = ({ mode, accent }) => {
  const theme: string = mode + accent;
  const styleClasses: string[] = [classes.menu, classes[theme]];
  return (
    <nav className={styleClasses.join(" ")}>
      <button>
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
      <button>
        <AiFillSetting className={classes.icon} />
        Settings
      </button>
    </nav>
  );
};

export default Menu;
