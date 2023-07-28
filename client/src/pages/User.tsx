import { useEffect, useState } from "react";
import useModal, { ModalType } from "../hooks/use-modal";

import AddUserPhoto from "../components/AddUserPhoto";
import { FC } from "react";
import Post from "./../components/Post";
import PostModel from "../models/Post";
import SimpleNavbar from "../components/SimpleNavbar";
import UserInfo from "./../components/UserInfo";
import UserModel from "../models/Author";
import classes from "./User.module.scss";
import { useAuth } from "../context/AuthContext";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const User: FC = () => {
  const { id } = useParams();
  const { user, setLoggedOutUser, token } = useAuth();
  const { isLoading, setIsLoading } = useLoadingSpinner();
  const { openModal } = useModal();

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
        throw new Error();
      }
    } catch (err) {
      openModal(
        "Error",
        "There was a problem with fetching user data.",
        ModalType.ERROR
      );
    }
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
        throw new Error();
      }
    } catch (err) {
      setIsLoading(false);
      openModal(
        "Error",
        "There was a problem with fetching user posts.",
        ModalType.ERROR
      );
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
    } catch (err) {
      openModal(
        "Error",
        "There was a problem with deleting the post.",
        ModalType.ERROR
      );
    }
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
    } catch (error) {
      openModal(
        "Error",
        "There was a problem with updating the post.",
        ModalType.ERROR
      );
    }
  };

  useEffect(() => {
    getUser();
    getUserPosts();
  }, [token, user]);

  return (
    <div className={classes.page}>
      <SimpleNavbar />
      <div className={styleClasses.join(" ")}>
        <UserInfo user={userData} />
        {id === user!.id && (
          <AddUserPhoto
            token={token as string}
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
