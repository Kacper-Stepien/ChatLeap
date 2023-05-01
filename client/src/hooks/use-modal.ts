import { useState } from "react";

enum ModalType {
  SUCCESS,
  ERROR,
  WARNING,
}

const useModal = () => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState(ModalType.SUCCESS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (title: string, content: string, type: ModalType) => {
    setModalTitle(title);
    setModalContent(content);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    modalTitle,
    modalContent,
    modalType,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
