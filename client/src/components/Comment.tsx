import React, { useState, useRef } from "react";
import CommentModel from ".././models/Comment";
import formatDate from "../utils/FormatDate";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import classes from "./Comment.module.scss";

type Props = {
  comment: CommentModel;
  userID: string;
  mode: string;
  updateComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
};

const Comment: React.FC<Props> = ({
  comment,
  userID,
  mode,
  updateComment,
  deleteComment,
}) => {
  const styleClasses = [classes[mode], classes.comment];
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const toggleUpdate = () => {
    textAreaRef.current?.focus();
    setUpdateOpen(!updateOpen);
  };

  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length >= 3) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  return (
    <div key={comment._id} className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" />
      </div>
      <div className={classes.content}>
        <p className={classes.authorName}>
          {comment.author.name + " " + comment.author.surname}
        </p>
        {updateOpen && (
          <div className={classes.commentUpdate}>
            <textarea
              className={classes.textArea}
              ref={textAreaRef}
              minLength={3}
              maxLength={150}
              defaultValue={comment.text}
              onChange={handleTextAreaChange}
            />
            <button
              className={classes.updateCommentBtn}
              onClick={() => {
                if (textAreaRef.current) {
                  updateComment(comment._id, textAreaRef.current.value);
                  toggleUpdate();
                }
              }}
              disabled={disableUpdateBtn}
            >
              Update
            </button>
          </div>
        )}
        {!updateOpen && <p className={classes.text}>{comment.text}</p>}
      </div>
      <div className={classes.actions}>
        <p className={classes.date}>{formatDate(comment.createdAt)}</p>
        <div className={classes.commentMenu}>
          {comment.author._id === userID && (
            <>
              <button
                className={classes.deleteCommentBtn}
                onClick={() => {
                  deleteComment(comment._id);
                }}
              >
                <FaTrashAlt />
              </button>
              <button className={classes.editCommentBtn} onClick={toggleUpdate}>
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
