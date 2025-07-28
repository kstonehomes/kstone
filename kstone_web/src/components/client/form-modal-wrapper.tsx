"use client";

import Modal from "react-modal";
import { useContext} from "react";
import { ModalContext } from "./modal-provider";
import FormPopup from "./FormPopup";
import { FaXmark } from "react-icons/fa6";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

export default function FormModalWrapper() {
  // show popup after 4 seconds
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsOpen(true);
  //   }, 4000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  

  const { isOpen, setIsOpen, source } = useContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    source: string;
    setSource: (source: string) => void;
  }>(ModalContext);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <button
        className="leading-none absolute top-2 right-2 cursor-pointer bg-primary text-white p-1 hover:bg-secondary transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
       <FaXmark className="text-2xl" />
      </button>
      {/* <LeadForm onSuccess={() => setIsOpen(false)} /> */}
      <FormPopup onSuccess={() => setIsOpen(false)} source={source} />
    </Modal>
  );
}
