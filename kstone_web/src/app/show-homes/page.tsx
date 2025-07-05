"use client";
import { useState } from "react";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { motion } from "framer-motion";
import FilterShowHomes from "@/components/showHomes/FilterShowHomes";
import { FiHome, FiMapPin, FiLayers, FiDroplet } from "react-icons/fi";

const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut" as const,
    },
  },
};

const titleVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.5,
    },
  },
} as const;

const subtitleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.8,
    },
  },
};

const ShowHome = () => {
  const [community, setCommunity] = useState<string>("");
  const banner = "/images/ks-showhomes.jpg";

  return (
    <div className="show_homes_wrapper overflow-hidden">
      {/* Hero Banner Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        className="relative w-full h-[60vh] min-h-[400px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70 z-10"></div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-amber-400/20 blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative flex flex-col items-center justify-center text-center h-full w-full z-20 px-4">
          <motion.h1
            variants={titleVariants}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
              SHOW HOMES
            </span>
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            className="text-xl md:text-2xl text-amber-100 max-w-2xl leading-relaxed"
          >
            Walk through our beautifully designed homes and imagine your future
          </motion.p>

          <motion.div
            variants={subtitleVariants}
            className="mt-8 flex flex-col sm:flex-row sm:gap-4"
          >
            <div className="flex items-center text-amber-100">
              <FiHome className="mr-2" />
              <span>Dream Designs</span>
            </div>
            <div className="flex items-center text-amber-100">
              <FiMapPin className="mr-2" />
              <span>Prime Locations</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Emotional Connection Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        className="py-12 md:py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
          >
            More Than Just Houses -{" "}
            <span className="text-amber-500">Homes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Each of our show homes tells a story - of craftsmanship, attention
            to detail, and the countless memories that will be made within its
            walls.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: <FiHome className="mx-auto" size={24} />,
                title: "Thoughtful Layouts",
                desc: "Designed for real life",
              },
              {
                icon: <FiLayers className="mx-auto" size={24} />,
                title: "Quality Materials",
                desc: "Built to last generations",
              },
              {
                icon: <FiDroplet className="mx-auto" size={24} />,
                title: "Luxury Finishes",
                desc: "Elevate everyday living",
              },
              {
                icon: <FiMapPin className="mx-auto" size={24} />,
                title: "Ideal Locations",
                desc: "Connect to what matters",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg shadow-sm hover:shadow transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="text-amber-500 mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
        className="px-4 sm:px-6 py-8 sm:py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="filter_wrapper bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
              Find Your Perfect Home
            </h3>
            <FilterByCommunity
              community={community}
              setCommunity={setCommunity}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Show Homes Listings */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          >
            {community ? `Homes in ${community}` : "All Available Homes"}
          </motion.h3>
          <FilterShowHomes community={community} />
        </div>
      </motion.section>

      {/* Closing CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 bg-gradient-to-r from-amber-500 to-amber-600"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Find Your Dream Home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Schedule a private tour and experience these homes for yourself.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Book a Tour Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default ShowHome;
