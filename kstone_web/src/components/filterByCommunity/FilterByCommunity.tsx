import { client } from "@/sanity/client";
import { FilterByCommunityProps } from "@/types/propsInterfaces";
import { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiMapPin } from "react-icons/fi";

interface CommunityData {
  _id: string;
  name: string;
  city: string;
}

const FilterByCommunity = ({
  community,
  setCommunity,
}: FilterByCommunityProps) => {
  const { city } = useCity();
  const [data, setData] = useState<CommunityData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!city) {
      setData([]);
      return;
    }

    setIsLoading(true);
    client
      .fetch(
        `*[_type == "community" && city->name == $city]{
          _id,
          name,
          "city": city->name
        } | order(name asc)`,
        { city }
      )
      .then((data: CommunityData[]) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
        setIsLoading(false);
      });
  }, [city]);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-4 sm:mb-6">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover Your Perfect Neighborhood
        </motion.h2>
        <motion.div
          className="mt-2 sm:mt-3 w-16 sm:w-20 mx-auto border-t-2 border-amber-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.p
          className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Select a community to explore available homes
        </motion.p>
      </div>

      <motion.div
        className="relative"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <FiMapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-amber-500 z-10 text-lg" />
          <select
            id="community-select"
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg sm:rounded-xl px-10 sm:px-12 py-2 sm:py-3 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer transition-all shadow-sm hover:shadow-md"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            disabled={isLoading}
          >
            <option value="">All Communities in {city}</option>
            {data.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-lg sm:rounded-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-amber-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {community && (
          <motion.div
            className="mt-3 sm:mt-4 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              Showing homes in: <strong>{community}</strong>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterByCommunity;
