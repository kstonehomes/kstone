import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaRulerCombined, FaArrowRight } from "react-icons/fa6";
import {  FloorPlansProps } from "@/types/propsInterfaces";
import { FaMapMarkerAlt } from "react-icons/fa";
interface ProjectLayoutCardProps {
  item: FloorPlansProps;
}

  const colorStatus = {
    ready: "bg-emerald-500",
    pending: "bg-amber-500",
    sold: "bg-red-500",
    available: "bg-blue-500",
  };

const FloorPlansCard = ({ item }: ProjectLayoutCardProps) => {


  return (
    <Link href={`/floor-plans/${item.slug}`} className="group relative bg-primary overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 transform ">
      {/* Image Container */}
      <div className="relative w-full aspect-[5/4] overflow-hidden">
        <Image
          src={item.featuredImage || "/images/placeholder-home.jpg"}
          alt={item.floorPlanModel}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Subtle Overlay */} 
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
  {/* Status Badge */}
        {item.status && (
        <div
          className={`absolute top-0 left-0 px-7 py-3 text-lg font-display font-medium text-white shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300 ${
            colorStatus[item.status as keyof typeof colorStatus]
          }`}
        >
          {item.status === "ready" && item.readyStatus
            ? <>{item.status.toUpperCase()} <span className="font-bold">{item.readyStatus}</span> </>
            : item.status?.toUpperCase()}
        </div>

        )}


        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="p-6 relative bg-white h-full">
        {/* Title Section */}
        <div className="space-y-1">
          <h3 className="text-2xl font-display font-bold text-secondary group-hover:text-primary transition-colors duration-300 leading-tight">
            {item.floorPlanModel}
          </h3>
          <p className="font-base text-gray-600 text-sm">
            <span className="font-medium hidden">Type:</span> {item.floorPlanModel}
          </p>
          {/* <p className="text-base font-base text-gray-600 font-medium flex items-center mb-1">
            <FaMapLocation className="mr-1 size-4 text-primary" />
            {item.community.name}
          </p> */}
          
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray/30 my-4">
          <div className="text-center group/feature">
            <div className="flex items-center justify-center gap-2 text-secondary group-hover/feature:text-primary transition-colors duration-300">
              <FaBed className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-lg">{item.allFeatures?.bedrooms}</span>
            </div>
            <span className="text-sm font-normal text-gray-500 capitalize">Beds</span>
          </div>
          
          <div className="text-center group/feature border-l border-r border-gray/30">
            <div className="flex items-center justify-center gap-2 text-secondary group-hover/feature:text-primary transition-colors duration-300">
              <FaBath className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-lg">{item.allFeatures?.bathrooms}</span>
            </div>
            <span className="text-sm font-normal text-gray-500 capitalize">Baths</span>
          </div>
          
          <div className="text-center group/feature">
            <div className="flex items-center justify-center gap-2 text-secondary group-hover/feature:text-primary transition-colors duration-300">
              <FaRulerCombined className="w-5 h-5 text-primary" />
              {/* <span className="font-display font-bold text-lg">{Math.round(item.sqft / 1000)}K</span> */}
              <span className="font-display font-bold text-lg">{item.allFeatures?.sqft}</span>
            </div>
            <span className="text-sm font-normal text-gray-500 capitalize">Total SQFT</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex  justify-between items-center gap-5">
           <div>
            { item.address &&(
            <p className="text-sm font-base text-gray-500 flex items-center">
              <FaMapMarkerAlt className="mr-1 size-4 text-primary" />
              {item.address}
            </p>
          )}
           </div>

          <div>{/* View Details Button */}
          <button
            className=" group/link flex items-center gap-2 px-5 py-3 bg-secondary hover:bg-primary text-white  transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="font-display font-semibold text-sm">View Details</span>
            <FaArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
          </button></div>
        </div>

        {/* Animated Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary/70  to-primary group-hover:w-full transition-all duration-700 ease-out" />
      </div>

      {/* Subtle Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-primary/60 group-hover:border-t-primary/70 transition-all duration-500" />
    </Link>
  );
};

export default FloorPlansCard;