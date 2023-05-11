import { useContext, useState, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import {
  FaRegComment,
  FaComment,
  FaRegHeart,
  FaHeart,
  FaAngleUp,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import Comment from "./Comment";
import AddComment from "./AddComment";
import PostModel from ".././models/Post";
import LikeModel from ".././models/Like";
import CommentModel from ".././models/Comment";
import formatDate from "../utils/FormatDate";
import LoadingSPpinner from "./LoadingSpinner";

import classes from "./Post.module.scss";

type PostProps = {
  post: PostModel;
  deletePost: (id: string) => void;
  updatePost: (id: string, text: string) => void;
};

const Post: React.FC<PostProps> = ({ post, deletePost, updatePost }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.allPost];
  const { userID, token } = useContext(AuthContext);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<LikeModel[]>(post.likes);
  const [postComments, setPostComments] = useState<CommentModel[]>(
    post.comments
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [userLike, setUserLike] = useState<boolean>(
    postLikes.some((like) => like.author === userID)
  );
  const [userComment, setUserComment] = useState<boolean>(
    postComments.some((comment) => comment.author._id === userID)
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  let userIsAnAuthor: boolean = false;

  const [loading, setLoading] = useState<boolean>(false);

  if (post.author._id === userID) userIsAnAuthor = true;

  const toggleLike = async () => {
    const address =
      process.env.REACT_APP_SERVER + "/posts/" + post._id + "/likes";
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

  const showComments = async () => {
    if (commentsOpen) {
      setCommentsOpen(false);
      return;
    }

    const address =
      process.env.REACT_APP_SERVER + "/posts/" + post._id + "/comments";
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        setPostComments(data.data.comments);
        setCommentsOpen(true);
      }
    } catch (err) {}
  };

  const updateComment = async (id: string, text: string) => {
    const address = process.env.REACT_APP_SERVER + "/comments/" + id;
    try {
      setLoading(true);
      const response = await fetch(address, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setLoading(false);
      if (data.status === "success") {
        setPostComments(
          postComments.map((comment) => {
            if (comment._id === id) {
              return { ...comment, text };
            }
            return comment;
          })
        );
      } else if (data.status === "fail" || data.status === "error") {
        alert(data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    const address = process.env.REACT_APP_SERVER + "/comments/" + id;
    try {
      setLoading(true);
      const response = await fetch(address, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 204) {
        setPostComments(postComments.filter((comment) => comment._id !== id));
        setLoading(false);
        return;
      }

      const data = await response.json();
      setLoading(false);
      if (data.status === "fail" || data.status === "error") {
        alert(data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const toggleUpdate = () => {
    textAreaRef.current?.focus();
    setUpdateOpen(!updateOpen);
  };

  return (
    <div key={post._id} className={styleClasses.join(" ")}>
      <div className={classes.post}>
        <div className={classes.postHeader}>
          <div className={classes.postUser}>
            <img className={classes.postUserImage} src="/user.jpg" />
            <div className={classes.postUserData}>
              <p className={classes.postUsername}>
                {post.author.name + " " + post.author.surname}
              </p>
              <p className={classes.postUserNick}>{post.author.nick}</p>
            </div>
          </div>
          <div className={classes.postMenu}>
            {userIsAnAuthor && (
              <>
                <button
                  onClick={() => {
                    deletePost(post._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <button onClick={toggleUpdate}>
                  <FaEdit />
                </button>
              </>
            )}
            <p className={classes.postDate}>{formatDate(post.createdAt)}</p>
            {post.modifiedAt !== post.createdAt && (
              <p className={classes.postDateUpdate}>
                Edit {formatDate(post.modifiedAt)}
              </p>
            )}
          </div>
        </div>
        {updateOpen && (
          <div className={classes.postContent}>
            {
              <textarea
                ref={textAreaRef}
                defaultValue={post.text}
                maxLength={250}
              ></textarea>
            }{" "}
            <button
              className={classes.updateButton}
              onClick={() => {
                if (textAreaRef.current) {
                  updatePost(post._id, textAreaRef.current.value);
                  toggleUpdate();
                }
              }}
            >
              Update
            </button>
          </div>
        )}
        {!updateOpen && <div className={classes.postContent}>{post.text} </div>}
        <div className={classes.postFooter}>
          <div className={classes.postFooterActions}>
            <div className={classes.postFooterAction}>
              <button onClick={toggleLike}>
                {userLike ? <FaHeart /> : <FaRegHeart />}
              </button>

              <p>{postLikes.length}</p>
            </div>
            <div className={classes.postFooterAction}>
              <button onClick={showComments}>
                {userComment ? <FaComment /> : <FaRegComment />}
              </button>

              <p>{postComments.length}</p>
            </div>
          </div>
          {/* <div className={classes.postFooterHashtags}>
          {hastags.map((hashtag) => (
            <p>{hashtag}</p>
          ))}
        </div> */}
        </div>
      </div>
      {commentsOpen && (
        <div className={classes.comments}>
          <AddComment
            mode={mode}
            postID={post._id}
            userID={userID}
            token={token}
            comments={postComments}
            setComments={setPostComments}
          />
          {postComments.map((comment) => (
            <Comment
              comment={comment}
              userID={userID}
              mode={mode}
              updateComment={updateComment}
              deleteComment={deleteComment}
            />
          ))}
          <button className={classes.closeComments} onClick={showComments}>
            <FaAngleUp />
          </button>
        </div>
      )}
      {loading && <LoadingSPpinner />}
    </div>
  );
};

export default Post;
