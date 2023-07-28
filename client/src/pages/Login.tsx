import { FC } from "react";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import SimpleNavbar from "../components/SimpleNavbar";
import classes from "./Form.module.scss";
import useModal from ".././hooks/use-modal";
import { useTheme } from "../context/ThemeContext";

const Login: FC = () => {
  const { theme } = useTheme();
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
      <SimpleNavbar />
      <div className={classes.formArea}>
        <h1>Login</h1>
        <LoginForm openModal={openModal} closeModal={closeModal} />
      </div>
      <Footer />
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

export default Login;
