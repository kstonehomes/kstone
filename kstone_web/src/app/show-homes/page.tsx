"use client";
import { useState } from "react";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { motion } from "framer-motion";
import HeroSection from "@/components/heroSection/HeroSection";
import PropertyCard from "@/components/propertyCard/PropertyCard";
import CTA from "@/components/CTA/CTA";


const showHomeBanner = "/images/ks-showhomes.jpg";

const ShowHome = () => {
  const [community, setCommunity] = useState<string>("");

  return (
    <div className="bg-white show_homes_wrapper overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        heading="Show Homes"
        paragraph="Walk through our beautifully designed homes and imagine your future"
        imageUrl={showHomeBanner}
      />

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 py-12 bg-white"
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

      {/* Show Homes Listings */}
      <div className="w-full mx-auto px-4 sm:px-8 pb-8">
        <PropertyCard
          community={community}
          propertyState={"showhome"}
          propertyRef={"show-homes"}
        />
      </div>

      {/* Closing CTA */}
      <CTA />
    </div>
  );
};

export default ShowHome;
