import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Post from "./Post";
import PostModel from ".././models/Post";
import formatDate from "../utils/FormatDate";
import classes from "./Posts.module.scss";

type Post = {
  author: {
    _id: string;
    author_id: string;
    email: string;
    name: string;
    surname: string;
    nick: string;
    posts: string[];
  };
  comments: string[];
  likes: string[];
  createdAt: string;
  modifiedAt: string;
  _id: string;
  text: string;
};

const Posts: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.posts];
  const { token } = useContext(AuthContext);

  const [posts, setPosts] = useState<PostModel[]>([]);

  const getPosts = async () => {
    const address = process.env.REACT_APP_SERVER + "/posts";
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setPosts(data.data.posts);
      } else {
        console.log(data.message);
      }
      console.log(data.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styleClasses.join(" ")}>
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          author={post.author}
          createdAt={formatDate(post.createdAt)}
          modifiedAt={formatDate(post.modifiedAt)}
          text={post.text}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
      {/* <Post
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
      /> */}
    </div>
  );
};

export default Posts;
