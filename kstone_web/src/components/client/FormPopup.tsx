"use client";
import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const FormPopup = ({ onSuccess, source }: { onSuccess: () => void; source?: string }) => {

  type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    contactPreferences: string;
    source?: string;
  };

  type FormErrors = Partial<Record<keyof FormData, string>>;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactPreferences: "",
    source: source || '',
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

  useEffect(() => {
    setFormData((prev) => ({ ...prev, source: source || '' }));
  }, [source]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";
    // if (formData.message.length < 10)
    //   newErrors.message = "Message must be at least 10 characters";
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
          source: source || '',
        });
        onSuccess();
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
    <>
    <div className=" mx-4  px-8 py-12 md:px-12 md:py-16  border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            Start Your Journey
          </h2>
          {source && (
      <h3 className="title text-xl font-medium- font-display text-green-500">Thanks for showing interest in <span className="font-semibold">{source}</span></h3>
 )
              }
        </div>

        {submitStatus === "success" && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Thank you! Your message has been sent successfully.</span>
             
            </div>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium">Something went wrong. Please try again later.</span>
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

          <div className="group hidden md:block">
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

          <input type="hidden" name="source" value={formData.source || ''} readOnly />

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mx-auto cursor-pointer w-full md:w-auto justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Message...
                </div>
              ) : (
                "Send Message"
              )} <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPopup;