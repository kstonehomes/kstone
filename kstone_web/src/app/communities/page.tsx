"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { Community } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/heroSection/HeroSection";
import CTA from "@/components/CTA/CTA";

const ksCommunities = "/images/ks-communities.jpg";
const Communities = () => {
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = ['_type == "community"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (city) {
      filters.push("city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      name,
      "city": city->{name},
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    } | order(name asc)`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: Community[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
        setLoading(false);
      });
  }, [city]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const hoverCard = {
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 300,
    },
  };

  return (
    <div className="communities_wrapper overflow-hidden bg-offwhite dark:bg-darkgray">
      {/* Hero Section */}
      <HeroSection
        heading="Our Premier Communities"
        paragraph="Experience luxury living in these exceptional neighborhoods"
        imageUrl={ksCommunities}
      />

      {/* Community Grid Section */}
      <section className="py-12 sm:py-20 bg-offwhite dark:bg-darkgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-golden mb-3 sm:mb-4"
            >
              {city ? `Exclusive ${city} Communities` : "Featured Communities"}
            </motion.h2>
            <div className="w-full">
              <div className="h-1 bg-gradient-to-r from-golden via-golden to-transparent mx-auto max-w-48"></div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base mt-8 sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Discover the finest neighborhoods crafted for exceptional living
            </motion.p>
          </div>

          {loading ? (
            <div className="py-16 flex justify-center">
              <Loader />
            </div>
          ) : (
            <AnimatePresence>
              {data.length > 0 ? (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  {data.map((community) => (
                    <motion.div
                      key={community._id}
                      variants={item}
                      whileHover={hoverCard}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl bg-darkgray hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Content Above Image */}
                      <div className="relative p-4 sm:p-6">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2 pr-10">
                              {community.name}
                            </h3>
                            <div className="flex items-center text-golden">
                              <FiMapPin className="mr-1.5 flex-shrink-0 text-sm sm:text-base" />
                              <span className="font-medium text-sm sm:text-base">
                                {community.city?.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Absolute positioned arrow */}
                        <Link
                          href={`/communities/${community.slug}`}
                          className="absolute right-4 sm:right-6 top-4 sm:top-6 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-golden hover:bg-lightyellow text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          aria-label={`Explore ${community.name}`}
                        >
                          <FiArrowRight className="text-lg sm:text-xl" />
                        </Link>
                      </div>

                      {/* Full-width Image */}
                      <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full">
                        <Image
                          src={community.featuredImage}
                          alt={community.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-dark/15 to-transparent" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 sm:py-16"
                >
                  <div className="max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏘️</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-offwhite mb-2">
                      No Communities Found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                      {city
                        ? `We don't currently have communities in ${city}`
                        : "No communities available at this time"}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-golden hover:bg-lightyellow text-white font-medium rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    >
                      Contact Us About New Communities
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Communities;
