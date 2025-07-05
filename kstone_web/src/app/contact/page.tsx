"use client";
import Link from "next/link";
import {  FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  const contactImage = "/images/ks-contact.jpg";

  type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    contactPreferences: string;
  };

  type FormErrors = Partial<Record<keyof FormData, string>>;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactPreferences: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";
    if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (!formData.contactPreferences)
      newErrors.contactPreferences = "Select a contact preference";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          contactPreferences: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page bg-white dark:bg-gray-900 pb-16">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${contactImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              Contact Us
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-amber-100 max-w-2xl mx-auto"
          >
            Let&#39;s start a conversation about your dream home
          </motion.p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            {
              icon: FaEnvelope,
              title: "Email Us",
              value: "info@kstonehomes.com",
              href: "mailto:info@kstonehomes.com",
              color:
                "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
            },
            {
              icon: FaPhoneAlt,
              title: "Call Us",
              value: "780-254-4000",
              href: "tel:780-254-4000",
              color:
                "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300",
            },
            {
              icon: FaLocationDot,
              title: "Visit Us",
              value: "2817 63rd Ave NE, Leduc County T4X 3A6",
              href: "https://g.co/kgs/4pJozk9",
              color:
                "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
            },
          ].map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center ${info.color} border border-transparent rounded-xl p-8 gap-4 hover:shadow-lg transition-all duration-300 hover:border-white/20`}
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-full group-hover:scale-110 transition-transform">
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {info.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  {info.value}
                </p>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-2">
                  Click to {info.title.split(" ")[0].toLowerCase()}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Have Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fill out the form below and we&#39;ll get back to you within 24 hours
            </p>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
              Something went wrong. Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input fields */}
            {[
              {
                label: "Full Name",
                type: "text",
                name: "name",
                placeholder: "John Smith",
              },
              {
                label: "Email Address",
                type: "email",
                name: "email",
                placeholder: "john@example.com",
              },
              {
                label: "Phone Number",
                type: "tel",
                name: "phone",
                placeholder: "(123) 456-7890",
              },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${errors[field.name as keyof FormErrors] ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={field.placeholder}
                />
                {errors[field.name as keyof FormErrors] && (
                  <p className="text-sm text-red-500">
                    {errors[field.name as keyof FormErrors]}
                  </p>
                )}
              </div>
            ))}

            {/* Contact Preference */}
            <div className="space-y-1">
              <label
                htmlFor="contactPreferences"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Preferred Contact Method
              </label>
              <select
                id="contactPreferences"
                name="contactPreferences"
                value={formData.contactPreferences}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${errors.contactPreferences ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
              >
                <option value="">Select preferred method</option>
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
                <option value="text">Text Message</option>
              </select>
              {errors.contactPreferences && (
                <p className="text-sm text-red-500">
                  {errors.contactPreferences}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                placeholder="Tell us about your dream home..."
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
