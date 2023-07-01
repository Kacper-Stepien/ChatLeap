import { FaUserFriends, FaBookmark, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import classes from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

type Props = {
  mode: string;
  accent: string;
  setShowAside?: (show: boolean) => void;
};

const Menu: React.FC<Props> = ({ mode, accent, setShowAside }) => {
  const theme: string = mode + accent;
  const styleClasses: string[] = [classes.menu, classes[theme]];

  const closeAside = () => {
    if (setShowAside) {
      setShowAside(false);
    }
  };

  return (
    <nav className={styleClasses.join(" ")}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
        onClick={closeAside}
      >
        <FaHome className={classes.icon} />
        Main
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
        onClick={closeAside}
      >
        <FaUserFriends className={classes.icon} />
        Friends
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
        onClick={closeAside}
      >
        <AiFillSetting className={classes.icon} />
        Settings
      </NavLink>
    </nav>
  );
};

export default Menu;
