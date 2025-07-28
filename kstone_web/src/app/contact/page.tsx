"use client";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMailOpenOutline } from "react-icons/io5";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {

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
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
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
    <main className="">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
        backgroundImage="/images/ks-contact.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section>
        <div className="container">
          {/* Contact Info Cards */}
          <div className="contact_informations max-w-6xl mx-auto my-16 px-4">
            <div className="text-center mb-12">
              <h2 className="title">Let&apos;s Connect</h2>
              <p className="content">
                Ready to build your dream home? Our team is here to guide you
                through every step of the process.
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  icon: IoMailOpenOutline,
                  title: "Email Us",
                  value: "info@kstoneyeg.com",
                  href: "mailto:info@kstoneyeg.com",
                  description: "Drop us a line anytime",
                },
                {
                  icon: GiRotaryPhone,
                  title: "Call Now",
                  value: "+1 (780) 277-2277",
                  href: "tel:17802772277",
                  description: "Speak with our sales team",
                },
                {
                  icon: FaLocationDot,
                  title: "Visit Us",
                  value:
                    "2817 63rd Ave NE, Leduc County T4X 3A6 (Show-Home Coming Soon)",
                  href: "https://g.co/kgs/4pJozk9",
                  description: "See our office location",
                },
              ].map((info, idx) => (
                <Link
                  key={idx}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center bg-gray-100 border border-gray-300 rounded-2xl p-8 gap-4 hover:shadow-2xl transition-all duration-500 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    <info.icon
                      size={48}
                      className="text-primary group-hover:text-blue-600 transition-colors duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-display text-xl font-medium text-primary mb-2">
                      {info.title}
                    </h4>
                    <p className="text-secondary-dark font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-secondary text-sm">{info.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 mx-4  px-8 py-12 md:px-12 md:py-16  border border-gray-300">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
                Start Your Journey
              </h2>
              <p className="text-secondary max-w-lg mx-auto">
                Fill out the form below and we&apos;ll get back to you within 24
                hours to discuss your dream home.
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-medium">
                    Something went wrong. Please try again later.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Full Name",
                    type: "text",
                    name: "name",
                    placeholder: "Enter your full name",
                  },
                  {
                    label: "Email Address",
                    type: "email",
                    name: "email",
                    placeholder: "Enter your email address",
                  },
                ].map(({ label, type, name, placeholder }) => (
                  <div key={name} className="group">
                    <label
                      htmlFor={name}
                      className="block text-secondary font-medium mb-3"
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name as keyof FormData]}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border border-gray-200 bg-white text-secondary-dark rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                      placeholder={placeholder}
                    />
                    {errors[name as keyof FormData] && (
                      <span className="text-red-500 text-sm mt-2 block">
                        {errors[name as keyof FormData]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-secondary font-medium mb-3"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 bg-white text-secondary-dark rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-2 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="contactPreferences"
                    className="block text-secondary font-medium mb-3"
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="contactPreferences"
                    name="contactPreferences"
                    value={formData.contactPreferences}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 bg-white text-secondary-dark rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                  >
                    <option value="">How should we contact you?</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                  {errors.contactPreferences && (
                    <span className="text-red-500 text-sm mt-2 block">
                      {errors.contactPreferences}
                    </span>
                  )}
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-secondary font-medium mb-3"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-200 bg-white text-secondary-dark rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none group-hover:border-gray-300"
                  placeholder="Tell us about your dream home, timeline, budget, or any questions you have..."
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary mx-auto cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </div>
                  ) : (
                    "Send Message"
                  )}{" "}
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;