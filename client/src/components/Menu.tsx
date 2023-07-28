import { FaBookmark, FaHome, FaUserFriends } from "react-icons/fa";

import { AiFillSetting } from "react-icons/ai";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.scss";
import { useTheme } from "../context/ThemeContext";

type Props = {
  setShowAside?: (show: boolean) => void;
};

const Menu: FC<Props> = ({ setShowAside }) => {
  const { theme } = useTheme();

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
