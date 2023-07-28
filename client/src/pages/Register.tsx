import { FC } from "react";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";
import SimpleNavbar from "../components/SimpleNavbar";
import classes from "./Form.module.scss";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";
import useModal from ".././hooks/use-modal";
import { useTheme } from "../context/ThemeContext";

const Register: FC = () => {
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.page];

  const { setIsLoading } = useLoadingSpinner();
  const {
    modalTitle,
    modalContent,
    modalType,
    isModalOpen,
    closeModal,
    openModal,
  } = useModal();

  return (
    <div className={styleClasses.join(" ")}>
      <SimpleNavbar />
      <div className={classes.formArea}>
        <h1>Register</h1>
        <RegisterForm setIsLoading={setIsLoading} openModal={openModal} />
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

export default Register;
