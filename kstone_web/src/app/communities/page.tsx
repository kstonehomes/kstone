"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { Community } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import PageHeader from "@/components/PageHeader";
import ExploreCard from "@/components/ExploreCard";

const Communities = () => {
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = ['_type == "community"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (city) {
      filters.push("city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      name,
      "city": city->{name},
      description,
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: Community[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
        setLoading(false);
      });
  }, [city]);

  return (
    <main className="">
      {/* Hero Section */}
      <PageHeader
        title="Communities"
        subtitle=""
        backgroundImage="/images/ks-communities.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Communities" }]}
      />

      {/* Loader */}

      <section>
        <div className="container">
          <h2 className="title text-center justify-center mb-10">
            Explore Communities <div className="line mx-auto"></div>
          </h2>
          {loading ? (
            <div className="py-16 bg-white">
              <Loader />
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {data.map((item) => (
                <ExploreCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-300 py-10 bg-white dark:bg-gray-900">
              No communities available for{" "}
              <span className="font-semibold">{city || "this location"}</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Communities;
