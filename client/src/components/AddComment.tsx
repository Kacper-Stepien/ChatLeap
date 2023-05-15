import React, { useRef, useContext, useState } from "react";

import CommentModel from ".././models/Comment";
import { LoadingSpinnerContext } from "../context/LoadinSpinnerContext";

import { ModalType } from "../hooks/use-modal";

import classes from "./AddComment.module.scss";

type AddCommentProps = {
  mode: string;
  postID: string;
  userID: string;
  token: string;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
  openModal: (title: string, content: string, type: ModalType) => void;
};

const AddComment: React.FC<AddCommentProps> = ({
  mode,
  postID,
  token,
  comments,
  setComments,
  openModal,
}) => {
  const styleClasses = [classes[mode], classes.comment];
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsLoading } = useContext(LoadingSpinnerContext);
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
      setIsLoading(false);
      if (data.status === "success") {
        setComments([...comments, data.data.comment]);
        inputRef.current!.value = "";
      } else {
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      setIsLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" alt="User" />
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
