import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingSpinnerContext } from "../context/LoadinSpinnerContext";

import UserModel from "../models/Author";
import PostModel from "../models/Post";
import useModal, { ModalType } from "../hooks/use-modal";

import SimpleNavbar from "../components/SimpleNavbar";
import UserInfo from "./../components/UserInfo";
import Post from "./../components/Post";

import { LogoutUser } from "../utils/LogoutUser";

import classes from "./User.module.scss";

const User: React.FC = () => {
  const { id } = useParams();
  const { token, setLoggedIn } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingSpinnerContext);
  const { modalTitle, modalContent, modalType, openModal, closeModal } =
    useModal();

  const [user, setUser] = useState<UserModel>();
  const [posts, setPosts] = useState<PostModel[]>([]);

  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.container];

  const getUser = async () => {
    const address = process.env.REACT_APP_SERVER + "/users/" + id;
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.status === "success") {
        setUser(data.data.user);
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      } else {
      }
    } catch (err) {}
  };

  const getUserPosts = async () => {
    const address = process.env.REACT_APP_SERVER + "/users/" + id + "/posts";
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.status === "success") {
        setPosts(data.data.posts);
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      } else if (data.status === "fail") {
      } else {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      const response = await fetch(address, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 204) {
        setPosts(posts.filter((post) => post._id !== id));
        return;
      }

      const data = await response.json();
      if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      }
    } catch (err) {}
  };

  const updatePost = async (id: string, text: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      const response = await fetch(address, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.status === "success") {
        // update new post
        const newPosts = posts.map((post) => {
          if (post._id === id) {
            return data.data.post;
          }
          return post;
        });
        setPosts(newPosts);
      } else if (data.message === "jwt expired") {
        LogoutUser({ setLoggedIn });
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    getUserPosts();
  }, [token]);

  return (
    <div className={classes.page}>
      <SimpleNavbar mode={mode} />
      <div className={styleClasses.join(" ")}>
        <UserInfo user={user} posts={posts} theme={theme} />
        {posts &&
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              deletePost={deletePost}
              updatePost={updatePost}
              openModal={openModal}
            />
          ))}
        {!isLoading && posts.length === 0 && (
          <p className={classes.noPosts}>No posts</p>
        )}
      </div>
    </div>
  );
};

export default User;
