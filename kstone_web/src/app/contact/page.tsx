/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import SendMessage from "@/components/scheduleVisit/SendMessage";
import HeroSection from "@/components/heroSection/HeroSection";

const contactImage = "/images/ks-contact.jpg";

// Memoized contact items to prevent unnecessary re-renders
const contactItems = [
  {
    icon: FaEnvelope,
    title: "Email Us",
    value: "info@kstonehomes.com",
    href: "mailto:info@kstonehomes.com",
    cta: "Drop Us an Email",
    iconAnimation: { rotate: 5, scale: 1.05 },
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    value: "780-254-4000",
    href: "tel:780-254-4000",
    cta: "Speak With Our Team",
    iconAnimation: { y: -3, scale: 1.05 },
  },
  {
    icon: FaLocationDot,
    title: "Visit Us",
    value: "2817 63rd Ave NE, Leduc County T4X 3A6",
    href: "https://g.co/kgs/4pJozk9",
    cta: "See Our Office",
    iconAnimation: { rotate: -5, scale: 1.05 },
  },
];

const Contact = () => {
  return (
    <div className="contact-page bg-offwhite pb-16">
      {/* Hero Section */}
      <HeroSection
        heading="Contact Us"
        paragraph="Let's start a conversation about your dream home"
        imageUrl={contactImage}
      />

      {/* Contact Info Cards - Wrapped in LazyMotion for performance */}
      <LazyMotion features={domAnimation}>
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            transition={{ staggerChildren: 0.05 }} 
          >
            {contactItems.map((info, idx) => (
              <ContactCard key={`contact-${idx}`} info={info} />
            ))}
          </motion.div>
        </section>

        {/* Contact Form */}
        <motion.div
          className="w-[95%] max-w-7xl mx-auto p-8 sm:p-12 rounded-xl bg-offwhite border border-golden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-golden mb-6">
            Have any Question?
          </h2>
          <SendMessage />
        </motion.div>
      </LazyMotion>
    </div>
  );
};

// Memoized ContactCard component for better performance
const ContactCard = ({ info }:{info:any}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 15 },
      },
      hover: { y: -10, transition: { duration: 0.2 } }, 
    }}
    className="h-full"
  >
    <Link
      href={info.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center bg-gradient-to-b from-white to-offwhite border-2 border-golden/30 rounded-2xl p-8 gap-6 hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden"
    >
      {/* Simplified animated background */}
      <div className="absolute inset-0 bg-golden/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon with animation */}
      <motion.div
        className="p-4 bg-gradient-to-br from-golden to-lightyellow rounded-full shadow-md z-10"
        whileHover={info.iconAnimation}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <info.icon className="w-8 h-8 text-white" />{" "}
        {/* Slightly smaller icon */}
      </motion.div>

      {/* Text content */}
      <div className="text-center space-y-3 z-10">
        <h3 className="text-xl font-bold text-dark group-hover:text-golden transition-colors">
          {info.title}
        </h3>
        <p className="text-base text-dark/90 group-hover:scale-[1.02] transition-transform">
          {info.value}
        </p>
      </div>

      {/* CTA button */}
      <div className="mt-4 px-5 py-2 bg-golden/10 border border-golden/30 rounded-full text-golden font-medium group-hover:bg-golden group-hover:text-white transition-colors">
        {info.cta}
      </div>

      {/* Bottom border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-golden scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
    </Link>
  </motion.div>
);

export default Contact;
