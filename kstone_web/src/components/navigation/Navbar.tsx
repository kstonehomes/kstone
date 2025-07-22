"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import ksLogo from "@/public/images/ks-logo.png";
import { useNavigation } from "../../../context/navigationContext";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/pre-construction", label: "PRE CONSTRUCTION" },
  { href: "/show-homes", label: "SHOW HOMES" },
  { href: "/quick-possessions", label: "QUICK POSSESSIONS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/contact", label: "CONTACT" },
];

const cityRequiredRoutes = [
  "/pre-construction",
  "/show-homes",
  "/quick-possessions",
  "/communities",
];

const Navbar: React.FC = () => {
  const { city } = useCity();
  const { setCityOpen } = useCityPopup();
  const { active, setActive } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = useCallback(
    (href: string) => {
      if (!city && cityRequiredRoutes.includes(href)) {
        setCityOpen(true);
        return;
      }

      setActive(href);
      setMobileOpen(false);
      router.push(href);
    },
    [city, setActive, setCityOpen, router]
  );

  const isActive = useCallback((href: string) => active === href, [active]);

  return (
    <nav className="navigation">
      {/* Main Navbar */}
      <div className="h-24 bg-gradient-to-b from-gray-900 to-gray-800 py-3 px-4 md:px-8 fixed top-0 left-0 right-0 z-[100] shadow-lg border-b border-golden/20">
        <div className="max-w-[1480px] mx-auto flex items-center justify-between h-full">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image
                src={ksLogo}
                alt="Kstone Homes Logo"
                className="h-14 md:h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* City picker */}
            <button
              onClick={() => setCityOpen(true)}
              className="flex items-center gap-2 text-offwhite font-medium bg-gray-700 hover:bg-gray-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-golden/30 transition-all duration-200 group"
              aria-label="Choose city"
            >
              <FiMapPin className="text-golden" />
              <span className="text-sm md:text-base">
                {city || "Choose City"}
              </span>
              <IoIosArrowDown className="text-golden/80 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={`relative text-sm xl:text-base font-medium tracking-wide text-offwhite hover:text-golden transition-colors duration-200 px-1 py-2 cursor-pointer ${
                    isActive(link.href) ? "text-golden" : ""
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-golden"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle */}
          <button
            type="button"
            className="lg:hidden text-offwhite hover:text-golden transition-colors p-2 focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <FaTimes size={24} className="text-golden" />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel sliding from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-[100] border-l border-golden/30 flex flex-col"
            >
              {/* Header with close button */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-gray-700">
                <Image
                  src={ksLogo}
                  alt="Kstone Homes Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-golden hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <FaTimes size={28} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className={`w-full flex items-center justify-between py-4 px-4 rounded-lg transition-all duration-200 ${
                          isActive(link.href)
                            ? "bg-golden/10 text-golden border-l-4 border-golden"
                            : "text-offwhite hover:bg-gray-700"
                        }`}
                      >
                        <span className="font-medium text-lg">
                          {link.label}
                        </span>
                        <FaChevronRight
                          className={`transition-transform ${
                            isActive(link.href)
                              ? "text-golden"
                              : "text-gray-400"
                          }`}
                          size={14}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Current City Display */}
              <div className="p-6 border-t border-gray-700">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCityOpen(true);
                  }}
                  className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 px-5 py-3 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-golden/10 rounded-full group-hover:bg-golden/20 transition-colors">
                      <FiMapPin className="text-golden" />
                    </div>
                    <span className="text-offwhite font-medium">
                      {city || "Select Your City"}
                    </span>
                  </div>
                  <IoIosArrowDown className="text-golden/80 group-hover:rotate-180 transition-transform" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
