// components/CommunityContent.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiMapPin, FiHome, FiCalendar } from "react-icons/fi";
import CTA from "@/components/CTA/CTA";
import PropertyCard from "@/components/propertyCard/PropertyCard";

interface Community {
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CommunityContent({
  community,
}: {
  community: Community;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] max-h-[800px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={community.featuredImage}
            alt={community.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        <div className="relative h-full flex items-end pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            >
              {community.name}
            </motion.h1>
            <motion.div
              variants={fadeIn}
              className="flex items-center text-amber-300 font-medium text-xl"
            >
              <FiMapPin className="mr-2" />
              <span>{community.city.name}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto px-3 sm:px-6 lg:px-8 pt-8">
        {/* Description Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl px-4 mx-auto mb-20"
        >
          <motion.div variants={fadeIn} className="flex items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
              About {community.name}
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="prose prose-lg dark:prose-invert max-w-4xl"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg md:text-xl">
              {community.description}
            </p>
          </motion.div>
        </motion.section>

        {/* Listings Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto pb-8"
        >
          {/* Section Header */}
          <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-600 mb-4">
              Available Properties
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Property Types Cards - Grid Layout */}
          <div className="grid gap-8">
            {/* Show Homes Card */}
            <motion.div
              variants={fadeIn}
              className="bg-white pb-2 sm:pb-6 dark:bg-gray-800 rounded-sm shadow-sm overflow-hidden border border-golden/40  transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 sm:p-6">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <FiHome className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="esm:text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                    Show Homes
                  </h3>
                </div>
              </div>
              <div className="flex-grow p-4 sm:p-6">
                <PropertyCard
                  community={community.name}
                  propertyState={"showhome"}
                  propertyRef={"show-homes"}
                />
              </div>
              <div className="px-6 py-4 text-center">
                <button className="inline-block px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow hover:from-amber-600 hover:to-amber-700 transition-all duration-200 cursor-pointer">
                  View All Show Homes
                </button>
              </div>
            </motion.div>

            {/* Quick Possessions Card */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="bg-white pb-2 sm:pb-6 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-blue-500/40 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-6">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="esm:text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                    Quick Possessions
                  </h3>
                </div>
              </div>
              <div className="flex-grow p-4 sm:p-6">
                <PropertyCard
                  community={community.name}
                  propertyState={"quickPossession"}
                  propertyRef={"quick-possessions"}
                />
              </div>
              <div className="px-6 py-4 text-center">
                <button className="inline-block px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-200 cursor-pointer">
                  Quick Possessions
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <CTA />
      </motion.div>
    </div>
  );
}
