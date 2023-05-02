import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import PostModel from ".././models/Post";
import LikeModel from ".././models/Like";

import classes from "./Post.module.scss";

const Post: React.FC<PostModel> = ({
  _id,
  text,
  createdAt,
  modifiedAt,
  author,
  comments,
  likes,
}) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.post];
  const { userID, token } = useContext(AuthContext);
  const [postLikes, setPostLikes] = useState<LikeModel[]>(likes);
  const [userLike, setUserLike] = useState<boolean>(
    postLikes.some((like) => like.author === userID)
  );

  let userIsAnAuthor: boolean = false;

  if (author._id === userID) userIsAnAuthor = true;

  const toggleLike = async () => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + _id + "/likes";
    try {
      const response = await fetch(address, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      if (data.status === "success") {
        setUserLike(!userLike);
        setPostLikes(data.data.likes);
      }
    } catch (err) {}
  };

  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.postHeader}>
        <div className={classes.postUser}>
          <img
            className={classes.postUserImage}
            src="https://xsgames.co/randomusers/avatar.php?g=female"
          />
          <div className={classes.postUserData}>
            <p className={classes.postUsername}>
              {author.name + " " + author.surname}
            </p>
            <p className={classes.postUserNick}>{author.nick}</p>
          </div>
        </div>
        <p className={classes.postDate}>{createdAt}</p>
      </div>
      <div className={classes.postContent}>{text} </div>
      <div className={classes.postFooter}>
        <div className={classes.postFooterActions}>
          <div className={classes.postFooterAction}>
            <button onClick={toggleLike}>
              {userLike ? <FaHeart /> : <FaRegHeart />}
            </button>

            <p>{postLikes.length}</p>
          </div>
          <div className={classes.postFooterAction}>
            <FaRegComment />
            <p>{comments.length}</p>
          </div>
          {userIsAnAuthor && <p>Jestem autorem</p>}
        </div>
        {/* <div className={classes.postFooterHashtags}>
          {hastags.map((hashtag) => (
            <p>{hashtag}</p>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Post;
