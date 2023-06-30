import { useContext, useRef, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import classes from "./AddPost.module.scss";

type AddPostProps = {
  addPost: (text: string) => void;
};

const AddPost: React.FC<AddPostProps> = ({ addPost }) => {
  const { userName, photo } = useContext(AuthContext);
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.addPost];

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const minPostLength = Number(process.env.REACT_APP_POST_MIN_LENGTH);
  const maxPostLength = Number(process.env.REACT_APP_POST_MAX_LENGTH);

  const clearTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (
      textAreaRef.current?.value &&
      textAreaRef.current?.value?.length >= minPostLength &&
      textAreaRef.current?.value?.length <= maxPostLength
    ) {
      addPost(textAreaRef.current.value);
      clearTextArea();
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
      <textarea
        ref={textAreaRef}
        className={classes.textarea}
        minLength={minPostLength || 1}
        maxLength={maxPostLength || 280}
        placeholder={"What's on your mind " + userName + "?"}
        onChange={(e) => {
          if (e.target.value.length >= minPostLength) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }}
      ></textarea>
      <button
        aria-label="Add post button"
        className={classes.shareButton}
        onClick={handleClick}
        disabled={!showButton}
      >
        Share
      </button>
    </div>
  );
};

export default AddPost;
