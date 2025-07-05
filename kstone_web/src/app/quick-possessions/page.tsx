"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiCalendar,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import FilterPossesions from "@/components/quickPossessions/FilterPossesions";

const QuickPossessions = () => {
  const [community, setCommunity] = useState<string>("");
  const quickPossessionCover = "/images/ks-quickpossession.jpg";

  return (
    <div className="quick_possession_wrapper overflow-hidden">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${quickPossessionCover})`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70 z-10" />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-amber-400/10 blur-xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              QUICK POSSESSIONS
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Move into your dream home sooner than you imagined
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            Why Choose Quick Possession?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHome className="w-8 h-8" />,
                title: "Immediate Move-In",
                description:
                  "Skip the waiting period and settle into your new home right away",
                color: "text-amber-500",
              },
              {
                icon: <FiCalendar className="w-8 h-8" />,
                title: "Save Time",
                description:
                  "Avoid construction delays and move in on your schedule",
                color: "text-blue-500",
              },
              {
                icon: <FiCheckCircle className="w-8 h-8" />,
                title: "Fully Completed",
                description:
                  "Move into a finished home with all amenities ready to enjoy",
                color: "text-emerald-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div
                  className={`${item.color} mb-4 p-3 rounded-full bg-opacity-10`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FilterByCommunity
              community={community}
              setCommunity={setCommunity}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Results Section */}
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
            {community
              ? `Available Now in ${community}`
              : "Homes Ready for Immediate Possession"}
          </motion.h3>
          <FilterPossesions community={community} />
        </div>
      </motion.section>

      {/* CTA Section */}
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
            Ready to Move In?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Schedule a viewing today and experience your future home in person
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            Book a Viewing <FiArrowRight />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default QuickPossessions;
