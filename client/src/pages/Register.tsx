import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SimpleNavbar from "../components/SimpleNavbar";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import useModal from ".././hooks/use-modal";
import classes from "./Form.module.scss";

const Register: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];
  const {
    modalTitle,
    modalContent,
    modalType,
    isModalOpen,
    openModal,
    closeModal,
  } = useModal();

  return (
    <div className={styleClasses.join(" ")}>
      <SimpleNavbar mode={mode} />
      <div className={classes.formArea}>
        <h1>Register</h1>
        <RegisterForm
          mode={mode}
          accent={accent}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
      <Footer mode={mode} />
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

export default Register;
