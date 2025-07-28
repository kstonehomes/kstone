"use client";

import { createContext, useState } from "react";
import FormModalWrapper from "./form-modal-wrapper";

export const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  source: string;
  setSource: (source: string) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  source: '',
  setSource: () => {},
});


export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('');
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, source, setSource }}>
      {children}
      <FormModalWrapper />
    </ModalContext.Provider>
  );
};
