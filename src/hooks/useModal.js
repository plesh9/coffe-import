import { useState } from "react";
import { scrollLock, scrollUnlock } from "../tools/subFunctions";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    scrollLock();
    console.log('yes');
  };

  const closeModal = () => {
    setIsOpen(false);
    scrollUnlock();
  };

  const closeModalOnClickOut = (e) => {
    if (!e.target.closest(".modal__content")) {
      closeModal();
    }
  };

  return { openModal, closeModal, closeModalOnClickOut, isOpen };
};
