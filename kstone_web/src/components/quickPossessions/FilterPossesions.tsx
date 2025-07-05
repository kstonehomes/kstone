"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../loader/Loader";
import { useCity } from "../../../context/cityContext";
import { QuickPossession } from "@/types/propsInterfaces";
import { client } from "@/sanity/client";

const FilterPossesions = ({ community }: { community: string }) => {
  const { city } = useCity();
  const [data, setData] = useState<QuickPossession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = [
      '_type == "quickPossession"',
      '!(_id in path("drafts.**"))',
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
      houseModel,
      houseType,
      "community": community->{ name },
      sqft,
      beds,
      baths,
      oldPrice,
      newPrice,
      "featuredImage": featuredImage.asset->url,
      status,
      availability,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: QuickPossession[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching quick possessions:", error);
        setData([]);
        setLoading(false);
      });
  }, [community, city]);

  const statusConfig = {
    ready: {
      bg: "bg-green-600",
      text: "READY NOW",
      icon: "✓",
    },
    pending: {
      bg: "bg-amber-500",
      text: "COMING SOON",
      icon: "⏳",
    },
    sold: {
      bg: "bg-red-600",
      text: "SOLD",
      icon: "✓",
    },
  };

  return (
    <div className="quickPossession">
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.featuredImage || "/images/placeholder-home.jpg"}
                      alt={item.houseModel}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold text-white rounded-full ${statusConfig[item.status as keyof typeof statusConfig].bg} flex items-center gap-1`}
                    >
                      <span>
                        {
                          statusConfig[item.status as keyof typeof statusConfig]
                            .icon
                        }
                      </span>
                      <span>
                        {item.status === "ready" && item.availability
                          ? `READY IN ${item.availability} DAYS`
                          : statusConfig[
                              item.status as keyof typeof statusConfig
                            ].text}
                      </span>
                    </div>

                    {/* Price Tag */}
                    {(item.status === "ready" || item.status === "pending") && (
                      <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-md shadow-xs border border-gray-100 dark:border-gray-700">
                        <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                          ${item.newPrice.toLocaleString()}
                        </div>
                        {item.oldPrice && item.oldPrice > item.newPrice && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                            ${item.oldPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {item.houseModel}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.community.name}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex justify-between py-2 border-y border-gray-100 dark:border-gray-700 mb-3 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaBed className="mr-1.5 text-gray-400 text-sm" />
                        <span>{item.beds} Beds</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaBath className="mr-1.5 text-gray-400 text-sm" />
                        <span>{item.baths} Baths</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaRulerCombined className="mr-1.5 text-gray-400 text-sm" />
                        <span>{item.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded">
                        {item.houseType}
                      </span>
                      <Link
                        href={`/quick-possessions/${item.slug}`}
                        className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                      >
                        View Details <FaArrowRight className="ml-1.5 text-xs" />
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
              className="text-center py-12"
            >
              <div className="inline-block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg max-w-md">
                <div className="text-4xl mb-3">🏡</div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No Quick Possessions Available
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Currently no homes ready for quick possession in{" "}
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {community || city || "this area"}
                  </span>
                  . Please check back soon or explore our show homes.
                </p>
                <Link
                  href="/show-homes"
                  className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm transition-colors"
                >
                  Browse Show Homes
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FilterPossesions;
