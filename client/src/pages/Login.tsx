import { useTheme } from "../context/ThemeContext";

import useModal from ".././hooks/use-modal";

import LoginForm from "../components/LoginForm";
import SimpleNavbar from "../components/SimpleNavbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

import classes from "./Form.module.scss";

const Login: React.FC = () => {
  const { mode, accent, theme } = useTheme();
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
        <h1>Login</h1>
        <LoginForm
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

export default Login;
