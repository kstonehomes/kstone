"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaHome,
  FaMapMarkerAlt,
  FaRulerCombined,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../loader/Loader";
import { useCity } from "../../../context/cityContext";
import { client } from "@/sanity/client";
import { RiUserCommunityFill } from "react-icons/ri";
import { HiArrowRight } from "react-icons/hi";
import { PropertyCardType } from "@/types/propsInterfaces";

interface PropertyCardProps {
  community?: string;
  propertyState: "preConstruction" | "quickPossession" | "showhome";
  propertyRef: string;
}


const PropertyCard = ({ community, propertyState, propertyRef }: PropertyCardProps) => {
  const { city } = useCity();

  const [data, setData] = useState<PropertyCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = [
      '_type == "property"',
      '!(_id in path("drafts.**"))',
      `propertyState == "${propertyState}"`,
    ];
    const params: Record<string, string> = {};

    if (community) {
      filters.push("community->name == $community");
      params.community = community;
    }

    if (city) {
      filters.push("community->city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      houseName,
      propertyState,
      "slug": slug.current,
      houseType,
      "featuredImage": featuredImage.asset->url,
      "community": community->{ name },
      province,
      status,
      readyStatus,
      availableStatus,
      oldPrice,
      newPrice,
      allFeatures {
        sqft,
        bedrooms,
        bathrooms
      },
      ${propertyState === "quickPossession" ? "availability" : ""}
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching properties:", error);
        setData([]);
        setLoading(false);
      });
  }, [community, city, propertyState]);

  const statusConfig = {
    ready: "bg-green-600",
    pending: "bg-golden",
    sold: "bg-red-500",
    available: "bg-blue-500",
  };

  return (
    <div className="propertyListing">
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {data.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  className="bg-white rounded-xs overflow-hidden shadow-md border border-gray-100 transition-all group"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.featuredImage || "/images/placeholder-home.jpg"}
                      alt={item.houseName || "Property Image"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    {/* Status Badge */}
                    {propertyState === "quickPossession" && (
                      <div
                        className={`absolute top-0 left-0 z-2 p-3 text-sm sm:text-lg font-medium text-white ${
                          statusConfig[
                            item.status as keyof typeof statusConfig
                          ] || "bg-gray-400"
                        } flex items-center gap-1 shadow-md origin-left`}
                      >
                        <span className="uppercase">{item.status}</span>
                      </div>
                    )}

                    {/* Price Tag */}
                    {propertyState === "quickPossession" && (
                      <motion.div
                        className="absolute bottom-4 right-0 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-2 rounded-l-lg shadow-lg"
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex flex-col items-end">
                          {item.oldPrice && item.oldPrice > item.newPrice && (
                            <motion.div
                              className="text-xs text-gray-400 line-through"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              ${item.oldPrice.toLocaleString()}
                            </motion.div>
                          )}
                          <motion.div
                            className="text-green-700 font-bold text-sm sm:text-lg md:text-xl"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.newPrice !== undefined
                              ? `$${item.newPrice.toLocaleString()}`
                              : "Price TBD"}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-4">
                      {/* House name with golden hover effect */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-golden transition-colors duration-300 truncate">
                        {item.houseName}
                      </h3>
                      {/* House type */}
                      <p className="text-gray-600 mt-1 flex items-center gap-1 truncate">
                        <FaHome className="text-golden" size={18} />
                        <span>{item.houseType}</span>
                      </p>
                      {/* Community & City */}
                      <p className="text-gray-600 mt-1 flex items-center gap-1 truncate">
                        <RiUserCommunityFill
                          className="text-golden"
                          size={18}
                        />
                        <span>
                          {item.community?.name}, {city || "N/A"}
                        </span>
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex justify-around p-4 border-y border-dark mb-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-lg">
                          <FaBed className="text-golden" />
                          <span>{item.allFeatures?.bedrooms || "—"}</span>
                        </div>
                        <span className="text-gray-600 text-sm">Beds</span>
                      </div>
                      <div className="border-r border-dark h-12"></div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-lg">
                          <FaBath className="text-golden" />
                          <span>{item.allFeatures?.bathrooms || "—"}</span>
                        </div>
                        <span className="text-gray-600 text-sm">Baths</span>
                      </div>
                      <div className="border-r border-dark h-12"></div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-lg">
                          <FaRulerCombined className="text-golden" />
                          <span>
                            {item.allFeatures?.sqft
                              ? item.allFeatures.sqft.toLocaleString()
                              : "—"}
                          </span>
                        </div>
                        <span className="text-gray-600 text-sm">
                          Total SQFT
                        </span>
                      </div>
                    </div>

                    <div className="details_address_container flex justify-between">
                      {/* Address */}
                      <div className="flex gap-1 items-center justify-center text-sm truncate max-w-[70%]">
                        <FaMapMarkerAlt className="text-golden" size={18} />
                        <p className="text-gray-500 truncate">
                          {item.status === "pending"
                            ? "Coming Soon"
                            : item.address || "Address Not Available"}
                        </p>
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={`/${propertyRef}/${item.slug}`}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-dark hover:bg-golden text-sm text-white transition-colors duration-300 whitespace-nowrap"
                      >
                        View Details <FaArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-block p-8 bg-white rounded-xl max-w-md shadow-md border border-golden">
                <div className="text-5xl mb-4">🏡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No {propertyState.replace(/([A-Z])/g, " $1")} Properties
                  Available
                </h3>
                <p className="text-gray-600 mb-5">
                  Currently no properties in{" "}
                  <span className="font-semibold text-golden">
                    {community || city || "this area"}
                  </span>
                  . Please check back soon.
                </p>
                <Link
                  href="/"
                  className="flex gap-1 items-center justify-center px-6 py-3 bg-golden hover:bg-dark text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  <span>Go To Home</span> <HiArrowRight />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default PropertyCard;
