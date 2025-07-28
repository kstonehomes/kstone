import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FaBath, FaRulerCombined } from "react-icons/fa6";
import { FaCheckCircle, FaClock, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import ModalButton from "@/components/client/modal-button";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import { MdAddHomeWork } from "react-icons/md";
import { FloorPlan, FloorPlansProps } from "@/types/propsInterfaces";
import KeyFeatures from "@/components/KeyFeatures";
import { IoIosBed } from "react-icons/io";
import { GiHomeGarage } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { hasKeyFeature } from "@/helperFunction/hasKeyFeature";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const floorPlanData = await client.fetch<FloorPlansProps | null>(
    `*[_type == "floorPlans" && slug.current == $slug][0]{
      floorPlanModel,
      floorPlanName,
      shortDescription,
      "featuredImage": featuredImage.asset->url
    }`,
    { slug }
  );

  if (!floorPlanData) {
    return {
      title: "Floor Plans Not Found",
    };
  }

  return {
    title: `${floorPlanData.floorPlanModel}`,
    description:
      floorPlanData.shortDescription ??
      `Explore the ${floorPlanData.floorPlanModel}.`,
    openGraph: {
      images: [floorPlanData.featuredImage],
    },
  };
}

export default async function FloorPlanSingle({ params }: Params) {
  const { slug } = await params;

  const floorPlanData = await client.fetch<FloorPlansProps | null>(
    `*[_type == "floorPlans" && slug.current == $slug][0]{
      _id,
      floorPlanModel,
      floorPlanName,
      "featuredImage": featuredImage.asset->url,
      shortDescription,
      garage,
      status,
      readyStatus,
      availableStatus,
      address,
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
          enSuites
  },
      floorPlans[]{ floor, "image": image.asset->url },
      "slug": slug.current,
      "floorPlanPdf": floorPlan.asset->url,
      "floorPlanFileName": floorPlan.asset->originalFilename
    }`,
    { slug }
  );

  console.log("Floor Plan Data:", floorPlanData);

  if (!floorPlanData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-secondary mb-4">
            Home Not Found
          </h1>
          <p className="text-secondary/70 font-base mb-8">
            The home you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/quick-possessions"
            className="bg-primary text-white px-6 py-3  font-display font-semibold hover:bg-secondary transition-colors duration-300"
          >
            View All Homes
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    ready: {
      color: "bg-emerald-500",
      text:
        "Move in Ready " +
        `${floorPlanData.readyStatus ? `${floorPlanData.readyStatus}` : ""}`,
      icon: "🟢",
    },
    pending: { color: "bg-amber-500", text: "Pending ", icon: "🟡" },
    sold: { color: "bg-red-500", text: "Sold Out", icon: "🔴" },
    available: {
      color: "bg-blue-500",
      text:
        "Available " +
        `${floorPlanData.availableStatus ? `${floorPlanData.availableStatus}` : ""}`,
      icon: "🔵",
    },
  } as const;

  const defaultStatus = { color: "bg-gray-500", text: "undefined", icon: "⚪" };
  const currentStatus =
    floorPlanData.status && floorPlanData.status in statusConfig
      ? statusConfig[floorPlanData.status as keyof typeof statusConfig]
      : defaultStatus;

  return (
    <main className="bg-white">
      <PageHeader
        title={floorPlanData.floorPlanName}
        subtitle={floorPlanData.floorPlanModel}
        backgroundImage="/images/ks-quickpossession.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Floor plans", href: "/floor-plans" },
          { label: floorPlanData.floorPlanName },
        ]}
      />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray/10">
        <div className="container">
          <div className="bg-white shadow-2xl- border border-gray-100 overflow-hidden">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/8] overflow-hidden">
              <Image
                src={floorPlanData.featuredImage}
                alt={floorPlanData.floorPlanModel}
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
                    {floorPlanData.floorPlanName}
                  </h1>
                  <h3 className="title text-xl font-medium mb-1 text-gray-500">
                    {floorPlanData.floorPlanModel}
                  </h3>
                  <div className="flex items-center text-lg font-base text-gray-500 mb-1">
                    {floorPlanData.community?.name}
                  </div>
                  {floorPlanData.address && (
                    <div className="flex items-center text-lg font-base text-gray-500">
                      <FaMapMarkerAlt className="w-5 h-5 text-primary mr-2" />
                      {floorPlanData.address}
                    </div>
                  )}
                </div>

                <div className="t-6 lg:mt-0 flex gap-4 md:flex-row flex-col">
                  <ModalButton
                    source={`${floorPlanData.floorPlanModel}, ${floorPlanData.community?.name}`}
                    label="Schedule Visit"
                  />
                  <DownloadPDFButton
                    href={floorPlanData.floorPlanPdf}
                    fileName={floorPlanData.floorPlanFileName}
                  />
                </div>
              </div>

              {/* Main Specs Grid */}
              {floorPlanData.allFeatures && (
                <div className="property-features-grid gap-3 md:gap-5">
                  <div className="property-features-col">
                    <div className="property-features-icon">
                      <FaRulerCombined className="" />
                    </div>
                    <div className="property-features-content">
                      <div className="property-features-title">
                        {floorPlanData.allFeatures?.sqft.toLocaleString()}
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
                        {floorPlanData.allFeatures?.mainHouseSqft.toLocaleString()}
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
                        {floorPlanData.allFeatures?.basementSqft}
                      </div>
                      <div className="property-features-label">
                        Basement SQFT
                      </div>
                    </div>
                  </div>
                  <div className="property-features-col">
                    <div className="property-features-icon">
                      <GiHomeGarage />
                    </div>
                    <div className="property-features-content">
                      <div className="property-features-title">
                        {floorPlanData.allFeatures?.garageSuiteSqft}
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
                        {floorPlanData.allFeatures?.bedrooms}
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
                        {floorPlanData.allFeatures?.bathrooms}
                      </div>
                      <div className="property-features-label">
                        Total Bathrooms
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Description & Features */}
              {floorPlanData.shortDescription && (
                <div className="py-5">
                  <div className="">
                    <h3 className="title">
                      Property Description
                      <div className="line"></div>
                    </h3>
                    <p className="content">
                      {floorPlanData.shortDescription ||
                        `Experience luxury living in the ${floorPlanData.floorPlanModel}, perfectly designed for modern families seeking comfort and elegance.`}
                    </p>
                  </div>
                </div>
              )}

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
                {floorPlanData.allFeatures &&
                  hasKeyFeature(floorPlanData.allFeatures) && (
                    <div className="property-key-features mb-10">
                      <h3 className="title text-2xl">
                        Key Features <div className="line"></div>
                      </h3>
                      <KeyFeatures features={floorPlanData.allFeatures} />
                    </div>
                  )}

                {/* Additional Features Grid */}
                {floorPlanData.additionalFeatures && (
                  <div className="additional-features">
                    <h3 className="title text-2xl">
                      Additional Features <div className="line"></div>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                      {floorPlanData.additionalFeatures?.map(
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
                {floorPlanData.upgrades &&
                  floorPlanData.upgrades.length > 0 && (
                    <div className="upgrades py-6">
                      <h3 className="title text-2xl">
                        Upgrades Available<div className="line"></div>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        {floorPlanData.upgrades?.map(
                          (upgrades: string, i: number) => (
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
                          )
                        ) || (
                          <div className="text-secondary font-base italic">
                            Features information not available.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
              {/* Gallery Section
              {floorPlanData.houseGallery && floorPlanData.houseGallery.length > 0 && (
                <PropGallery images={floorPlanData.houseGallery} title="Home Gallery" />
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}

      {/* Floor Plans */}
      {floorPlanData.floorPlans && floorPlanData.floorPlans.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-secondary mb-4">
                Floor Plans
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto "></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {floorPlanData.floorPlans.map((floor: FloorPlan, i: number) => (
                <div key={i} className="group">
                  <h3 className="text-xl font-display font-bold text-secondary mb-4 text-center capitalize">
                    {floor.floor}
                  </h3>
                  <div className="relative rounded-2xl h-[600px] overflow-hidden shadow-xl border border-gray/20 group-hover:shadow-2xl transition-shadow duration-500">
                    <Image
                      src={floor.image}
                      alt={`${floor.floor} plan`}
                      fill
                      layout="fill"
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
