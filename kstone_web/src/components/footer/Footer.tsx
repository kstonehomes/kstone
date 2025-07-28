"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Home as HomeIcon
} from "lucide-react";
import { useCity } from "../../../context/cityContext";
import { client } from "@/sanity/client";
import CTA from "../CTA";
import { FaExternalLinkAlt } from "react-icons/fa";
import Logo from "../header/Logo";
import WhatsAppWidget from "../WhatsAppWidget";

// Image paths
// const spAlignedText = "/images/sp-aligned-text.png";

interface Community {
  _id: string;
  name: string;
  slug: string;
}

const Footer = () => {
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);
  // const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const filters = ['_type == "community"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (city) {
      filters.push("city->name == $city");
      params.city = city;
    }

    const query = `*[
      ${filters.join(" && ")}
    ] | order(_createdAt desc)[0...5]{
      _id,
      name,
      "slug": slug.current
    }`;

    client
      .fetch(query, params)
      .then((data: Community[]) => setData(data))
      .catch((error: unknown) => {
        console.error("Error fetching communities:", error);
        setData([]);
      });
  }, [city]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowScrollTop(window.scrollY > 400);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Show Homes", href: "/showhomes" },
    { name: "Quick Possessions", href: "/quick-possessions" },
    { name: "Communities", href: "/communities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61577303111412",
      icon: Facebook,
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kstone.homes",
      icon: Instagram,
      color: "hover:text-pink-500",
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/",
      icon: Youtube,
      color: "hover:text-red-500",
    },
  ];


  return (
    <>
      <CTA />
      <footer className="relative border-t border-primary bg-secondary-dark">
        {/* Main Footer Content */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full bg-repeat opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Logo />
                </div>
                <p className="content text-white text-base">
                  Creating exceptional living spaces with modern luxury and
                  timeless design since 2010.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="font-display font-semibold text-xl text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-offwhite hover:text-offwhite transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-2 h-1 bg-primary rounded-full mr-3 group-hover:w-3 transition-all duration-300" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Communities */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Link
                  href="/communities"
                  className="font-display font-semibold text-xl text-white flex items-center gap-1 group"
                >
                  Communities{" "}
                  <FaExternalLinkAlt className="group-hover:scale-125 transition-transform text-base text-primary" />
                </Link>
                <ul className="space-y-3">
                  {data.length > 0 ? (
                    data.map((community) => (
                      <li key={community._id}>
                        <Link
                          href={`/communities/${community.slug}`}
                          className="text-white hover:text-offwhite transition-colors duration-300 flex items-center group hover:font-semibold"
                        >
                          <HomeIcon className="size-4 mr-3 text-primary group-hover:scale-125 transition-transform duration-300" />
                          {community.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-secondary-dark">
                      No communities available
                    </li>
                  )}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="font-display font-semibold text-xl text-white">
                  Contact Info
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      target="_blank"
                      href="https://g.co/kgs/4pJozk9"
                      className="text-secondary hover:font-semibold transition-all duration-300 flex items-start group"
                    >
                      <MapPin className="size-5 text-primary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-base leading-relaxed text-white">
                        2817 63 Ave NE, Leduc County T4X 3A6 (Show-Home Coming
                        Soon)
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:info@kstoneyeg.com"
                      className="text-white hover:font-semibold transition-colors duration-300 flex items-center group"
                    >
                      <Mail className="size-5 text-primary mr-3 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-sm">info@kstoneyeg.com</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="tel:17802772277"
                      className="text-white hover:font-semibold transition-colors duration-300 flex items-center group"
                    >
                      <Phone className="size-5 text-primary mr-3 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-sm">+1 (780) 277-2277</span>
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6"
              >
                {socialLinks.map(({ name, href, icon: Icon, color }, index) => (
                  <Link
                    key={index}
                    target="_blank"
                    href={href}
                    className={`text-primary ${color} transition-all duration-300 hover:scale-110`}
                    aria-label={name}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-white text-sm text-center md:text-right"
              >
                &copy; {new Date().getFullYear()} Kstone Homes. All rights
                reserved.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {/* {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary/90 text-offwhite rounded-full shadow-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )} */}
      </footer>
      <WhatsAppWidget number={7802772277} />
    </>
  );
};

export default Footer;