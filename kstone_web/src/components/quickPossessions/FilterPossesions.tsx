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
      bg: "bg-green-500",
      text: "READY NOW",
      icon: "✓",
    },
    pending: {
      bg: "bg-[var(--color-golden)]",
      text: "COMING SOON",
      icon: "⏳",
    },
    sold: {
      bg: "bg-red-500",
      text: "SOLD",
      icon: "✕",
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="bg-[var(--color-offwhite)] rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all"
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
                      className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold text-white rounded-full ${statusConfig[item.status as keyof typeof statusConfig].bg} flex items-center gap-1 shadow-md`}
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
                      <div className="absolute bottom-4 right-4 bg-[var(--color-dark)] px-4 py-2 rounded-lg shadow-lg border border-white/10">
                        <div className="text-[var(--color-lightyellow)] font-bold text-lg">
                          ${item.newPrice.toLocaleString()}
                        </div>
                        {item.oldPrice && item.oldPrice > item.newPrice && (
                          <div className="text-xs text-gray-300 line-through">
                            ${item.oldPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-[var(--color-dark)]">
                        {item.houseModel}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.community.name}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex justify-between py-3 border-y border-gray-300/30 mb-4 text-sm">
                      <div className="flex flex-col items-center text-[var(--color-dark)]">
                        <FaBed className="text-[var(--color-golden)] text-lg mb-1" />
                        <span>{item.beds} Beds</span>
                      </div>
                      <div className="flex flex-col items-center text-[var(--color-dark)]">
                        <FaBath className="text-[var(--color-golden)] text-lg mb-1" />
                        <span>{item.baths} Baths</span>
                      </div>
                      <div className="flex flex-col items-center text-[var(--color-dark)]">
                        <FaRulerCombined className="text-[var(--color-golden)] text-lg mb-1" />
                        <span>{item.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1.5 bg-white text-[var(--color-dark)] text-xs font-semibold rounded-lg border border-gray-200">
                        {item.houseType}
                      </span>
                      <Link
                        href={`/quick-possessions/${item.slug}`}
                        className="flex items-center text-sm font-semibold text-[var(--color-dark)] hover:text-[var(--color-golden)] transition-colors group"
                      >
                        View Details{" "}
                        <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
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
              <div className="inline-block p-8 bg-white rounded-xl max-w-md shadow-md border border-gray-200">
                <div className="text-5xl mb-4 text-[var(--color-golden)]">
                  🏡
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-dark)] mb-3">
                  No Quick Possessions Available
                </h3>
                <p className="text-gray-600 mb-5">
                  Currently no homes ready for quick possession in{" "}
                  <span className="font-semibold text-[var(--color-golden)]">
                    {community || city || "this area"}
                  </span>
                  . Please check back soon or explore our show homes.
                </p>
                <Link
                  href="/show-homes"
                  className="inline-block px-6 py-3 bg-[var(--color-dark)] hover:bg-opacity-90 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
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
