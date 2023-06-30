import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../utils/LocalStorage";

import classes from "./User.module.scss";

const User: React.FC = () => {
  const { userID, userName, userSurname, userNick, photo, setLoggedIn } =
    useContext(AuthContext);

  const styleClasses: string[] = [classes.user];
  const navigate = useNavigate();

  const logoutHandler = () => {
    const localStorage = new LocalStorage();
    setLoggedIn(false);
    localStorage.clearToken();
    localStorage.clearUser();
  };

  const openUserPage = () => {
    navigate("/user/" + userID);
  };

  return (
    <div className={styleClasses.join(" ")}>
      <img
        src={
          photo ? process.env.REACT_APP_PHOTOS + `/users/${photo}` : "/user.jpg"
        }
        alt="User"
        onClick={openUserPage}
      />
      <p className={classes.userName} onClick={openUserPage}>
        {userName + " " + userSurname}
      </p>
      <p className={classes.userNick} onClick={openUserPage}>
        {userNick}
      </p>
      <button aria-label="Logout button" onClick={logoutHandler}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default User;
