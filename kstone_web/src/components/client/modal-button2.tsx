"use client";

import { useContext } from "react";
import { ModalContext } from "./modal-provider";
import {  FaEnvelope } from "react-icons/fa";

export default function ModalButton2({
  label,
  className,
  source = '',
}: {
  label: string;
  className?: string;
  source?: string;
}) {
  const context = useContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    source: string;
    setSource: (source: string) => void;
  }>(ModalContext);
  // context.setIsOpen(false);
  return (

    <>
    <button
className={`border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4  font-display font-bold transition-all duration-300 flex items-center justify-center gap-2 capitalize cursor-pointer ${className}`}
                  onClick={() => {
                    context.setSource(source);
                    context.setIsOpen(true);
                  }}
                  >
                    <FaEnvelope className="w-4 h-4" />
                    {label}
    </button>
      </>
  );
}
