"use client";

import { client } from "@/sanity/client";
import React, { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { FaTimes, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

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
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [allowedCityNames, setAllowedCityNames] = useState<string[] | null>(null);

  console.log(filteredCities)

useEffect(() => {
  // Fetch allowed city names from showCity document
  client
    .fetch(`*[_type == "showCity"][0]{ chooseCityToShow->{ name } }`)
    .then((data: { chooseCityToShow?: { name: string } }) => {
      if (data && data.chooseCityToShow?.name) {
        setAllowedCityNames([data.chooseCityToShow.name]);
      } else {
        setAllowedCityNames([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching allowed city names:", error);
      setAllowedCityNames([]);
    });
}, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "city"]{ _id, name }`)
      .then((data: City[]) => {
        setCities(data);
        setFilteredCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
        setFilteredCities([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (cities) {
      let filtered = cities;
      if (allowedCityNames) {
        filtered = filtered.filter(city => allowedCityNames.includes(city.name));
      }
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm, cities, allowedCityNames]);

  const handleCitySelect = (cityName: string) => {
    setCity(cityName);
    setCityOpen(false);
    setSearchTerm("");
  };

  const handleClose = () => {
    setCityOpen(false);
    setSearchTerm("");
  };

  if (!isCityOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-2xl border border-white/20 relative overflow-hidden animate-in zoom-in-95 duration-300 ease-out">
        
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 relative">
          <div className="absolute inset-0 bg-primary/50"></div>
          
          {/* Close Button */}
          <button
            className="absolute z-50 top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 p-2 rounded-full backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close"
          >
            <FaTimes size={16} />
          </button>

          {/* Header Content */}
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <IoLocationOutline className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Choose Your City
            </h2>
            <p className="text-white/90 text-sm">
              Select your location to get personalized content
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Search Bar */}
          {!loading && cities && cities.length > 0 && (
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading cities...</p>
            </div>
          ) : filteredCities.length > 0 ? (
            <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar">
              {filteredCities.map((city, index) => (
                <div
                  key={city._id}
                  className="animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    className="group w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-700 hover:text-gray-900 text-left transition-all duration-200 font-medium flex items-center space-x-3 hover:shadow-md hover:-translate-y-0.5"
                    onClick={() => handleCitySelect(city.name)}
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="flex-1">{city.name}</span>
                    <FaMapMarkerAlt className="text-gray-400 group-hover:text-purple-500 transition-colors duration-200 text-sm" />
                  </button>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-600 font-medium mb-2">No cities found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search term</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoLocationOutline className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-600 font-medium">No cities available</p>
            </div>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
      </div>
    </div>
  );
};

export default CityPopup;