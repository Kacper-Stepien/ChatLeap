import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import LocalStorage from "../utils/LocalStorage";

import classes from "./User.module.scss";

const User: React.FC = () => {
  const { user, setLoggedOutUser } = useAuth();

  const styleClasses: string[] = [classes.user];
  const navigate = useNavigate();

  if (!user) return null;
  const { userID, userName, userSurname, userNick, photo } = user;

  const openUserPage = () => {
    navigate("/user/" + userID);
  };

  return (
    <div className={styleClasses.join(" ")}>
      <img
        src={
          photo ? process.env.REACT_APP_PHOTOS + `/users/${photo}` : "/user.jpg"
        }
        alt="Logged in user"
        onClick={openUserPage}
      />
      <p className={classes.userName} onClick={openUserPage}>
        {userName + " " + userSurname}
      </p>
      <p className={classes.userNick} onClick={openUserPage}>
        {userNick}
      </p>
      <button
        className={classes.logoutBtn}
        aria-label="Logout button"
        onClick={setLoggedOutUser}
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default User;
