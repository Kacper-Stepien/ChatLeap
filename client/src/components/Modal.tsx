import { FC } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.scss";
import { useTheme } from "../context/ThemeContext";

enum ModalType {
  SUCCESS,
  ERROR,
  WARNING,
}

type Props = {
  title: string;
  content: string;
  type: ModalType;
  close: (open: boolean) => void;
};

const Modal: FC<Props> = ({ title, content, type, close }) => {
  const { mode } = useTheme();
  const styleClasses = [classes[mode], classes.modal];

  if (type === ModalType.SUCCESS) {
    styleClasses.push(classes.success);
  } else if (type === ModalType.ERROR) {
    styleClasses.push(classes.error);
  }

  const closeModal = () => {
    close(false);
  };

  return ReactDom.createPortal(
    <div className={styleClasses.join(" ")}>
      <div className={classes.overlay} onClick={closeModal}></div>
      <div className={classes.content}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button
          aria-label="Close modal button"
          className={classes.closeModal}
          onClick={closeModal}
        >
          OK
        </button>
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
