"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosSend } from "react-icons/io";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// Success Message Component
type FormData = {
  name: string;
  email: string;
  phone: string;
  contactPreferences: string;
  message: string;
};

const SendMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactPreferences: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.contactPreferences === "phone" && !formData.phone.trim()) {
      newErrors.phone = "Phone is required when selecting phone contact";
    }
    if (!formData.contactPreferences) {
      newErrors.contactPreferences = "Please select a contact method";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          contactPreferences: formData.contactPreferences,
          message: formData.message,
          subject: "New Contact Form Submission",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          contactPreferences: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {submitStatus === "success" ? (
        <SuccessMessage formData={formData} onReset={() => setSubmitStatus(null)} />
      ) : submitStatus === "error" ? (
        <ErrorMessage 
          onRetry={() => setSubmitStatus(null)} 
          contactEmail="info@kstonehomes.com" 
          contactPhone="780-254-4000"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=""
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                error={errors.name}
              />

              <InputField
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                error={errors.email}
              />

              <InputField
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                error={errors.phone}
              />

              <SelectField
                id="contactPreferences"
                name="contactPreferences"
                value={formData.contactPreferences}
                onChange={handleChange}
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                  { value: "text", label: "Text Message" },
                ]}
                placeholder="How should we contact you?"
                error={errors.contactPreferences}
              />
            </div>

            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Share your thoughts..."
              error={errors.message}
            />

            <div className="pt-2">
              <SubmitButton isSubmitting={isSubmitting} label="Send Message" />
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

const SuccessMessage = ({ formData, onReset }: { formData: FormData; onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-[var(--color-dark)] p-8 border-2 border-[var(--color-golden)]/30 rounded-xl shadow-lg text-center max-w-md mx-auto"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
    >
      <svg
        className="w-10 h-10 text-green-600 dark:text-green-400"
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
    <h3 className="text-2xl font-bold mb-4 text-[var(--color-dark)] dark:text-white">
      Thank You!
    </h3>
    <p className="text-[var(--color-dark)]/80 dark:text-gray-300 mb-6">
      We&apos;ve received your message and will contact you via {formData.contactPreferences || 'email'} shortly.
    </p>
    <motion.button
      onClick={onReset}
      whileHover={{ scale: 1.05, backgroundColor: "var(--color-lightyellow)" }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-[var(--color-golden)] text-[var(--color-dark)] font-medium rounded-lg transition-all"
    >
      Send Another Message
    </motion.button>
  </motion.div>
);

// Error Message Component
const ErrorMessage = ({ 
  onRetry, 
  contactEmail, 
  contactPhone 
}: { 
  onRetry: () => void;
  contactEmail: string;
  contactPhone: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-[var(--color-dark)] p-8 border-2 border-red-300 dark:border-red-700/50 rounded-xl shadow-lg text-center max-w-md mx-auto"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        x: [-5, 5, -5, 0]
      }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6"
    >
      <svg
        className="w-10 h-10 text-red-600 dark:text-red-400"
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
    <h3 className="text-2xl font-bold mb-4 text-[var(--color-dark)] dark:text-white">
      Submission Error
    </h3>
    <p className="text-[var(--color-dark)]/80 dark:text-gray-300 mb-6">
      We couldn&apos;t send your message. Please try again or contact us directly.
    </p>
    
    <div className="flex flex-col gap-3">
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 bg-[var(--color-dark)] hover:bg-[var(--color-darkgray)] text-white font-medium rounded-lg transition-colors"
      >
        Try Again
      </motion.button>
      
      <div className="flex gap-3">
        <motion.a
          href={`mailto:${contactEmail}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-3 bg-[var(--color-golden)] hover:bg-[var(--color-lightyellow)] text-[var(--color-dark)] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaEnvelope /> Email Us
        </motion.a>
        <motion.a
          href={`tel:${contactPhone}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-3 bg-[var(--color-golden)] hover:bg-[var(--color-lightyellow)] text-[var(--color-dark)] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaPhoneAlt /> Call Us
        </motion.a>
      </div>
    </div>
  </motion.div>
);


// Enhanced Input Component with error handling
const InputField = ({
  type,
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  error,
}: {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder: string;
  error?: string;
}) => (
  <div className="relative">
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute -top-5 left-0 text-sm text-red-500 font-medium"
      >
        {error}
      </motion.p>
    )}
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        w-full px-4 py-3 border-2 text-sm sm:text-base
        ${error ? "border-red-500" : "border-golden"}
        focus:ring-2 focus:ring-blue-400 text-darkgray 
        focus:border-transparent bg-white/90 transition-all outline-none
      `}
      placeholder={placeholder}
    />
  </div>
);

// Enhanced Select Component with error handling
const SelectField = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}) => (
  <div className="relative">
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute -top-5 left-0 text-sm text-red-500 font-medium"
      >
        {error}
      </motion.p>
    )}
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 border-2 text-sm sm:text-base
        ${error ? "border-red-500" : "border-golden"}
        focus:ring-2 focus:ring-blue-400 text-gray-500 
        focus:border-transparent bg-white/90 transition-all outline-none
      `}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Enhanced TextArea Component with error handling
const TextArea = ({
  id,
  name,
  value,
  onChange,
  rows,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  placeholder: string;
  error?: string;
}) => (
  <div className="relative">
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute -top-5 left-0 text-sm text-red-500 font-medium"
      >
        {error}
      </motion.p>
    )}
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`
        w-full px-4 py-3 border-2 text-gray-700 text-sm sm:text-base
        ${error ? "border-red-500" : "border-golden"}
        focus:ring-2 focus:ring-blue-400 focus:border-transparent 
        bg-white/90 transition-all outline-none
      `}
      placeholder={placeholder}
    />
  </div>
);

// Animated Submit Button
const SubmitButton = ({
  isSubmitting,
  label,
}: {
  isSubmitting: boolean;
  label: string;
}) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    whileHover={
      !isSubmitting
        ? {
            scale: 1.02,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          }
        : {}
    }
    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
    className={`
      w-full py-4 px-6 font-semibold transition-all text-lg
      text-[var(--color-dark)] relative overflow-hidden cursor-pointer
      ${
        isSubmitting
          ? "bg-[var(--color-golden)]/70 cursor-not-allowed"
          : "bg-[var(--color-golden)] hover:bg-[var(--color-lightyellow)] shadow-md"
      }
    `}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <Spinner />
        Sending...
      </span>
    ) : (
      <motion.span
        className="flex justify-center items-center gap-2"
        whileHover={{ gap: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {label}
        <motion.span
          animate={{
            x: [0, 4, 0],
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <IoIosSend size={20} />
        </motion.span>
      </motion.span>
    )}
    {!isSubmitting && (
      <motion.span
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.button>
);

// Spinner Component
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-[var(--color-dark)]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


export default SendMessage;
