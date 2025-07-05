"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import ksLogo from "@/public/images/ks-logo.png";
import { useNavigation } from "../../../context/navigationContext";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/show-homes", label: "SHOW HOMES" },
  { href: "/quick-possessions", label: "QUICK POSSESSIONS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

const cityRequiredRoutes = [
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

  // Memoize click handler to prevent unnecessary re-renders
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
      {/* Fixed header with explicit height to prevent CLS */}
      <div className="h-[96px] bg-gray-900 py-3 px-4 md:px-8 fixed top-0 left-0 right-0 z-[10000] font-sans shadow-[5px_10px_30px_rgba(0,0,0,0.3)] border-b border-gray-600">
        <div className="max-w-[1480px] mx-auto flex items-center justify-between h-full">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={ksLogo}
                alt="Kstone Logo"
                className="h-18 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setCityOpen(true)}
              className="text-white text-sm font-medium hover:underline focus:outline-none bg-blue-700 px-2 py-1 rounded whitespace-nowrap"
              aria-label="Choose city"
            >
              {city || "Choose City"}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-base text-gray-100 hover:text-yellow-300 transition-colors font-semibold whitespace-nowrap cursor-pointer ${
                    isActive(link.href) ? "border-b-2 border-yellow-300" : ""
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle */}
          <button
            type="button"
            className="lg:hidden text-yellow-300 focus:outline-none cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <FaTimes size={28} aria-hidden="true" />
            ) : (
              <GiHamburgerMenu size={28} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden fixed left-0 right-0 z-[9999] bg-gray-700 shadow-lg overflow-hidden"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: mobileOpen ? "88px" : "-100%",
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{ willChange: "transform, opacity" }}
      >
        <ul className="flex flex-col divide-y divide-gray-600">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className={`w-full text-left text-gray-100 hover:text-yellow-300 transition-colors py-4 px-6 text-lg flex items-center cursor-pointer ${
                  isActive(link.href) ? "text-yellow-300 font-semibold" : ""
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="ml-2 w-2 h-2 bg-yellow-300 rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
