"use client";
import CTA from "@/components/CTA/CTA";
import { FeatureCard } from "@/components/UI/PropertyUiComponents";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

export default function Home() {
  const exploreItems = [
    {
      item: "Gallery",
      image: "/images/ks-gallery.jpg",
      link: "/gallery",
      description: "Explore our stunning home designs and finishes",
    },
    {
      item: "Pre Construction",
      image: "/images/ks-preconstruction.jpg",
      link: "/pre-construction",
      description: "Customize your dream home from the ground up",
    },
    {
      item: "Quick Possessions",
      image: "/images/ks-quickpossession.jpg",
      link: "/quick-possessions",
      description: "Move into your perfect home today",
    },
    {
      item: "Show Homes",
      image: "/images/ks-showhomes.jpg",
      link: "/show-homes",
      description: "Experience our quality firsthand",
    },
    {
      item: "Community",
      image: "/images/ks-communities.jpg",
      link: "/communities",
      description: "Discover our premium neighborhoods",
    },
  ];

  const testimonialData = [
    {
      icon: <LuBuilding2 className="w-full h-full text-golden" />,
      value: "200+",
      label: "Project Completed",
    },
    {
      icon: <FaUsers className="w-full h-full text-golden" />,
      value: "3000+",
      label: "Happy Families",
    },
    {
      icon: <FaMapMarkerAlt className="w-full h-full text-golden" />,
      value: "15+",
      label: "Locations",
    },
    {
      icon: <SlCalender className="w-full h-full text-golden" />,
      value: "10+",
      label: "Years Experience",
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Section - Enhanced Visibility */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background Image with Reduced Overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/ks-home-banner.jpg"
            alt="Modern home exterior"
            fill
            className="object-cover brightness-90" // Added brightness adjustment
            priority
            quality={100} // Increased quality
            sizes="100vw"
          />
          {/* Lighter overlay for better image visibility */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-full bg-black/30 backdrop-blur-sm" 
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Crafting <span className="text-golden">Exceptional</span> Living
              Spaces
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl">
              Where innovative design meets unparalleled craftsmanship to create
              homes that inspire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quick-possessions"
                className="px-8 py-4 bg-golden hover:bg-amber-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
              >
                Begin Your Journey
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/20 font-medium rounded-lg flex items-center gap-2 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce w-8 h-14 rounded-full border-2 border-white flex justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-golden text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
              Your Home, Your Story
            </h2>
            <div className="w-24 h-1 bg-golden mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto">
              At Kstone Homes, we believe that exceptional living starts with
              purposeful design and a deep respect for how people truly live.
              Each of our homes is more than just bricks and beams — it&apos;s a
              canvas for life&apos;s everyday moments, crafted with care,
              precision, and a vision for the future.
            </p>
          </div>

          {/* Testimonial Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {testimonialData.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Explore Our Portfolio
            </h2>
            <div className="w-24 h-1 bg-golden mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Discover the exceptional quality and design that sets our homes
              apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exploreItems.map(({ item, image, link, description }, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={image}
                    alt={item}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{item}</h3>
                  <p className="text-white/90 mb-4">{description}</p>
                  <Link
                    href={link}
                    className="text-offwhite px-4 py-2 bg-golden hover:bg-dark font-medium flex items-center gap-2 w-fit transition-colors duration-300 rounded-lg"
                  >
                    Explore
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
