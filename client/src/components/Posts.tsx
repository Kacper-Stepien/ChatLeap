import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Post from "./Post";
import classes from "./Posts.module.scss";

const Posts: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.posts];
  return (
    <div className={styleClasses.join(" ")}>
      <Post
        userName="Elizabeth Cooper"
        userNick="@Elza"
        date="3 days ago"
        postContent="Sometimes the smallest step in the right direction ends up being the biggest step of your life. Tiptoe if you must, but take the step."
        hastags={["#motivation", "#inspiration", "#life"]}
      />
      <Post
        userName="Jessica Jones"
        userNick="@Jess"
        date="5 days ago"
        postContent="Today I'm 40 years old! I can't believe it! I'm so thankful for everything I have in my life. I'm so blessed!"
        hastags={["#birthday", "#happy", "#blessed"]}
      />
    </div>
  );
};

export default Posts;
