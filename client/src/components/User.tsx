import { FaSignOutAlt } from "react-icons/fa";
import classes from "./User.module.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const User: React.FC = () => {
  const { user, setLoggedOutUser } = useAuth();

  const styleClasses: string[] = [classes.user];
  const navigate = useNavigate();

  if (!user) return null;
  const { id, userName, userSurname, userNick, photo } = user;

  const openUserPage = () => {
    navigate("/user/" + id);
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
