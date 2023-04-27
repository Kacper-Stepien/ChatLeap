import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";

import classes from "./Post.module.scss";

const Post: React.FC<{
  userName: string;
  userNick: string;
  postContent: string;
  hastags: string[];
  date: string;
}> = ({ userName, userNick, postContent, hastags, date }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.post];
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.postHeader}>
        <div className={classes.postUser}>
          <img
            className={classes.postUserImage}
            src="https://xsgames.co/randomusers/avatar.php?g=female"
          />
          <div className={classes.postUserData}>
            <p className={classes.postUsername}>{userName}</p>
            <p className={classes.postUserNick}>{userNick}</p>
          </div>
        </div>
        <p className={classes.postDate}>{date}</p>
      </div>
      <div className={classes.postContent}>{postContent} </div>
      <div className={classes.postFooter}>
        <div className={classes.postFooterActions}>
          <div className={classes.postFooterAction}>
            <FaRegHeart />
            <p>23k</p>
          </div>
          <div className={classes.postFooterAction}>
            <FaRegComment />
            <p>129</p>
          </div>
        </div>
        <div className={classes.postFooterHashtags}>
          {hastags.map((hashtag) => (
            <p>{hashtag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
