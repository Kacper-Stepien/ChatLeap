import { useNavigate } from "react-router-dom";

import userModel from "../models/Author";

import classes from "./Friend.module.scss";

type Props = {
  friend: userModel;
  theme: string;
};

const Friend: React.FC<Props> = ({ friend, theme }) => {
  const styleClasses: string[] = [classes[theme], classes.friend];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${friend._id}`);
  };

  return (
    <div className={styleClasses.join(" ")} onClick={handleClick}>
      <div className={classes.userPhoto}>
        <img
          src={
            friend.photo
              ? process.env.REACT_APP_PHOTOS + `/users/${friend.photo}`
              : "/user.jpg"
          }
          alt="User"
        />
      </div>
      <div className={classes.userInfo}>
        <p className={classes.userFullName}>
          {friend.name} {friend.surname}
        </p>
        <p className={classes.userNick}>{friend.nick}</p>
      </div>
    </div>
  );
};

export default Friend;
