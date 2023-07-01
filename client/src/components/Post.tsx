import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { LoadingSpinnerContext } from "../context/LoadinSpinnerContext";

import {
  FaRegComment,
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
import { ModalType } from "../hooks/use-modal";
import formatDate from "../utils/FormatDate";
import LoadingSPpinner from "./LoadingSpinner";
import { LogoutUser } from "../utils/LogoutUser";

import classes from "./Post.module.scss";

type PostProps = {
  post: PostModel;
  deletePost: (id: string) => void;
  updatePost: (id: string, text: string) => void;
  openModal: (title: string, content: string, type: ModalType) => void;
};

const Post: React.FC<PostProps> = ({
  post,
  deletePost,
  updatePost,
  openModal,
}) => {
  const { setIsLoading } = useContext(LoadingSpinnerContext);
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.allPost];

  const { userID, token, setLoggedIn } = useContext(AuthContext);

  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [downloadingComments, setDownloadingComments] =
    useState<boolean>(false);

  const [postLikes, setPostLikes] = useState<LikeModel[]>(post.likes);
  const [postComments, setPostComments] = useState<CommentModel[]>(
    post.comments
  );

  const [userLike, setUserLike] = useState<boolean>(
    postLikes.some((like) => like.author === userID)
  );

  let userInLikesArray = postLikes.some((like) => like.author === userID);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  let userIsAnAuthor: boolean = false;

  const navigate = useNavigate();

  if (post.author._id === userID) userIsAnAuthor = true;

  const toggleLike = async () => {
    const newLikeValue = !userLike;
    setUserLike(newLikeValue);

    const address = `${process.env.REACT_APP_SERVER}/posts/${post._id}/likes`;

    try {
      const response = await fetch(address, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        setPostLikes(data.data.likes);

        if (data.userLikesPost) {
          if (!newLikeValue) {
            setTimeout(() => setUserLike(true), 2000);
          }
        } else {
          if (newLikeValue) {
            setTimeout(() => setUserLike(false), 2000);
          }
        }
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const showComments = async () => {
    if (commentsOpen) {
      setCommentsOpen(false);
      return;
    }
    setDownloadingComments(true);
    setCommentsOpen(true);
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
      setDownloadingComments(false);
      if (data.status === "success") {
        setPostComments(data.data.comments);
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      } else {
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const updateComment = async (id: string, text: string) => {
    const address = process.env.REACT_APP_SERVER + "/comments/" + id;
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setIsLoading(false);
      if (data.status === "success") {
        setPostComments(
          postComments.map((comment) => {
            if (comment._id === id) {
              return { ...comment, text };
            }
            return comment;
          })
        );
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      } else if (data.status === "fail" || data.status === "error") {
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      setIsLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const deleteComment = async (id: string) => {
    const address = process.env.REACT_APP_SERVER + "/comments/" + id;
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 204) {
        setPostComments(postComments.filter((comment) => comment._id !== id));
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      }
      if (data.status === "fail" || data.status === "error") {
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const toggleUpdate = () => {
    textAreaRef.current?.focus();
    setUpdateOpen(!updateOpen);
  };

  const openUserPage = () => {
    navigate("/user/" + post.author._id);
  };

  return (
    <div key={post._id} className={styleClasses.join(" ")}>
      <div className={classes.post}>
        <div className={classes.postHeader}>
          <div className={classes.postUser}>
            <img
              className={classes.postUserImage}
              src={
                post.author.photo
                  ? process.env.REACT_APP_PHOTOS + `/users/${post.author.photo}`
                  : "/user.jpg"
              }
              alt="User"
              onClick={openUserPage}
            />
            <div className={classes.postUserData}>
              <p className={classes.postUsername} onClick={openUserPage}>
                {post.author.name + " " + post.author.surname}
              </p>
              <p className={classes.postUserNick} onClick={openUserPage}>
                {post.author.nick}
              </p>
            </div>
          </div>
          <div className={classes.postMenu}>
            {userIsAnAuthor && (
              <>
                <button
                  aria-label="Delete post button"
                  onClick={() => {
                    deletePost(post._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <button
                  aria-label="Open post edit mode button"
                  onClick={toggleUpdate}
                >
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
              aria-label="Update post button"
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
              <button
                aria-label="Add/remove like from post button"
                onClick={toggleLike}
              >
                {userLike ? <FaHeart /> : <FaRegHeart />}
              </button>

              <p>
                {userInLikesArray && userLike
                  ? postLikes.length
                  : userInLikesArray && !userLike
                  ? postLikes.length - 1
                  : !userInLikesArray && userLike
                  ? postLikes.length + 1
                  : postLikes.length}
              </p>
            </div>
            <div className={classes.postFooterAction}>
              <button aria-label="Show comments button" onClick={showComments}>
                <FaRegComment />
              </button>

              <p>{postComments.length}</p>
            </div>
          </div>
          <div className={classes.postFooterHashtags}>
            {/* {hashtags.map((hashtag) => (
              <p>{hashtag}</p>
            ))} */}
          </div>
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
            openModal={openModal}
          />
          {!downloadingComments &&
            postComments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                userID={userID}
                mode={mode}
                updateComment={updateComment}
                deleteComment={deleteComment}
              />
            ))}
          {downloadingComments && (
            <LoadingSPpinner message="Downloading comments" small />
          )}
          <button
            aria-label="Close comments button"
            className={classes.closeComments}
            onClick={showComments}
          >
            <FaAngleUp />
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
