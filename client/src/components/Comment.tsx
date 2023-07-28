import { FC, useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import CommentModel from ".././models/Comment";
import classes from "./Comment.module.scss";
import formatDate from "../utils/FormatDate";
import { useTheme } from "../context/ThemeContext";

type Props = {
  comment: CommentModel;
  userID: string;
  updateComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
};

const Comment: FC<Props> = ({
  comment,
  userID,
  updateComment,
  deleteComment,
}) => {
  const { mode } = useTheme();
  const styleClasses = [classes[mode], classes.comment];

  const [updateCommentOpen, setUpdateCommentOpen] = useState<boolean>(false);
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const minCommentLength = Number(process.env.REACT_APP_COMMENT_MIN_LENGTH);
  const maxCommentLength = Number(process.env.REACT_APP_COMMENT_MAX_LENGTH);

  const toggleUpdate = () => {
    textAreaRef.current?.focus();
    setUpdateCommentOpen(!updateCommentOpen);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length >= minCommentLength) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img
          src={
            comment.author.photo
              ? process.env.REACT_APP_PHOTOS + `/users/${comment.author.photo}`
              : "/user.jpg"
          }
          alt="User"
        />
      </div>
      <div className={classes.content}>
        <p className={classes.authorName}>
          {comment.author.name + " " + comment.author.surname}
        </p>
        {updateCommentOpen && (
          <div className={classes.commentUpdate}>
            <textarea
              className={classes.textArea}
              ref={textAreaRef}
              minLength={minCommentLength || 1}
              maxLength={maxCommentLength || 200}
              defaultValue={comment.text}
              onChange={handleTextAreaChange}
            />
            <button
              aria-label="Update comment button"
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
        {!updateCommentOpen && <p className={classes.text}>{comment.text}</p>}
      </div>
      <div className={classes.actions}>
        <p className={classes.date}>{formatDate(comment.createdAt)}</p>
        <div className={classes.commentMenu}>
          {comment.author._id === userID && (
            <>
              <button
                aria-label="Delete comment button"
                className={classes.deleteCommentBtn}
                onClick={() => {
                  deleteComment(comment._id);
                }}
              >
                <FaTrashAlt />
              </button>
              <button
                aria-label="Open comment edit mode button"
                className={classes.editCommentBtn}
                onClick={toggleUpdate}
              >
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
