import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import classes from "./Posts.module.scss";

const Posts: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.posts];
  return <div className={styleClasses.join(" ")}>Navbar</div>;
};

export default Posts;
