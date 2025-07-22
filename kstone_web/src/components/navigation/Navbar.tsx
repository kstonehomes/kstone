"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
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

const allNavLinks = [
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState(allNavLinks);
  const [dropdownLinks, setDropdownLinks] = useState<typeof allNavLinks>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const calculateVisibleItems = useCallback(() => {
    if (!navRef.current) return;

    const nav = navRef.current;
    const moreButtonWidth = 100; // Increased for better safety margin
    const navRightPadding = 160; // Increased space for logo + city button
    const maxWidth = nav.offsetWidth - navRightPadding - moreButtonWidth;

    let totalWidth = 0;
    let lastVisibleIndex = -1;

    // Reset refs array
    itemsRef.current = itemsRef.current.slice(0, allNavLinks.length);

    for (let i = 0; i < allNavLinks.length; i++) {
      const el = itemsRef.current[i];
      if (!el) continue;

      const elWidth = el.offsetWidth;
      totalWidth += elWidth;

      if (totalWidth <= maxWidth) {
        lastVisibleIndex = i;
      } else {
        break;
      }
    }

    // Ensure at least 3 items are always visible
    const minVisible = Math.min(3, allNavLinks.length);
    lastVisibleIndex = Math.max(lastVisibleIndex, minVisible - 1);

    setVisibleLinks(allNavLinks.slice(0, lastVisibleIndex + 1));
    setDropdownLinks(allNavLinks.slice(lastVisibleIndex + 1));
  }, []);

  // Handle resize events with debounce
  useEffect(() => {
    calculateVisibleItems();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculateVisibleItems();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [calculateVisibleItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Recalculate when mobile menu toggles
  useEffect(() => {
    if (!mobileOpen) {
      calculateVisibleItems();
    }
  }, [mobileOpen, calculateVisibleItems]);

  const handleLinkClick = useCallback(
    (href: string) => {
      if (!city && cityRequiredRoutes.includes(href)) {
        setCityOpen(true);
        return;
      }

      setActive(href);
      setMobileOpen(false);
      setDropdownOpen(false);
      router.push(href);
    },
    [city, setActive, setCityOpen, router]
  );

  const isActive = useCallback((href: string) => active === href, [active]);

  return (
    <nav className="navigation relative z-[100]">
      {/* Main Navbar */}
      <div className="h-24 bg-gradient-to-b from-gray-900 to-gray-800 py-3 px-4 md:px-8 fixed top-0 left-0 right-0 z-[100] shadow-lg border-b border-golden/20">
        <div className="max-w-[1480px] mx-auto flex items-center justify-between h-full">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hover:opacity-90 transition-opacity"
              onClick={() => setActive("/")}
            >
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
              <span className="text-sm md:text-base whitespace-nowrap">
                {city || "Choose City"}
              </span>
              <IoIosArrowDown className="text-golden/80 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden lg:flex items-center">
            <ul className="flex items-center gap-6 xl:gap-8">
              {visibleLinks.map((link, index) => (
                <li
                  key={link.href}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative text-sm xl:text-base font-medium tracking-wide text-offwhite hover:text-golden transition-colors duration-200 px-1 py-2 cursor-pointer whitespace-nowrap ${
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

              {/* Dynamic dropdown for overflow items */}
              {dropdownLinks.length > 0 && (
                <li className="relative">
                  <button
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 text-sm xl:text-base font-medium tracking-wide px-1 py-2 cursor-pointer whitespace-nowrap ${
                      dropdownLinks.some((link) => isActive(link.href))
                        ? "text-golden"
                        : "text-offwhite hover:text-golden"
                    }`}
                  >
                    MORE
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-1 min-w-[180px] bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        {dropdownLinks.map((link) => (
                          <button
                            key={link.href}
                            onClick={() => handleLinkClick(link.href)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors text-sm ${
                              isActive(link.href)
                                ? "text-golden bg-gray-700/50"
                                : "text-offwhite"
                            }`}
                          >
                            {link.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )}
            </ul>
          </div>

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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

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

              <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                  {allNavLinks.map((link) => (
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
