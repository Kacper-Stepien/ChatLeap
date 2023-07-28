import { FC, useRef, useState } from "react";

import CommentModel from ".././models/Comment";
import { ModalType } from "../hooks/use-modal";
import classes from "./AddComment.module.scss";
import { useAuth } from "../context/AuthContext";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";
import { useTheme } from "../context/ThemeContext";

type AddCommentProps = {
  postID: string;
  userID: string;
  photo: string;
  token: string;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
  openModal: (title: string, content: string, type: ModalType) => void;
};

const AddComment: FC<AddCommentProps> = ({
  postID,
  photo,
  token,
  comments,
  setComments,
  openModal,
}) => {
  const { setLoggedOutUser } = useAuth();
  const { setIsLoading } = useLoadingSpinner();
  const { mode } = useTheme();
  const styleClasses = [classes[mode], classes.comment];
  const inputRef = useRef<HTMLInputElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const addComment = async () => {
    const address =
      process.env.REACT_APP_SERVER + "/posts/" + postID + "/comments";
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          text: inputRef.current!.value,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setComments([...comments, data.data.comment]);
        inputRef.current!.value = "";
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img
          src={
            photo
              ? process.env.REACT_APP_PHOTOS + `/users/${photo}`
              : "/user.jpg"
          }
          alt="user"
        />
      </div>
      <input
        type="text"
        placeholder="Write a comment"
        minLength={3}
        maxLength={150}
        ref={inputRef}
        className={classes.input}
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }}
      />
      <button
        aria-label="Add comment button"
        className={classes.addButton}
        onClick={addComment}
        disabled={!showButton}
      >
        Add
      </button>
    </div>
  );
};

export default AddComment;
