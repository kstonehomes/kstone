"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { client } from "@/sanity/client";
import { useCity } from "../../../context/cityContext";
import PageHeader from "@/components/PageHeader";

import FloorPlansCard from "@/components/FloorPlansCard";
import { FloorPlansProps } from "@/types/propsInterfaces";

const FloorPlans = () => {
  const { city } = useCity();
  const [data, setData] = useState<FloorPlansProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = [
      '_type == "floorPlans"',
      '!(_id in path("drafts.**"))',
    ];
    const params: Record<string, string> = {};


    if (city) {
      // filters.push("community->city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      floorPlanModel,
      floorPlanName,
      additionalFeatures,
      status,
      readyStatus,
      availableStatus,
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
        ceilingIndents,
        dropCeilings
      },
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: FloorPlansProps[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching project layout:", error);
        setData([]);
        setLoading(false);
      });
  }, [city]);


  

  return (
    <>
      <main id="floor-plans">
        {/* Hero Header */}
        <PageHeader
          title="floor plans"
          subtitle=""
          backgroundImage="/images/ks-quickpossession.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "floor plans" }
          ]}
        />
        {/* Results Section */}
        <section className="">
          <div className="container">
            {/* <div className="filter mb-10">
             <FilterByCommunity community={community} setCommunity={setCommunity} />
            </div> */}
            {/* Debug: {console.log(data)} */}
            {/* To display data as JSON, uncomment the next line */}
            {/* <h2>{JSON.stringify(data[0].projectModel)}</h2> */}
            <div className="list">
            {loading ? (
            <Loader />
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {data.map((item) => (
                <FloorPlansCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-secondary dark:text-gray-300 py-16">
              <p className="text-lg font-display">
                No project layout available for{" "}
                <span className="font-semibold text-primary">
                  { city || "this selection"}
                </span>
              </p>
            </div>
          )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FloorPlans;