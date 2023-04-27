import { FaSignOutAlt } from "react-icons/fa";
import classes from "./User.module.scss";

const User: React.FC = () => {
  const styleClasses: string[] = [classes.user];
  return (
    <div className={styleClasses.join(" ")}>
      <img src="/user.jpg" alt="User" />
      <p className={classes.userName}>Kacper Stępień</p>
      <p className={classes.userNick}>@kacper2076</p>
      <button>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default User;
