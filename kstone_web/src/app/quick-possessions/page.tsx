"use client";

import { useEffect, useState } from "react";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import Loader from "@/components/loader/Loader";
import QuickPossessionCard from "@/components/QuickPossessionCard";
import { client } from "@/sanity/client";
import { QuickPossession } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";
import PageHeader from "@/components/PageHeader";

const QuickPossessions = () => {
  const { city } = useCity();
  const [community, setCommunity] = useState<string>("");
  const [data, setData] = useState<QuickPossession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = [
      '_type == "quickPossession"',
      '!(_id in path("drafts.**"))',
    ];
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
      "community": community->{ name },
      oldPrice,
      newPrice,
      "featuredImage": featuredImage.asset->url,
      status,
      address,
      readyStatus,
      availableStatus,
      allFeatures {
        sqft,
        bedrooms,
        bathrooms,
      },
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: QuickPossession[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching quick possessions:", error);
        setData([]);
        setLoading(false);
      });
  }, [community, city]);


  return (
    <>
      <main id="quick-possession">
        {/* Hero Header */}
        <PageHeader
          title="quick possessions"
          subtitle="Explore our stunning collection of luxury homes and architectural masterpieces"
          backgroundImage="/images/ks-quickpossession.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "quick possessions" }
          ]}
        />
        {/* Results Section */}
        <section className="">
          <div className="container">
            <div className="filter mb-10">
             <FilterByCommunity community={community} setCommunity={setCommunity} />
            </div>
            <div className="list">
            {loading ? (
            <Loader />
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {data.map((item) => (
                <QuickPossessionCard key={item._id} item={item} />
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
    </>
  );
};

export default QuickPossessions;