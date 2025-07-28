"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Home, Eye, Image, Users } from "lucide-react";

export default function ExploreHomes() {
  const exploreItems = [
    {
      item: "Quick Possessions",
      description: "Move-in ready homes",
      image: "/images/ks-quickpossession.jpg",
      link: "/quick-possessions",
      icon: Home,
    },
    {
      item: "Show Homes",
      description: "Experience luxury living",
      image: "/images/ks-showhomes.jpg",
      link: "/showhomes",
      icon: Eye,
    },
    {
      item: "Gallery",
      description: "Visual showcase",
      image: "/images/ks-gallery.jpg",
      link: "/gallery",
      icon: Image,
    },
    {
      item: "Floor Plans",
      description: "Vibrant neighborhoods",
      image: "/images/ks-floor-plans.jpg",
      link: "/floor-plans",
      icon: Users,
    },
    {
      item: "Pre-Construction",
      description: "Vibrant neighborhoods",
      image: "/images/ks-pre-const.jpg",
      link: "/pre-construction",
      icon: Users,
    },
    {
      item: "Community",
      description: "Vibrant neighborhoods",
      image: "/images/ks-communities.jpg",
      link: "/communities",
      icon: Users,
    },
  ];

  return (
    <section id="explore-homes" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="title">
            Explore Your Dream Home
          </h2>
          <p className="content">
            Discover the perfect home that matches your lifestyle and aspirations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4_ gap-8">
          {exploreItems.map(({ item, description, image, link, icon: Icon }, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.1, ease: "easeInOut" }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200"
            >
              <Link  href={link} >
              <div className="relative h-[500px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-600"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-offwhite" />
                </div>

                {/* Content */}
                <div className="absolute z-40 inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-display text-2xl text-white font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                      {item}
                    </h3>
                    <p className="text-white font-semibold text-sm mb-4 group-hover:text-white/95 transition-colors duration-300">
                      {description}
                    </p>
                    
                    <button className="group-hover:scale-110 transition-transform cursor-pointer inline-flex items-center group-hover:bg-offwhite/40 py-2 px-5">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-2 text-offwhite hover:text-white font-semibold"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </button>
                  </motion.div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}