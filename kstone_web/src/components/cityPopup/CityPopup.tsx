"use client";

import { client } from "@/sanity/client";
import React, { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import {
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaGlobeAmericas,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type City = {
  _id: string;
  name: string;
};

const CityPopup: React.FC = () => {
  const { setCity } = useCity();
  const { isCityOpen, setCityOpen } = useCityPopup();
  const [cities, setCities] = useState<City[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    client
      .fetch(`*[_type == "city"]{ _id, name }`)
      .then((data: City[]) => {
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
        setLoading(false);
      });
  }, []);

  const filteredCities = cities?.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isCityOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-gradient-to-br from-dark from-30% via-[#3a3529] to-golden/70 rounded-xl w-full max-w-md mx-auto shadow-2xl border border-golden/40 p-4 sm:p-6 relative overflow-hidden"
            style={{
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-golden/20 rounded-full filter blur-[20px]"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lightyellow/20 rounded-full filter blur-[20px]"></div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-offwhite/80 hover:text-offwhite transition-all duration-200 hover:scale-110"
              onClick={() => setCityOpen(false)}
              aria-label="Close"
            >
              <FaTimes size={18} className="sm:w-5 sm:h-5" />
            </button>

            {/* Header with icon */}
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-golden to-lightyellow rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-lg">
                <FaGlobeAmericas className="text-dark text-xl sm:text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-offwhite mb-1 text-center">
                Choose Your City
              </h2>
              <p className="text-offwhite/80 text-sm sm:text-base text-center">
                Select your location for personalized content
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-offwhite/70 text-sm sm:text-base" />
              </div>
              <input
                type="text"
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-dark/40 text-offwhite placeholder-offwhite/60 text-sm sm:text-base border border-golden/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden transition-all"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Content - Scrollable Area */}
            <div className="relative z-10 flex-1 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-golden border-t-transparent rounded-full animate-spin mb-2 sm:mb-3"></div>
                  <p className="text-offwhite/80 text-sm sm:text-base">
                    Loading cities...
                  </p>
                </div>
              ) : filteredCities && filteredCities.length > 0 ? (
                <ul className="space-y-2 sm:space-y-3 h-full overflow-y-auto pr-1 pb-1">
                  {filteredCities.map((city) => (
                    <motion.li
                      key={city._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        className="w-full py-2 px-3 sm:py-3 sm:px-4 bg-gradient-to-r from-dark/80 via-dark/70 to-dark/60 hover:from-dark/70 hover:via-dark/60 hover:to-dark/50 backdrop-blur-sm border border-golden/30 rounded-lg text-offwhite text-left transition-all duration-200 flex items-center group text-sm sm:text-base"
                        onClick={() => {
                          setCity(city.name);
                          setCityOpen(false);
                        }}
                      >
                        <div className="mr-2 sm:mr-3 p-1 sm:p-1.5 bg-golden/20 group-hover:bg-golden/30 rounded-full transition-all">
                          <FaMapMarkerAlt className="text-lightyellow flex-shrink-0 text-sm sm:text-base" />
                        </div>
                        <span className="truncate">{city.name}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8 h-full">
                  <FaMapMarkerAlt className="text-offwhite/40 text-3xl sm:text-4xl mb-2 sm:mb-3" />
                  <p className="text-offwhite/60 text-center text-sm sm:text-base">
                    {searchTerm
                      ? "No matching cities found"
                      : "No cities available"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-2 sm:mt-3 text-lightyellow hover:text-golden text-xs sm:text-sm"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-offwhite/10 text-center">
              <p className="text-offwhite/50 text-xs sm:text-sm">
                Can&apos;t find your city?{" "}
                <Link
                  href="/contact"
                  className="text-lightyellow hover:text-golden transition-colors"
                  onClick={() => setCityOpen(false)}
                >
                  Contact us
                </Link>
              </p>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
              ul::-webkit-scrollbar {
                width: 4px;
              }
              ul::-webkit-scrollbar-track {
                background: transparent;
              }
              ul::-webkit-scrollbar-thumb {
                background-color: var(--color-golden);
                border-radius: 20px;
                border: 1px solid var(--color-lightyellow);
              }
              @media (min-width: 640px) {
                ul::-webkit-scrollbar {
                  width: 6px;
                }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CityPopup;
