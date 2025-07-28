"use client";

import { useContext } from "react";
import { ModalContext } from "./modal-provider";
import {  FaPhoneAlt } from "react-icons/fa";

export default function ModalButton({
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
className={`bg-primary w-full md:w-auto hover:bg-secondary cursor-pointer justify-center text-white px-8 py-4 font-display font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 border border-primary ${className}`}
                  onClick={() => {
                    context.setSource(source);
                    context.setIsOpen(true);
                  }}
                  >
                    <FaPhoneAlt className="w-4 h-4" />
                    {label}
    </button>
      </>
  );
}
