"use client";

import {useState } from "react";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { motion } from "framer-motion";
import FilterShowHomes from "@/components/showHomes/FilterShowHomes";



const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const titleVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

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

const ShowHome = () => {
  const [community, setCommunity] = useState<string>("");
 

  const banner = "/images/ks-showhomes.jpg";

  return (
    <div className="show_homes_wrapper">
      {/* Banner Section with Animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        className="relative w-full h-[240px] md:h-[480px] lg:h-[520px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <motion.h1
            variants={titleVariants}
            className="text-white text-5xl sm:text-6xl font-bold drop-shadow-xl"
          >
            SHOW HOMES
          </motion.h1>
        </div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="filter_wrapper"
      >
        <FilterByCommunity community={community} setCommunity={setCommunity} />
      </motion.div>

      {/* Filtered show homes */}
      <div className="px-4 py-10 bg-white dark:bg-gray-900">
        <FilterShowHomes community={community} />
      </div>
    </div>
  );
};

export default ShowHome;
