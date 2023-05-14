import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import AddPost from "./AddPost";
import Post from "./Post";
import PostModel from ".././models/Post";
import LoadingSPpinner from "./LoadingSpinner";
import useModal from ".././hooks/use-modal";
import Modal from "./Modal";
import { ModalType } from ".././hooks/use-modal";
import classes from "./Posts.module.scss";

const Posts: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.posts];
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
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
        setLoading(false);
        setPosts([data.data.post, ...posts]);
      } else {
        setLoading(false);
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      setLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const deletePost = async (id: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      setLoading(true);
      const response = await fetch(address, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 204) {
        setLoading(false);
        setPosts(posts.filter((post) => post._id !== id));
        console.log(posts);
        return;
      }

      const data = await response.json();
      setLoading(false);
      openModal("Error", data.message, ModalType.ERROR);
    } catch (err) {
      setLoading(false);
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const updatePost = async (id: string, text: string) => {
    const address = process.env.REACT_APP_SERVER + "/posts/" + id;
    try {
      setLoading(true);
      const response = await fetch(address, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      setLoading(false);
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
        setLoading(false);
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (error) {
      setLoading(false);
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
      {loading && <LoadingSPpinner />}
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
