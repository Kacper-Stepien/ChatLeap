import { FaUserFriends, FaBookmark, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import classes from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

type Props = {
  mode: string;
  accent: string;
};

const Menu: React.FC<Props> = ({ mode, accent }) => {
  const theme: string = mode + accent;
  const styleClasses: string[] = [classes.menu, classes[theme]];
  return (
    <nav className={styleClasses.join(" ")}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
      >
        <FaHome className={classes.icon} />
        Main
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
      >
        <FaUserFriends className={classes.icon} />
        Friends
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.active}` : classes.link
        }
      >
        <AiFillSetting className={classes.icon} />
        Settings
      </NavLink>
    </nav>
  );
};

export default Menu;
