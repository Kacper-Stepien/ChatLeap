import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import classes from "./AddPost.module.scss";

type AddPostProps = {
  addPost: (text: string) => void;
};

const AddPost: React.FC<AddPostProps> = ({ addPost }) => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.addPost];

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const clearTextArea = () => {
    textAreaRef.current!.value = "";
  };

  const handleClick = () => {
    if (
      textAreaRef.current?.value &&
      textAreaRef.current?.value?.length >= 3 &&
      textAreaRef.current?.value?.length <= 250
    ) {
      addPost(textAreaRef.current.value);
      clearTextArea();
    }
  };

  const { userName } = useContext(AuthContext);
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" alt="user" />
      </div>
      <textarea
        ref={textAreaRef}
        className={classes.textarea}
        minLength={3}
        maxLength={250}
        placeholder={"What's on your mind " + userName + "?"}
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }}
      ></textarea>
      <button
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
