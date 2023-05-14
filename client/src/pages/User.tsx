import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import UserModel from "../models/Author";
import PostModel from "../models/Post";
import useModal from "../hooks/use-modal";
import { ModalType } from "../hooks/use-modal";

import SimpleNavbar from "../components/SimpleNavbar";
import UserInfo from "./../components/UserInfo";
import Post from "./../components/Post";

import classes from "./User.module.scss";

const User: React.FC = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState<UserModel>();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.container];

  const {
    modalTitle,
    modalContent,
    modalType,
    isModalOpen,
    openModal,
    closeModal,
  } = useModal();

  const getUser = async () => {
    const address = process.env.REACT_APP_SERVER + "/users/" + id;
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setUser(data.data.user);
        console.log(data.data.user);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    const address = process.env.REACT_APP_SERVER + "/users/" + id + "/posts";
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
      } else if (data.status === "fail") {
        console.log(data.message);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
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
        console.log(posts);
        return;
      }

      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.log(err);
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
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserPosts();
  }, []);

  return (
    <>
      <SimpleNavbar mode={mode} />
      <div className={styleClasses.join(" ")}>
        <UserInfo user={user} posts={posts} theme={theme} />
        {posts.map((post) => (
          <Post
            post={post}
            deletePost={deletePost}
            updatePost={updatePost}
            openModal={openModal}
          />
        ))}
      </div>
    </>
  );
};

export default User;
