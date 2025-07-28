import React from "react";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

interface ChooseCityButtonProps {
  selectedCity?: string;
  onClick: () => void;
  scrolled?: boolean;
}

const ChooseCityButton: React.FC<ChooseCityButtonProps> = ({ 
  selectedCity, 
  onClick, 
  scrolled = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 font-display font-medium transition-all duration-300 border hover:scale-105 ${
        scrolled 
          ? "bg-white text-secondary-dark border-gray-200 hover:border-primary hover:text-primary shadow-sm" 
          : "bg-white/10 text-offwhite border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
      }`}
    >
      <FaMapMarkerAlt 
        size={14} 
        className={scrolled ? "text-primary" : "text-offwhite"} 
      />
      <span className="text-sm">
        {selectedCity || "Choose City"}
      </span>
      <FaChevronDown 
        size={12} 
        className={`transition-transform duration-200 ${
          scrolled ? "text-secondary-dark" : "text-offwhite/80"
        }`} 
      />
    </button>
  );
};

export default ChooseCityButton;