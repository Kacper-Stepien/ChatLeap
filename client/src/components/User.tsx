import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import classes from "./User.module.scss";

const User: React.FC = () => {
  const { userName, userSurname, userNick, setLoggedIn } =
    useContext(AuthContext);
  const styleClasses: string[] = [classes.user];

  const logoutHandler = () => {
    setLoggedIn(false);
  };

  return (
    <div className={styleClasses.join(" ")}>
      <img src="/user.jpg" alt="User" />
      <p className={classes.userName}>{userName + " " + userSurname}</p>
      <p className={classes.userNick}>{userNick}</p>
      <button onClick={logoutHandler}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default User;
