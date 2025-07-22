"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { PiPhoneCallFill } from "react-icons/pi";

const MobilePhone = () => {
  return (
    <div className="fixed bottom-28 right-4 z-[1000] isolate">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: [0, 5, -5, 5, -5, 0],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "easeInOut",
          },
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 10,
          },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto"
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="tel:17802772277"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-300 relative"
          aria-label="Call us"
          onClick={(e) => e.stopPropagation()}
        >
          <PiPhoneCallFill className="text-white text-2xl" />
          {/* Animated "Call now!" text bubble */}
          <motion.span
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: [0, 1, 0],
              y: [5, 0, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          >
            Call now!
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
};

export default MobilePhone;
