import React, { useState, useContext } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import User from "../models/Author";
import LocalStorage from "../utils/LocalStorage";
import { ModalType } from "../hooks/use-modal";
import classes from "./AddUserPhoto.module.scss";

type Props = {
  mode: string;
  accent: string;
  token: string;
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  openModal: (title: string, content: string, type: ModalType) => void;
};

const AddUserPhoto: React.FC<Props> = ({
  token,
  mode,
  accent,
  setUser,
  setIsLoading,
  openModal,
}) => {
  const { setUser: setLoggedInUser } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.container];
  const localStorage = new LocalStorage();
  const buttonText = {
    show: "Change Your profile photo",
    hide: "Hide profile photo form",
    upload: "Upload",
  };

  const handleShowForm = () => {
    setIsFileSelected(false);
    setSelectedFile(undefined);
    setShowForm((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
    if (!event.target.files![0]) {
      setIsFileSelected(false);
      return;
    }
    setIsFileSelected(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (!isFileSelected || !selectedFile) return;
    formData.append("photo", selectedFile);

    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER + "/users/photo",
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setIsLoading(false);

      if (data.status === "success") {
        setShowForm(false);
        setUser(data.data.user);
        setLoggedInUser({
          userID: data.data.user._id,
          userName: data.data.user.name,
          userSurname: data.data.user.surname,
          userNick: data.data.user.nick,
          photo: data.data.user.photo || "",
        });
        localStorage.writeUser({
          userID: data.data.user._id,
          userName: data.data.user.name,
          userSurname: data.data.user.surname,
          userNick: data.data.user.nick,
          photo: data.data.user.photo || "",
        });
      }
    } catch (err) {
      setIsLoading(false);
      openModal(
        "Error",
        "Something went wrong. Please try again later",
        ModalType.ERROR
      );
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <button className={classes.showButton} onClick={handleShowForm}>
        {showForm ? buttonText.hide : buttonText.show}{" "}
        {showForm ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {showForm && (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            className={classes.input}
            type="file"
            name="photo"
            id="user-photo"
            accept="image/*"
            placeholder="Choose file"
            onChange={handleChange}
          />
          <div className={classes.spacer}></div>
          {isFileSelected && selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className={classes.preview}
            />
          )}
          <button
            type="submit"
            className={classes.submitButton}
            disabled={!isFileSelected}
          >
            {buttonText.upload}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddUserPhoto;
