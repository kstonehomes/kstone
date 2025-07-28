"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import ShowhomesCard from "@/components/ShowhomesCard";
import PageHeader from "@/components/PageHeader";
import { ShowHomeProps } from "@/types/propsInterfaces";

const ShowHome = () => {
  const { city } = useCity();
  const [community, setCommunity] = useState<string>("");
  const [data, setData] = useState<ShowHomeProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = ['_type == "showHome"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (community) {
      filters.push("community->name == $community");
      params.community = community;
    }

    if (city) {
      filters.push("community->city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      houseModel,
      houseType,
      shortDescription,
      address,
      "community": community->{ name },
      province,
      propertySize,
      status,
       readyStatus,
      availableStatus,
     allFeatures {
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
  twentyFTceilings
        },
        additionalFeatures,
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: ShowHomeProps[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching filtered show homes:", error);
        setData([]);
        setLoading(false);
      });
  }, [city, community]);

  return (
    <main className="">
      <PageHeader
        title="showhomes"
        subtitle="Explore our stunning collection of luxury homes and architectural masterpieces"
        backgroundImage="/images/ks-showhomes.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "showhomes" }]}
      />
      <section className="">
        <div className="container">
          <div className="filter mb-10">
            <FilterByCommunity
              community={community}
              setCommunity={setCommunity}
            />
          </div>
          <div className="list">
            {loading ? (
              <Loader />
            ) : data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
                {data.map((item) => (
                  <ShowhomesCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center text-secondary dark:text-gray-300 py-16">
                <p className="text-lg font-display">
                  No quick possessions available for{" "}
                  <span className="font-semibold text-primary">
                    {community || city || "this selection"}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowHome;
