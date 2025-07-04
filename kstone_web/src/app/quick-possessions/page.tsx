"use client";

import { useState } from "react";

import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import FilterPossesions from "@/components/quickPossessions/FilterPossesions";

const QuickPossessions = () => {
  const [community, setCommunity] = useState<string>("");

  const quickPossessionCover = "/images/ks-quickpossession.jpg";

  return (
    <div className="quick_possession_wrapper">
      {/* Hero Header */}
      <div
        className="relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
        style={{
          backgroundImage: `url(${quickPossessionCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide drop-shadow-[6px_2px_6px_rgba(0,0,0,0.6)]">
            QUICK POSSESSIONS
          </h1>
        </div>
      </div>

      {/* Filter Component */}
      <div className="filter_wrapper">
        <FilterByCommunity community={community} setCommunity={setCommunity} />
      </div>

      {/* Results Section */}
      <div className="px-4 py-10 bg-white dark:bg-gray-900">
        <FilterPossesions community={community} />
      </div>
    </div>
  );
};

export default QuickPossessions;
