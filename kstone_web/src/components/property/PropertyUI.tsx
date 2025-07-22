/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaHome,
  FaFilePdf,
  FaUtensils,
  FaCouch,
  FaCar,
  FaDoorOpen,
  FaPlane,
  FaSchool,
  FaGolfBall,
  FaTree,
} from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { useCity } from "../../../context/cityContext";
import { useEffect, useState } from "react";
import { Property } from "@/types/propsInterfaces";
import { client } from "@/sanity/client";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import HeroSection from "../heroSection/HeroSection";
import CTA from "../CTA/CTA";
import Link from "next/link";
import { RiUserCommunityFill } from "react-icons/ri";
import ScheduleVisitPopup from "../scheduleVisit/ScheduleVisitPopup";
import { BiPhone } from "react-icons/bi";
import Loader from "../loader/Loader";
import {
  ErrorMessage,
  FeatureCard,
  HR,
  KeyFeatureCard,
  NotFoundMessage,
  PriceTag,
  StatusBadge,
} from "../UI/PropertyUiComponents";
import {
  GiBrickWall,
  GiCeilingLight,
  GiConcreteBag,
  GiDeerTrack,
  GiFloorPolisher,
  GiHomeGarage,
  GiRedCarpet,
  GiStairs,
  GiStonePath,
  GiWoodenDoor,
  GiWoodPile,
} from "react-icons/gi";
import { FiCheckCircle, FiHome, FiStar } from "react-icons/fi";
import {
  MdBalcony,
  MdDoubleArrow,
  MdHeight,
  MdKitchen,
  MdMeetingRoom,
} from "react-icons/md";
import { TbStairsDown } from "react-icons/tb";
import { fadeIn, staggerContainer } from "@/app/lib/motion";

interface PropertyUIProps {
  slug: string;
  propertyState: "preConstruction" | "quickPossession" | "showhome";
}

const ksSingleHome = "/images/ks-singlehome.jpg";

