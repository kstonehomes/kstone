"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import CTA from "@/components/CTA/CTA";
import PropertyCard from "@/components/propertyCard/PropertyCard";
import HeroSection from "@/components/heroSection/HeroSection";

const quickPossession = "/images/ks-quickpossession.jpg";

const QuickPossessions = () => {
  const [community, setCommunity] = useState<string>("");

  return (
    <div className="quick_possession_wrapper bg-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        heading="Quick Possessions"
        paragraph="Move into your dream home sooner than you imagined"
        imageUrl={quickPossession}
      />

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 py-12"
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

      {/* Quick Possessions Listing */}
      <div className="w-full mx-auto px-4 sm:px-8 pb-8">
        <PropertyCard
          community={community}
          propertyState={"quickPossession"}
          propertyRef={"quick-possessions"}
        />
      </div>

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default QuickPossessions;
