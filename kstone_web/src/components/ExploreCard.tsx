"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight} from "lucide-react";
import { Community } from "@/types/propsInterfaces";

interface CommunityProp {
  item: Community;
}
 
export default function ExploreCard({item}:CommunityProp) {

  return (
           
              <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                // delay: item._id * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.1, ease: "easeInOut" }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200"
            >
               <Link href={`/communities/${item.slug}`}>
              <div className="relative h-[500px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-600"
                  style={{
                    backgroundImage: `url(${item.featuredImage})`,
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />


                {/* Content */}
                <div className="absolute z-40 inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    // transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-display text-2xl text-white font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-white font-semibold text-sm mb-4 group-hover:text-white/95 transition-colors duration-300">
                      {item.city?.name}
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
      
  );
}