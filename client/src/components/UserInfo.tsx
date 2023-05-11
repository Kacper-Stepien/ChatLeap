import UserModel from "./../models/Author";
import PostModel from "./../models/Post";

import classes from "./UserInfo.module.scss";

type Props = {
  user: UserModel | undefined;
  posts: PostModel[];
  theme: string;
};

const UserInfo: React.FC<Props> = ({ user, posts, theme }) => {
  const styleClasses = [classes[theme], classes.container];
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" />
      </div>
      <div className={classes.userInfo}>
        <p className={classes.userName}>{user?.name + " " + user?.surname}</p>
        <p className={classes.userNick}>{user?.nick}</p>
      </div>
    </div>
  );
};

export default UserInfo;
