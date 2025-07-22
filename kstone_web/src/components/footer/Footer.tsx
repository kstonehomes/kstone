"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaHome,
  FaBuilding,
  FaClock,
  FaMapMarkedAlt,
  FaImages,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { GiRotaryPhone } from "react-icons/gi";
import { useCity } from "../../../context/cityContext";
import { client } from "@/sanity/client";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineConstruction } from "react-icons/md";

// Image paths
const ksLogo = "/images/ks-logo.png";

interface Community {
  _id: string;
  name: string;
  slug: string;
}

const Footer = () => {
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);

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

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black">
      {/* Upper Footer */}
      <div className="content_footer p-6 border-t-2 border-golden-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo Block */}
        <div className="company_info flex flex-col items-start">
          <Image
            src={ksLogo}
            alt="KStone Homes logo"
            width={256}
            height={80}
            className="object-contain w-auto max-h-[100px] mb-4"
          />
          <p className="text-gray-300 text-sm">
            Building dreams into reality with quality craftsmanship and
            exceptional service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="quick_menu">
          <h3 className="text-2xl font-semibold text-golden mb-4 pb-2 border-b border-golden/30">
            Quick Menu
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              {
                name: "Home",
                icon: <FaHome className="text-golden" />,
                path: "/",
              },
              {
                name: "Gallery",
                icon: <FaImages className="text-golden" />,
                path: "/gallery",
              },
              {
                name: "Pre-Construction",
                icon: <MdOutlineConstruction className="text-golden" />,
                path: "/pre-construction",
              },
              {
                name: "Show Homes",
                icon: <FaBuilding className="text-golden" />,
                path: "/show-homes",
              },
              {
                name: "Quick Possessions",
                icon: <FaClock className="text-golden" />,
                path: "/quick-possessions",
              },
              {
                name: "Communities",
                icon: <FaMapMarkedAlt className="text-golden" />,
                path: "/communities",
              },

              {
                name: "Contact",
                icon: <FaPhoneAlt className="text-golden" />,
                path: "/contact",
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="flex items-center gap-3 hover:text-golden transition-colors duration-200 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Communities List */}
        <div className="our_communities">
          <h3 className="text-2xl font-semibold text-golden mb-4 pb-2 border-b border-golden/30">
            Communities
          </h3>
          <ul className="mt-4 space-y-3">
            {data.map((community) => (
              <li key={community._id}>
                <Link
                  href={`/communities/${community.slug}`}
                  className="flex items-center gap-3 hover:text-golden transition-colors duration-200 group"
                >
                  <FaMapMarkerAlt className="text-golden group-hover:scale-110 transition-transform duration-200" />
                  <span>{community.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="contact_us">
          <h3 className="text-2xl font-semibold text-golden mb-4 pb-2 border-b border-golden/30">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link
                target="_blank"
                href="https://g.co/kgs/4pJozk9"
                className="flex items-start gap-3 hover:text-golden transition-colors duration-200 group"
              >
                <FaLocationDot className="text-golden mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span>2817 63rd Ave NE, Leduc County T4X 3A6</span>
              </Link>
            </li>
            <li>
              <Link
                href="mailto:info@kstoneyeg.com"
                className="flex items-center gap-3 hover:text-golden transition-colors duration-200 group"
              >
                <IoMailOpenOutline className="text-golden group-hover:scale-110 transition-transform duration-200" />
                <span>info@kstoneyeg.com</span>
              </Link>
            </li>
            <li>
              <Link
                href="tel:780-254-4000"
                className="flex items-center gap-3 hover:text-golden transition-colors duration-200 group"
              >
                <GiRotaryPhone className="text-golden group-hover:scale-110 transition-transform duration-200" />
                <span>780-254-4000</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="primary_footer bg-gradient-to-r from-gray-900 to-black text-gray-100 p-6 flex flex-col items-center gap-6 border-t border-golden/20">
        <ul className="socials flex gap-6 items-center justify-center">
          {(
            [
              [
                "https://www.facebook.com/profile.php?id=61577303111412",
                FaFacebook,
                "Facebook",
              ],
              [
                "https://www.instagram.com/kstone.homes",
                FaInstagram,
                "Instagram",
              ],
              ["https://youtube.com/", FaYoutube, "YouTube"],
            ] as [string, React.ElementType, string][]
          ).map(([url, Icon, name], index) => (
            <li key={index}>
              <Link
                target="_blank"
                href={url}
                className="text-2xl text-gray-300 hover:text-golden transition-colors duration-300 relative group"
                aria-label={name}
              >
                <Icon />
                <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-golden px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-center text-gray-300">
          <span className="font-bold text-golden">©</span>{" "}
          {new Date().getFullYear()}{" "}
          <span className="text-golden font-semibold">Kstone Homes</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
