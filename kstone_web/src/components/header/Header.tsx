"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes, FaPhone } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigation } from "../../../context/navigationContext";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import ChooseCityButton from "../ChooseCityButton";
import { IoIosArrowDown } from "react-icons/io";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/quick-possessions", label: "Quick Possessions" },
  { href: "/showhomes", label: "Showhomes" },
  { href: "/communities", label: "Communities" },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/pre-construction", label: "Pre-Construction" },
  { href: "/contact", label: "Contact" },
];

const cityRequiredRoutes = [
  "/show-homes",
  "/quick-possessions",
  "/communities",
];

const Header: React.FC = () => {
  const { city } = useCity();
  const { setCityOpen } = useCityPopup();
  const { active, setActive } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);

  const [visibleLinks, setVisibleLinks] = useState<typeof navLinks>([]);
  const [dropdownLinks, setDropdownLinks] = useState<typeof navLinks>([]);

  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateVisibleItems = useCallback(() => {
    if (!navRef.current) return;

    const nav = navRef.current;
    const moreButtonWidth = 90;
    const callButtonWidth = 150;
    const availableWidth = nav.offsetWidth - callButtonWidth - moreButtonWidth;

    let totalWidth = 0;
    let lastVisibleIndex = -1;

    // First render all items to measure their widths
    itemsRef.current = itemsRef.current.slice(0, navLinks.length);

    // Calculate which items fit
    for (let i = 0; i < navLinks.length; i++) {
      const el = itemsRef.current[i];
      if (!el) continue;

      const itemWidth = el.offsetWidth;
      totalWidth += itemWidth;

      if (totalWidth <= availableWidth) {
        lastVisibleIndex = i;
      } else {
        break;
      }
    }

    // Ensure at least 3 items are visible if possible
    const minVisible = Math.min(3, navLinks.length);
    lastVisibleIndex = Math.max(lastVisibleIndex, minVisible - 1);

    setVisibleLinks(navLinks.slice(0, lastVisibleIndex + 1));
    setDropdownLinks(navLinks.slice(lastVisibleIndex + 1));
    setIsCalculated(true);
  }, []);

  useEffect(() => {
    // Initial calculation after a small delay to ensure rendering is complete
    const timer = setTimeout(() => {
      calculateVisibleItems();
    }, 100);

    const handleResize = () => {
      clearTimeout(timer);
      calculateVisibleItems();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateVisibleItems]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      // Recalculate after a small delay when mobile menu closes
      const timer = setTimeout(() => {
        calculateVisibleItems();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mobileOpen, calculateVisibleItems]);

  const handleLinkClick = (href: string) => {
    if (!city && cityRequiredRoutes.includes(href)) {
      setCityOpen(true);
      return;
    }
    setActive(href);
    setMobileOpen(false);
    router.push(href);
  };

  const isActive = (href: string) => {
    if (!active) return false;
    return active.replace(/\/+$/, "") === href.replace(/\/+$/, "");
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b border-gray-50/30 text-white transform transition-all duration-500 ease-in-out
          ${
            active === "/"
              ? scrolled
                ? "bg-secondary shadow-md translate-y-0 opacity-100"
                : "bg-secondary/30 translate-y-0 opacity-100"
              : scrolled
                ? "bg-secondary shadow-md"
                : "bg-secondary shadow-md "
          }
        `}
      >
        <div className="container">
          <div className="flex justify-between h-25 items-stretch">
            <div className="flex-shrink-0 flex justify-between gap-5 items-center">
              <Logo />
              <ChooseCityButton
                selectedCity={city ?? "Choose City"}
                onClick={() => setCityOpen(true)}
              />
            </div>

            <nav className="hidden lg:block">
              <menu
                ref={navRef}
                className="flex justify-between items-stretch gap-5 h-full"
              >
                {isCalculated &&
                  navLinks.map((link, i) => (
                    <li
                      key={link.href}
                      ref={(el) => {
                        itemsRef.current[i] = el;
                      }}
                      className={`flex items-stretch ${
                        !visibleLinks.some((l) => l.href === link.href)
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`font-display text-base px-3 hover:bg-primary font-medium transition-colors border-b-3 box-border border-transparent duration-200 flex items-center text-white/80 capitalize ${
                          isActive(link.href)
                            ? "text-white border-primary!"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                {isCalculated && dropdownLinks.length > 0 && (
                  <li className="relative h-full">
                    <button
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`h-full font-display text-base px-3 hover:bg-primary text-white/80 font-medium transition-colors border-b-3 border-transparent duration-200 flex items-center hover:text-white capitalize ${
                        dropdownLinks.some((link) => isActive(link.href))
                          ? "text-white border-primary!"
                          : ""
                      }`}
                    >
                      More
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
                          className="absolute top-full right-0 mt-1 min-w-[180px] bg-secondary rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden"
                          onMouseEnter={() => setDropdownOpen(true)}
                          onMouseLeave={() => setDropdownOpen(false)}
                        >
                          {dropdownLinks.map((link) => (
                            <button
                              key={link.href}
                              onClick={() => handleLinkClick(link.href)}
                              className={`w-full text-left px-4 py-3 hover:text-white  hover:bg-primary transition-colors font-semibold ${
                                isActive(link.href)
                                  ? "text-primary"
                                  : "text-white/70"
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
              </menu>
            </nav>

            <Link
              href="tel:17802772277"
              className={`hidden lg:flex btn btn-cta md:px-3 lg:px-4 ${
                scrolled
                  ? "btn-primary"
                  : "bg-white/10 text-white hover:bg-primary"
              }`}
            >
              <span className="btn-icon">
                <FaPhoneVolume size={20} />
              </span>
              <span className="hidden md:block">+1 (780) 277-2277</span>
              <span className="inline-block md:hidden">Call</span>
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 transition-colors duration-200 text-white"
              onClick={() => setMobileOpen(true)}
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="MOBILE lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-secondary shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-500 flex-shrink-0">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/80 hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className={`w-full text-left font-display text-lg font-medium transition-colors duration-200 capitalize ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-white/80 hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-gray-500 flex-shrink-0">
                <Link
                  href="tel:17802772277"
                  className="w-full bg-primary text-offwhite text-center px-6 py-3 font-display font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2 rounded-md"
                >
                  <FaPhone size={16} />
                  +1 (780) 2772277
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Button Mobile */}
      <Link
        href="tel:17802772277"
        className={`flex lg:hidden fixed bottom-28 right-3 rounded-full p-2 z-50 bg-green-600! btn btn-cta ${
          scrolled ? "btn-primary" : "bg-white/10 text-white hover:bg-primary"
        }`}
      >
        <span className="btn-icon">
          <FaPhoneVolume size={20} />
        </span>
        <span className="hidden">+1 (780) 2772277</span>
      </Link>
    </>
  );
};

export default Header;
