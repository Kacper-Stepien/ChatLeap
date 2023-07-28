import React, { useEffect, useState, useRef } from "react";

import { useAuth } from "../context/AuthContext";

import { useTheme } from "../context/ThemeContext";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";

import AddPost from "./AddPost";
import Post from "./Post";
import PostModel from ".././models/Post";
import useModal from ".././hooks/use-modal";
import Modal from "./Modal";
import { ModalType } from ".././hooks/use-modal";
import LoadingSPpinner from "./LoadingSpinner";

import classes from "./Posts.module.scss";

const Posts: React.FC = () => {
  const { token, setLoggedOutUser } = useAuth();
  const { setIsLoading } = useLoadingSpinner();

  const [page, setPage] = useState(1);
  const [allPostsDownloaded, setAllPostsDownloaded] = useState(false);

  const [downloadingPosts, setDownloadingPosts] = useState(false);
  const [downloadingMorePosts, setDownloadingMorePosts] = useState(false);

  const { theme } = useTheme();

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

  const PostsContainerRef = useRef<HTMLDivElement>(null);

  const getPosts = async () => {
    const address =
      process.env.REACT_APP_SERVER +
      `/posts?page=${page}&per_page=${process.env.REACT_APP_POSTS_PER_PAGE}`;
    setDownloadingPosts(true);
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setDownloadingPosts(false);
      if (data.status === "success") {
        setPosts(data.data.posts);
        setPage(2);
        if (data.data.all) {
          setAllPostsDownloaded(true);
        }
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
      } else {
        openModal("Error", data.message, ModalType.ERROR);
      }
    } catch (err) {
      openModal("Error", "Problem with server", ModalType.ERROR);
    }
  };

  const handleScroll = (event: Event) => {
    if (event.target instanceof Element) {
      const threshold = 0.7;
      const bottom =
        event.target.scrollTop >=
        (event.target.scrollHeight - event.target.clientHeight) * threshold;

      if (
        bottom &&
        !allPostsDownloaded &&
        !downloadingMorePosts &&
        !downloadingPosts
      ) {
        setPage((prevPage) => prevPage + 1);
        setDownloadingMorePosts(true);
        getMorePosts();
      }
    }
  };

  const getMorePosts = async () => {
    const address =
      process.env.REACT_APP_SERVER +
      `/posts?page=${page}&per_page=${process.env.REACT_APP_POSTS_PER_PAGE}`;
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        if (allPostsDownloaded) {
          setDownloadingMorePosts(false);
          return;
        }
        if (data.data.all) {
          setAllPostsDownloaded(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...data.data.posts]);
        setTimeout(() => {
          setDownloadingMorePosts(false);
        }, 2000);
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
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
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
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
      if (data.message === "jwt expired") {
        setLoggedOutUser();
      } else {
        openModal("Error", data.message, ModalType.ERROR);
      }
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
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
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
    const container = PostsContainerRef.current;
    if (container) {
      PostsContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, getMorePosts, setPage]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styleClasses.join(" ")} ref={PostsContainerRef}>
      {downloadingPosts && <LoadingSPpinner message="Downloading posts" />}
      {!downloadingPosts && <AddPost addPost={addPost} />}
      {!downloadingPosts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            deletePost={deletePost}
            updatePost={updatePost}
            openModal={openModal}
          />
        ))}
      {downloadingMorePosts && (
        <LoadingSPpinner message="Downloading more posts" />
      )}
      {!downloadingPosts && posts.length === 0 && (
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
