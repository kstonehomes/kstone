"use client";
import { useState } from "react";
import { motion } from "motion/react";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import HeroSection from "@/components/heroSection/HeroSection";
import CTA from "@/components/CTA/CTA";
import PropertyCard from "@/components/propertyCard/PropertyCard";

const PreConstruction = () => {
  const [community, setCommunity] = useState<string>("");
  const preConstruction = "/images/ks-preconstruction.jpg";

  return (
    <div className="quick_possession_wrapper overflow-hidden">
      {/* Hero section */}
      <HeroSection
        heading="Pre-Construction"
        paragraph="Move into your dream home sooner than you imagined"
        imageUrl={preConstruction}
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

      {/* Results Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white px-4 md:px-8 pb-16"
      >
        <div className="w-full mx-auto">
          {/* <FilterPossesions community={community} /> */}
          <PropertyCard
            community={community}
            propertyState={"preConstruction"}
            propertyRef={"pre-construction"}
          />

        </div>
      </motion.section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default PreConstruction;
