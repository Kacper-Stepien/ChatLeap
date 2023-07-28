import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";

import UserModel from "../models/Author";
import PostModel from "../models/Post";
import useModal, { ModalType } from "../hooks/use-modal";

import SimpleNavbar from "../components/SimpleNavbar";
import UserInfo from "./../components/UserInfo";
import Post from "./../components/Post";
import AddUserPhoto from "../components/AddUserPhoto";

import classes from "./User.module.scss";

const User: React.FC = () => {
  const { id } = useParams();
  const { user, setLoggedOutUser, token } = useAuth();
  const { isLoading, setIsLoading } = useLoadingSpinner();
  const { modalTitle, modalContent, modalType, openModal, closeModal } =
    useModal();

  const [userData, setUserData] = useState<UserModel>();
  const [posts, setPosts] = useState<PostModel[]>([]);

  const { mode, accent } = useTheme();
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
        setUserData(data.data.user);
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
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
        setLoggedOutUser();
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
        setLoggedOutUser();
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
        setLoggedOutUser();
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    getUserPosts();
  }, [token, user!.photo]);

  return (
    <div className={classes.page}>
      <SimpleNavbar mode={mode} />
      <div className={styleClasses.join(" ")}>
        <UserInfo user={userData} theme={theme} />
        {id === user!.userID && (
          <AddUserPhoto
            token={token as string}
            mode={mode}
            accent={accent}
            setUser={setUserData}
            setIsLoading={setIsLoading}
            openModal={openModal}
          />
        )}
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
