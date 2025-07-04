"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
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

  // Color status mapping for badges
  const colorStatus = {
    ready: "bg-green-700",
    pending: "bg-yellow-600",
    sold: "bg-red-700",
  };

  return (
    <div className="quickPossession">
      {loading ? (
        <Loader />
      ) : data.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <li
              key={item._id}
              className="bg-white dark:bg-cyan-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.featuredImage || "/images/placeholder-home.jpg"}
                  alt={item.houseModel}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-md ${
                    colorStatus[item.status as keyof typeof colorStatus]
                  }`}
                >
                  {item.status === "ready" && item.availability
                    ? `READY IN ${item.availability} DAYS`
                    : item.status.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl uppercase font-bold text-gray-800 dark:text-white">
                      {item.houseModel}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {item.community.name}
                    </p>
                  </div>

                  {/* Price Tag */}
                  {(item.status === "ready" || item.status === "pending") && (
                    <div className="top-4 right-4 bg-white dark:bg-gray-700 shadow-md rounded-md px-2 py-2 text-right">
                      {item.oldPrice && item.oldPrice > item.newPrice && (
                        <div className="text-xs text-red-500 line-through font-medium">
                          ${item.oldPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-green-700 dark:text-green-400 text-base font-bold">
                        ${item.newPrice.toLocaleString()}
                      </div>
                      {item.oldPrice && item.oldPrice > item.newPrice && (
                        <div className="text-xs text-yellow-600 font-medium">
                          Save ${item.oldPrice - item.newPrice}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 py-2 border-t border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                    <FaBed className="text-gray-400" />
                    <span>{item.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <FaBath className="text-gray-400" />
                    <span>{item.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <FaRulerCombined className="text-gray-400" />
                    <span>{item.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

                {/* Type & Status */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-blue-200 font-semibold rounded-full">
                    {item.houseType.toUpperCase()}
                  </span>

                  <Link
                    href={`/quick-possessions/${item.slug}`}
                    className="flex items-center gap-1  font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
                  >
                    View Details <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-300 py-10">
          No quick possessions available for{" "}
          <span className="font-semibold">
            {community || city || "this selection"}
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterPossesions;
