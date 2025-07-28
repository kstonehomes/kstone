import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FaBath,
  FaMapMarkerAlt,
  FaPlay,
  FaArrowLeft,
  FaHome,
  FaCheckCircle,
  FaRulerCombined,
  FaClock,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import ModalButton from "@/components/client/modal-button";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import { MdAddHomeWork } from "react-icons/md";
import { ShowHomeSingleProps } from "@/types/propsInterfaces";
import KeyFeatures from "@/components/KeyFeatures";
import PropGallery from "@/components/PropGallery";
import { IoIosBed } from "react-icons/io";
import { GiHomeGarage } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const home = await client.fetch<ShowHomeSingleProps | null>(
    `*[_type == "showHome" && slug.current == $slug][0]{
      houseModel,
      houseType,
      "community": community->{ name },
      "featuredImage": featuredImage.asset->url
    }`,
    { slug }
  );

  if (!home) {
    return {
      title: "Show Home Not Found",
    };
  }

  return {
    title: `${home.houseModel} | ${home.community.name}`,
    description: `Explore the ${home.houseModel} (${home.houseType}) located in ${home.community.name}.`,
    openGraph: {
      images: [home.featuredImage],
    },
  };
}

function getEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    const videoId = url.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default async function ShowHomeSingle({ params }: Params) {
  const { slug } = await params;

  const home = await client.fetch<ShowHomeSingleProps | null>(
    `*[_type == "showHome" && slug.current == $slug][0]{
  _id,
  houseModel,
  houseType,
  address,
  "community": community->{ name },
  province,
  propertySize,
  garage,
  status,
  readyStatus,
  availableStatus,
  shortDescription,
  videoTour,
  upgrades,
  additionalFeatures,
  allFeatures {
  mainHouseSqft,
  sqft,
  bedrooms,
  bathrooms,
  kitchen,
  spiceKitchen,
  spiceKitchenTotal,
  fullBath,
  livingRoom,
  bonusRoom,
  openToAbove,
  openToAboveTotal,
  ceilingHeight,
  doubleBasement,
  basementSqft,
  garageSuiteSqft,
  treatedWoodDeck,
  concretePad,
  compositeDeck,
  vinylDeck,
  rearBalcony,
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
  twentyFTceilings,
  enSuites
  },
  houseGallery[]{ "url": asset->url },
  "featuredImage": featuredImage.asset->url,
  "floorPlanPdf": floorPlan.asset->url,
  "floorPlanFileName": floorPlan.asset->originalFilename,
  "slug": slug.current
}`,
    { slug }
  );

  if (!home) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gray-100  flex items-center justify-center">
            <FaMapMarkerAlt className="w-10 h-10 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-secondary">
              Home not found
            </h1>
            <p className="font-base text-gray-600">
              The show home you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
          <Link
            href="/show-homes"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3  transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Show Homes
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(home.videoTour);

  // Helper function to get garage display text
  // const getGarageText = (garage: string) => {
  //   const garageMap: { [key: string]: string } = {
  //     'none': 'No Garage',
  //     'single': 'Single Car',
  //     'double': 'Double Car',
  //     'triple': 'Triple Car',
  //     'quadruple': 'Quadruple Car',
  //     'more-than-4': '4+ Car'
  //   };
  //   return garageMap[garage] || garage;
  // };

  const statusConfig = {
    ready: {
      color: "bg-emerald-500",
      text:
        "Move in Ready " + `${home.readyStatus ? `${home.readyStatus}` : ""}`,
      icon: "🟢",
    },
    pending: { color: "bg-amber-500", text: "Pending ", icon: "🟡" },
    sold: { color: "bg-red-500", text: "Sold Out", icon: "🔴" },
    available: {
      color: "bg-blue-500",
      text:
        "Available " +
        `${home.availableStatus ? `${home.availableStatus}` : ""}`,
      icon: "🔵",
    },
  } as const;

  const defaultStatus = { color: "bg-gray-500", text: "undefined", icon: "⚪" };
  const currentStatus =
    home.status && home.status in statusConfig
      ? statusConfig[home.status as keyof typeof statusConfig]
      : defaultStatus;

  return (
    <main className="">
      <PageHeader
        title={home.houseModel}
        subtitle={home.community?.name || "Show Home"}
        backgroundImage="/images/ks-showhomes.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "showhomes", href: "/show-homes" },
          { label: home.houseModel },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray/10">
        <div className="container">
          <div className="bg-white shadow-2xl- border border-gray-100 overflow-hidden">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/8] overflow-hidden">
              <Image
                src={home.featuredImage}
                alt={home.houseModel}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
              {/* Status Badge */}
              {currentStatus.text !== "undefined" && (
                <div
                  className={`absolute top-0 left-0 ${currentStatus.color} text-white px-4 py-2 md:px-8 md:py-5 font-display font-bold text-xl md:text-3xl shadow-lg backdrop-blur-sm`}
                >
                  {currentStatus.icon} {currentStatus.text}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-display font-bold text-secondary mb-2">
                    {home.houseModel}
                  </h1>
                  <h3 className="title text-xl font-medium mb-1 text-gray-500">
                    {home.houseType}
                  </h3>
                  <div className="flex items-center text-lg font-base text-gray-500 mb-1">
                    {home.community?.name}, {home.city?.name}
                  </div>
                  {home.address && (
                    <div className="flex items-center text-lg font-base text-gray-500">
                      <FaMapMarkerAlt className="w-5 h-5 text-primary mr-2" />
                      {home.address}
                    </div>
                  )}
                </div>

                <div className="t-6 lg:mt-0 flex gap-4 md:flex-row flex-col">
                  <ModalButton
                    source={`${home.houseModel}, ${home.community?.name}, ${home.city?.name}`}
                    label="Schedule Visit"
                  />
                  <DownloadPDFButton
                    href={home.floorPlanPdf}
                    fileName={home.floorPlanFileName}
                  />
                </div>
              </div>

              {/* Main Specs Grid */}
              <div className="property-features-grid gap-3 md:gap-5">
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <FaRulerCombined className="" />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.sqft}
                    </div>
                    <div className="property-features-label">Total SQFT</div>
                  </div>
                </div>
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <FaHome className="" />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.mainHouseSqft}
                    </div>
                    <div className="property-features-label">
                      Main House SQFT
                    </div>
                  </div>
                </div>
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <TbRulerMeasure className="" />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.basementSqft}
                    </div>
                    <div className="property-features-label">Basement SQFT</div>
                  </div>
                </div>
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <GiHomeGarage />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.garageSuiteSqft}
                    </div>
                    <div className="property-features-label">
                      Garage Suite SQFT
                    </div>
                  </div>
                </div>
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <IoIosBed className="" />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.bedrooms}
                    </div>
                    <div className="property-features-label">
                      Total Bedrooms
                    </div>
                  </div>
                </div>
                <div className="property-features-col">
                  <div className="property-features-icon">
                    <FaBath className="" />
                  </div>
                  <div className="property-features-content">
                    <div className="property-features-title">
                      {home.allFeatures.bathrooms}
                    </div>
                    <div className="property-features-label">
                      Total Bathrooms
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div className="py-5">
                <div className="">
                  <h3 className="title">
                    Property Description
                    <div className="line"></div>
                  </h3>
                  <p className="content">
                    {home.shortDescription ||
                      `Experience luxury living in the ${home.houseModel}, perfectly designed for modern families seeking comfort and elegance.`}
                  </p>
                </div>
              </div>

              {/* Availability */}
              {currentStatus.text !== "undefined" && (
                <div className="bg-primary-bg border border-primary rounded-2xl p-6 text-center mb-10">
                  <FaClock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="font-display font-bold text-2xl text-primary mb-1">
                    {currentStatus.text}
                  </div>
                </div>
              )}
              <div className="features">
                {/* Key Features */}
                <div className="property-key-features mb-10">
                  <h3 className="title text-2xl">
                    Key Features <div className="line"></div>
                  </h3>
                  <KeyFeatures features={home.allFeatures} />
                </div>
                {/* Additional Features Grid */}
                {home.additionalFeatures && (
                  <div className="additional-features">
                    <h3 className="title text-2xl">
                      Additional Features <div className="line"></div>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                      {home.additionalFeatures?.map(
                        (feature: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-center justify-start gap-4 p-4 bg-primary-bg shadow-sm border border-primary hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="text-xl text-primary bg-primary rounded-full p-1">
                              <FaCheckCircle className="text-white/70" />
                            </div>
                            <div className="font-medium font-display text-base text-secondary">
                              {feature}
                            </div>
                          </div>
                        )
                      ) || (
                        <div className="text-secondary font-base italic">
                          Features information not available.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Upgrades Features Grid */}
                {home.upgrades && home.upgrades.length > 0 && (
                  <div className="upgrades py-6">
                    <h3 className="title text-2xl">
                      Upgrades Available<div className="line"></div>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                      {home.upgrades?.map((upgrades: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-start gap-4 p-4 bg-primary-bg shadow-sm border border-primary hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="text-xl text-white bg-primary rounded-full p-1">
                            <MdAddHomeWork className="" />
                          </div>
                          <div className="font-medium font-display text-base text-secondary">
                            {upgrades}
                          </div>
                        </div>
                      )) || (
                        <div className="text-secondary font-base italic">
                          Features information not available.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Gallery Section */}
              {home.houseGallery && home.houseGallery.length > 0 && (
                <PropGallery images={home.houseGallery} title="Home Gallery" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      {embedUrl && (
        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3  mb-6">
                <FaPlay className="w-4 h-4 text-primary" />
                <span className="font-display font-semibold text-primary uppercase tracking-wide">
                  Virtual Experience
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-secondary mb-4">
                Take a Virtual Tour
              </h2>
              <p className="font-base text-xl text-gray-600 max-w-2xl mx-auto">
                Experience every detail of this beautiful home from the comfort
                of your current location
              </p>
            </div>

            {/* Video Player */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative bg-white  shadow-2xl overflow-hidden p-2">
                <div className="aspect-video w-full  overflow-hidden relative group">
                  <iframe
                    src={embedUrl}
                    title="Virtual Home Tour"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20  blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10  blur-xl"></div>
            </div>

            {/* Video Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "4K Quality",
                  description:
                    "Crystal clear video tour in stunning 4K resolution",
                },
                {
                  title: "Room by Room",
                  description:
                    "Detailed walkthrough of every space and feature",
                },
                {
                  title: "Professional Guide",
                  description:
                    "Expert commentary highlighting key selling points",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10  flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-primary "></div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-secondary">
                    {feature.title}
                  </h3>
                  <p className="font-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
