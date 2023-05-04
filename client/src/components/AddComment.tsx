import React, { useRef } from "react";
import classes from "./AddComment.module.scss";
import CommentModel from ".././models/Comment";

type AddCommentProps = {
  mode: string;
  postID: string;
  userID: string;
  token: string;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
};

const AddComment: React.FC<AddCommentProps> = ({
  mode,
  postID,
  userID,
  token,
  comments,
  setComments,
}) => {
  const styleClasses = [classes[mode], classes.comment];
  const inputRef = useRef<HTMLInputElement>(null);

  const addComment = async () => {
    const address =
      process.env.REACT_APP_SERVER + "/posts/" + postID + "/comments";
    try {
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
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" />
      </div>
      <input
        type="text"
        placeholder="Write a comment"
        maxLength={150}
        ref={inputRef}
        className={classes.input}
      />
      <button className={classes.addButton} onClick={addComment}>
        Add
      </button>
    </div>
  );
};

export default AddComment;
