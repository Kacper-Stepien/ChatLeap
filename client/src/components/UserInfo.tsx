import UserModel from "./../models/Author";

import classes from "./UserInfo.module.scss";

type Props = {
  user: UserModel | undefined;
  theme: string;
};

const UserInfo: React.FC<Props> = ({ user, theme }) => {
  const styleClasses = [classes[theme], classes.container];
  let userFullName = "";
  if (user) userFullName = user.name + " " + user.surname;
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img
          src={
            user?.photo
              ? process.env.REACT_APP_PHOTOS + `/users/${user.photo}`
              : "/user.jpg"
          }
          alt="User"
        />
      </div>
      <div className={classes.userInfo}>
        <p className={classes.userName}>{userFullName}</p>
        <p className={classes.userNick}>{user?.nick}</p>
      </div>
    </div>
  );
};

export default UserInfo;
