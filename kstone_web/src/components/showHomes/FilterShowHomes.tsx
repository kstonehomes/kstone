"use client";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";
import { client } from "@/sanity/client";
import Image from "next/image";
import { FaArrowRight, FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";

interface ShowHome {
  _id: string;
  houseModel: string;
  houseType: string;
  streetAddress: string;
  community: {
    name: string;
  };
  province: string;
  propertySize: number;
  numOfBeds: number;
  numOfBaths: number;
  featuredImage: string;
  slug: string;
}

const FilterShowHomes = ({ community }: { community: string }) => {
  const { city } = useCity();
  const [data, setData] = useState<ShowHome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = ['_type == "showHome"', '!(_id in path("drafts.**"))'];
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
      streetAddress,
      "community": community->{ name },
      province,
      propertySize,
      numOfBeds,
      numOfBaths,
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: ShowHome[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching filtered show homes:", error);
        setData([]);
        setLoading(false);
      });
  }, [city, community]);

  return (
    <div className="show-homes-container">
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.featuredImage}
                      alt={item.houseModel}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {item.houseModel}
                    </h2>
                    <p className="text-amber-600 dark:text-amber-400 font-medium uppercase text-sm">
                      {item.community.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      {item.streetAddress}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-200 font-semibold">
                      {item.houseType.toUpperCase()}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <FaRulerCombined className="text-amber-600" />
                        {item.propertySize} sqft
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBed className="text-amber-600" />
                        {item.numOfBeds}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBath className="text-amber-600" />
                        {item.numOfBaths}
                      </span>
                    </div>
                  </div>

                  {/* Link Button */}
                  <div className="px-4 pb-4">
                    <Link
                      href={`/show-homes/${item.slug}`}
                      className="flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      View Home <FaArrowRight className="ml-2" />
                    </Link>
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
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No Show Homes Available
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Currently no show homes in{" "}
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {community || city || "this area"}
                  </span>
                  . Please check back soon.
                </p>
                <Link
                  href="/quick-possessions"
                  className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm transition-colors"
                >
                  Browse Quick Possessions
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FilterShowHomes;
