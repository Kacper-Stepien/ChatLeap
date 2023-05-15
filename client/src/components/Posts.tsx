import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingSpinnerContext } from "../context/LoadinSpinnerContext";

import AddPost from "./AddPost";
import Post from "./Post";
import PostModel from ".././models/Post";
import useModal from ".././hooks/use-modal";
import Modal from "./Modal";
import { ModalType } from ".././hooks/use-modal";

import classes from "./Posts.module.scss";

const Posts: React.FC = () => {
  const { setIsLoading } = useContext(LoadingSpinnerContext);
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const { token } = useContext(AuthContext);

  const styleClasses = [classes[theme], classes.posts];

  const [posts, setPosts] = useState<PostModel[]>([]);

  const {
    modalTitle,
    modalContent,
    modalType,
    isModalOpen,
    openModal,
    closeModal,
  } = useModal();

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
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const addPost = async (text: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts";
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setIsLoading(false);
        setPosts([data.data.post, ...posts]);
      } else {
        setIsLoading(false);
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      setIsLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const deletePost = async (id: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 204) {
        setIsLoading(false);
        setPosts(posts.filter((post) => post._id !== id));
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      openModal("Error", data.message, ModalType.ERROR);
    } catch (err) {
      setIsLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const updatePost = async (id: string, text: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      setIsLoading(true);
      const response = await fetch(address, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      setIsLoading(false);
      const data = await response.json();
      if (data.status === "success") {
        const newPosts = posts.map((post) => {
          if (post._id === id) {
            return data.data.post;
          }
          return post;
        });
        setPosts(newPosts);
      } else {
        setIsLoading(false);
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (error) {
      setIsLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styleClasses.join(" ")}>
      <AddPost addPost={addPost} />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          deletePost={deletePost}
          updatePost={updatePost}
          openModal={openModal}
        />
      ))}
      {posts.length === 0 && (
        <h2 className={classes.noPosts}>There are no posts yet!</h2>
      )}
      {isModalOpen && (
        <Modal
          title={modalTitle}
          content={modalContent}
          type={modalType}
          close={closeModal}
        />
      )}
    </div>
  );
};

export default Posts;
