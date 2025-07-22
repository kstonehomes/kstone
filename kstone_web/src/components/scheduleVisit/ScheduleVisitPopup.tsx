"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SendMessage from "./SendMessage"; // Adjust the import path as needed

const ScheduleVisitPopup = ({ onClose }: { onClose: () => void }) => {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // Custom success message for the popup
  const SuccessMessage = ({ onClose }: { onClose: () => void }) => (
    <div className="text-center py-4 h-full flex flex-col justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4"
      >
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
      <h3 className="text-lg font-bold mb-3 text-[var(--color-dark)]">
        Thank You!
      </h3>
      <p className="text-[var(--color-dark)]/80 mb-6 text-sm sm:text-base">
        We&apos;ve received your message and will contact you shortly.
      </p>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 bg-[var(--color-dark)] hover:bg-[var(--color-golden)] text-[var(--color-offwhite)] rounded-lg transition-colors text-sm mx-auto"
      >
        Close
      </motion.button>
    </div>
  );

  // Custom error message for the popup
  const ErrorMessage = ({
    onRetry,
    onClose,
  }: {
    onRetry: () => void;
    onClose: () => void;
  }) => (
    <div className="text-center py-4 h-full flex flex-col justify-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ type: "spring" }}
        className="mx-auto w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4"
      >
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.div>
      <h3 className="text-lg font-bold mb-3 text-[var(--color-dark)]">
        Something Went Wrong
      </h3>
      <p className="text-[var(--color-dark)]/80 mb-6 text-sm sm:text-base">
        Please try again or contact us directly.
      </p>
      <div className="flex gap-3 justify-center">
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-[var(--color-dark)] hover:bg-[var(--color-golden)] text-[var(--color-offwhite)] rounded-lg transition-colors text-sm"
        >
          Try Again
        </motion.button>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 border border-[var(--color-dark)] text-[var(--color-dark)] rounded-lg transition-colors text-sm"
        >
          Close
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`
          bg-[var(--color-offwhite)] shadow-xl w-full max-w-2xl
          rounded-xl overflow-hidden
          border border-[var(--color-golden)]/30
          flex flex-col
          max-h-[90vh]
          mx-4
        `}
      >
        {/* Header */}
        <div className="bg-[var(--color-dark)] p-5 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[var(--color-offwhite)]">
              Start Your Journey
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--color-offwhite)] hover:text-[var(--color-golden)] transition-colors"
              aria-label="Close popup"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-grow">
          {submitStatus === "success" ? (
            <SuccessMessage onClose={onClose} />
          ) : submitStatus === "error" ? (
            <ErrorMessage
              onRetry={() => setSubmitStatus(null)}
              onClose={onClose}
            />
          ) : (
            <SendMessage />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleVisitPopup;