export const PropertyUI = ({ slug, propertyState }: PropertyUIProps) => {
  const { city } = useCity();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchProperty = async () => {
      try {
        const filters = [
          '_type == "property"',
          '!(_id in path("drafts.**"))',
          "propertyState == $propertyState",
          "slug.current == $slug",
        ];

        const params: Record<string, string> = {
          propertyState,
          slug,
        };

        if (city) {
          filters.push("community->city->name == $city");
          params.city = city;
        }

        const query = `*[${filters.join(" && ")}][0]{
          _id,
          houseName,
          propertyState,
          "slug": slug.current,
          houseType,
          "featuredImage": featuredImage.asset->url,
          "city": city->name,
          "community": community->{name},
          shortDescription,
          address,
          province,
          status,
          readyStatus,
          availableStatus,
          oldPrice,
          newPrice,
          "houseGallery": houseGallery[]{
            "url": asset->url,
            "alt": alt
          },
          videoTour,
          "floorPlans": floorPlans[]{
            floor,
            "image": image.asset->url
          },
          garage,
          allFeatures {
            sqft,
            mainHouseSqft,
            basementSqft,
            garageSuiteSqft,
            bedrooms,
            bathrooms,
            kitchen,
            spiceKitchen,
            spiceKitchenTotal,
            fullBath,
            livingRoom,
            bonusRoom,
            bonusRoomTotal,
            openToAbove,
            openToAboveTotal,
            ceilingHeight,
            doubleBasement,
            treatedWoodDeck,
            concretePad,
            compositeDeck,
            vinylDeck,
            rearBalcony,
            rearBalconyTotal,
            frontBalcony,
            featureWalls,
            vinylFlooring,
            tiledFlooring,
            tripleCarGarage,
            doubleCarGarage,
            separateSideEntrance,
            mainFloorFullBedBath,
            rentalGarageSuite,
            parkFacing,
            legalFinishedBasement,
            ownerSuiteBasement,
            sevenBedsFiveBath,
            airportNearby,
            playgroundSchoolsNearby,
            golfNearby,
            schoolNearby,
            walkout,
            partialWalkout,
            regularLot,
            vaultedCeiling,
            indentCeiling,
            ceilingHighCabinets,
            dropCeilings,
            carpetFloor,
            tenFTceilings,
            twentyFTceilings
          },
          additionalFeatures,
          upgrades,
          "floorPlan": floorPlan.asset->url
        }`;

        const data = await client.fetch(query, params, {
          signal: abortController.signal,
        });

        if (isMounted) {
          setProperty(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("Error fetching property:", err);
            setError(
              err instanceof Error
                ? err.message
                : "Failed to load property details"
            );
          }
          setProperty(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchProperty();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [slug, city, propertyState]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!property) {
    return <NotFoundMessage message="Property not found" />;
  }

  console.log(property);

  // Key Feature
  const keyFeatures = [
    // Kitchen Features
    {
      condition: property.allFeatures?.kitchen,
      icon: <MdKitchen className="w-full h-full text-golden" />,
      label: "Gourmet Kitchen",
    },
    {
      condition: property.allFeatures?.spiceKitchen,
      icon: <FaUtensils className="w-full h-full text-golden" />,
      label: "Spice Kitchen",
    },

    // Bathrooms
    {
      condition: property.allFeatures?.fullBath,
      icon: <FaBath className="w-full h-full text-golden" />,
      label: `Full Bath (${property.allFeatures?.fullBath || ""})`,
    },

    // Living Areas
    {
      condition: property.allFeatures?.livingRoom,
      icon: <FaCouch className="w-full h-full text-golden" />,
      label: "Spacious Living Room",
    },
    {
      condition: property.allFeatures?.bonusRoom,
      icon: <MdMeetingRoom className="w-full h-full text-golden" />,
      label: `Bonus Room${property.allFeatures?.bonusRoomTotal ? ` (${property.allFeatures.bonusRoomTotal})` : ""}`,
    },

    // Architectural Features
    {
      condition: property.allFeatures?.openToAbove,
      icon: <MdHeight className="w-full h-full text-golden" />,
      label: `Open to Above${property.allFeatures?.openToAboveTotal ? ` (${property.allFeatures.openToAboveTotal})` : ""}`,
    },
    {
      condition: property.allFeatures?.vaultedCeiling,
      icon: <GiCeilingLight className="w-full h-full text-golden" />,
      label: "Vaulted Ceiling",
    },
    {
      condition: property.allFeatures?.ceilingHeight === "9-9-9",
      icon: <MdHeight className="w-full h-full text-golden" />,
      label: "9-9-9 Ceiling Height",
    },
    {
      condition: property.allFeatures?.tenFTceilings,
      icon: <MdHeight className="w-full h-full text-golden" />,
      label: "10 ft Ceilings",
    },
    {
      condition: property.allFeatures?.twentyFTceilings,
      icon: <MdDoubleArrow className="w-full h-full text-golden" />,
      label: "20 ft Ceilings",
    },

    // Basement Features
    {
      condition: property.allFeatures?.legalFinishedBasement,
      icon: <TbStairsDown className="w-full h-full text-golden" />,
      label: "Legal Finished Basement",
    },
    {
      condition: property.allFeatures?.walkout,
      icon: <GiWoodenDoor className="w-full h-full text-golden" />,
      label: "Walkout Basement",
    },
    {
      condition: property.allFeatures?.partialWalkout,
      icon: <GiStonePath className="w-full h-full text-golden" />,
      label: "Partial Walkout",
    },

    // Outdoor Features
    {
      condition: property.allFeatures?.treatedWoodDeck,
      icon: <GiWoodPile className="w-full h-full text-golden" />,
      label: "Treated Wood Deck",
    },
    {
      condition: property.allFeatures?.concretePad,
      icon: <GiConcreteBag className="w-full h-full text-golden" />,
      label: "Concrete Pad",
    },
    {
      condition: property.allFeatures?.compositeDeck,
      icon: <GiDeerTrack className="w-full h-full text-golden" />,
      label: "Composite Deck",
    },
    {
      condition: property.allFeatures?.rearBalcony,
      icon: <MdBalcony className="w-full h-full text-golden" />,
      label: `Rear Balcony${property.allFeatures?.rearBalconyTotal ? ` (${property.allFeatures.rearBalconyTotal})` : ""}`,
    },
    {
      condition: property.allFeatures?.frontBalcony,
      icon: <MdBalcony className="w-full h-full text-golden" />,
      label: "Front Balcony",
    },

    // Interior Finishes
    {
      condition: property.allFeatures?.featureWalls,
      icon: <GiBrickWall className="w-full h-full text-golden" />,
      label: "Feature Walls",
    },
    {
      condition: property.allFeatures?.vinylFlooring,
      icon: <GiFloorPolisher className="w-full h-full text-golden" />,
      label: "Vinyl Flooring",
    },
    {
      condition: property.allFeatures?.tiledFlooring,
      icon: <GiFloorPolisher className="w-full h-full text-golden" />,
      label: "Tiled Flooring",
    },
    {
      condition: property.allFeatures?.carpetFloor,
      icon: <GiRedCarpet className="w-full h-full text-golden" />,
      label: "Carpet Flooring",
    },

    // Garage & Parking
    {
      condition: property.allFeatures?.doubleCarGarage,
      icon: <FaCar className="w-full h-full text-golden" />,
      label: "Double Car Garage",
    },
    {
      condition: property.allFeatures?.tripleCarGarage,
      icon: <FaCar className="w-full h-full text-golden" />,
      label: "Triple Car Garage",
    },
    {
      condition: property.allFeatures?.separateSideEntrance,
      icon: <FaDoorOpen className="w-full h-full text-golden" />,
      label: "Separate Side Entrance",
    },

    // Location Features
    {
      condition: property.allFeatures?.airportNearby,
      icon: <FaPlane className="w-full h-full text-golden" />,
      label: "Airport Nearby",
    },
    {
      condition: property.allFeatures?.schoolNearby,
      icon: <FaSchool className="w-full h-full text-golden" />,
      label: "School Nearby",
    },
    {
      condition: property.allFeatures?.golfNearby,
      icon: <FaGolfBall className="w-full h-full text-golden" />,
      label: "Golf Nearby",
    },
    {
      condition: property.allFeatures?.parkFacing,
      icon: <FaTree className="w-full h-full text-golden" />,
      label: "Park Facing",
    },
  ].filter((feature) => feature.condition);

  // Main Feature
  const propertyFeatures = [
    {
      icon: <FaRulerCombined className="w-full h-full text-golden" />,
      value: property.allFeatures?.sqft
        ? `${property.allFeatures?.sqft.toLocaleString()}`
        : "—",
      label: "Total SQFT",
    },
    {
      icon: <FiHome className="w-full h-full text-golden" />,
      value: property.allFeatures?.mainHouseSqft,
      label: "Main House SQFT",
    },
    {
      icon: <GiStairs className="w-full h-full text-golden" />,
      value: property.allFeatures?.basementSqft,
      label: "Basement SQFT",
    },

    {
      icon: <GiHomeGarage className="w-full h-full text-golden" />,
      value: property.houseType,
      label: "Garage Suite SQFT",
    },
    {
      icon: <FaBed className="w-full h-full text-golden" />,
      value: property.allFeatures?.bedrooms,
      label: "Total Bedrooms",
    },
    {
      icon: <FaBath className="w-full h-full text-golden" />,
      value: property.allFeatures?.bathrooms,
      label: "Total Bathrooms",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        heading={property.houseName}
        paragraph={`${property.address} ${property.province ? "," + property.province : ""}`}
        imageUrl={ksSingleHome}
      />

      {/* Main Content */}
      <div className="w-full mx-auto px-2 sm:px-4 py-8">
        <div className="main_wrapper p-4 sm:px-8 sm:py-8 border-1 border-dark/30 shadow-sm bg-white">
          {/* Property Header */}
          <div className="overflow-hidden">
            {/* Featured Image with Status and Price */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={property.featuredImage || "/images/placeholder-home.jpg"}
                alt={property.houseName || "Property Image"}
                fill
                className="object-cover"
                priority
              />

              {propertyState === "quickPossession" && (
                <>
                  <StatusBadge status={property.status || ""} />
                  <PriceTag
                    oldPrice={property.oldPrice}
                    newPrice={property.newPrice}
                  />
                </>
              )}
            </div>

            {/* Property Info */}
            <div className="py-4 pb-8  flex flex-col lg:flex-row justify-between lg:items-center gap-4 md:gap-8">
              {/* Property Details - Full width on mobile, flex-1 on desktop */}
              <div className="w-full md:flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {property.houseName}
                </h1>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600 text-base sm:text-lg">
                    <FaHome
                      className="text-golden mr-2 min-w-[20px]"
                      size={18}
                    />
                    <span className="truncate">{property.houseType}</span>
                  </div>

                  {property.garage && (
                    <div className="flex items-center text-gray-600 text-base sm:text-lg">
                      <GiHomeGarage
                        className="text-golden mr-2 min-w-[20px]"
                        size={18}
                      />
                      <span className="truncate">{property.garage}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600 text-base sm:text-lg">
                    <RiUserCommunityFill
                      className="text-golden mr-2 min-w-[20px]"
                      size={18}
                    />
                    <span className="truncate">
                      {property.community?.name}, {city || "N/A"}
                    </span>
                  </div>

                  {property.address && (
                    <div className="flex items-center text-gray-600 text-base sm:text-lg">
                      <FaMapMarkerAlt
                        className="text-golden mr-2 min-w-[20px]"
                        size={18}
                      />
                      <span className="truncate">
                        {property.status === "pending"
                          ? "Coming Soon"
                          : `${property.address}${property.province ? `, ${property.province}` : ""}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[250px]"
              >
                <button
                  onClick={() => setShowPopup(true)}
                  className="flex justify-center items-center gap-2 bg-golden hover:bg-dark text-white font-medium px-2 sm:px-6 py-3 text-sm esm:text-base md:text-lg border-2 border-golden shadow hover:shadow-md transition-all min-h-[48px] w-full sm:w-auto"
                >
                  <BiPhone size={20} className="flex-shrink-0" />
                  <span>Schedule Visit</span>
                </button>

                <Link
                  target="_blank"
                  href={property.floorPlan || ""}
                  className="flex justify-center items-center gap-2 bg-white hover:bg-dark hover:text-white text-dark font-medium px-6 py-3 text-sm esm:text-base md:text-lg border-2 border-dark shadow hover:shadow-md transition-all min-h-[48px] w-full sm:w-auto"
                >
                  <FaFilePdf size={20} className="flex-shrink-0" />
                  <span>Download Brochure</span>
                </Link>
              </motion.div>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-1 esm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
              {propertyFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  label={feature.label}
                  value={feature.value}
                />
              ))}
            </div>
          </div>
          {/* Main Description */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-dark">
                Property Description
              </h2>
              <HR />
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                {property.shortDescription}
              </p>
            </section>
          </div>
          {/*  Key features */}
          <div className="key_features mt-8">
            <h2 className="text-2xl font-bold text-dark">Key Features</h2>
            <HR />
            <div className="grid grid-cols-1 esm:grid-cols-2 md:grid-cols-3 gap-4 py-6 bg-gray-50">
              {keyFeatures.map((feature, index) => (
                <KeyFeatureCard
                  key={index}
                  icon={feature.icon}
                  label={feature.label}
                />
              ))}
            </div>
          </div>
          {/* Image Gallery */}
          <div className="image_gallery mt-8">
            <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
            <HR />
            {property.houseGallery && property.houseGallery.length > 0 && (
              <section className="mb-12 md:px-10 mt-4">
                <ImageCarousel images={property.houseGallery} />
              </section>
            )}
          </div>
          {/* Floor Plans */}
          {property.floorPlans && property.floorPlans.length > 0 && (
            <motion.section
              className="mb-12"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerContainer()}
            >
              <motion.h2
                className="text-2xl font-bold text-gray-900"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Floor Plans
              </motion.h2>

              <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <HR />
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-6 mt-8"
                variants={staggerContainer(0.1, 0.2)}
              >
                {property.floorPlans.map((floor, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm border border-golden hover:shadow-md transition-shadow duration-300"
                    variants={fadeIn("up", "tween", index * 0.1, 0.5)}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-golden mb-3">
                      {floor.floor}
                    </h3>
                    <motion.div
                      className="aspect-[4/3] relative overflow-hidden rounded-md"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={floor.image}
                        alt={`${floor.floor} plan`}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Additional Features */}
          {property.additionalFeatures &&
            property.additionalFeatures.length > 0 && (
              <motion.section
                className="mb-16"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer()}
              >
                <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
                  <h2 className="text-3xl font-bold text-dark mb-2">
                    Additional Features
                  </h2>
                  <HR />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                  variants={staggerContainer(0.1, 0.2)}
                >
                  {property.additionalFeatures?.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6  shadow-sm border border-golden hover:shadow-md transition-all duration-300"
                      variants={fadeIn("up", "tween", index * 0.05, 0.4)}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-golden/10 p-2 rounded-full">
                          <FiCheckCircle className="text-golden w-5 h-5" />
                        </div>
                        <p className="text-gray-700 text-lg font-medium">
                          {feature}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )}

          {/* Upgrades */}
          {property.upgrades && property.upgrades.length > 0 && (
            <motion.section
              className="mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer()}
            >
              <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
                <h2 className="text-3xl font-bold text-dark mb-2">Upgrades</h2>
                <HR />
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                variants={staggerContainer(0.1, 0.2)}
              >
                {property.upgrades?.map((upgrade, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6  shadow-sm border border-golden hover:shadow-md transition-all duration-300 relative overflow-hidden"
                    variants={fadeIn("up", "tween", index * 0.05, 0.4)}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-start gap-3 mt-1">
                      <div className="bg-golden/10 p-2 rounded-full">
                        <FiStar className="text-golden w-5 h-5" />
                      </div>
                      <p className="text-gray-700 text-lg font-medium">
                        {upgrade}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <CTA />

      {/* Schedule Visit Popup */}
      <AnimatePresence>
        {showPopup && (
          <ScheduleVisitPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
