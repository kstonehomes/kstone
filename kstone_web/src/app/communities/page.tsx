"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { Community } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const Communities = () => {
  const background = "/images/ks-communities.jpg";
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
    } | order(name asc)`;

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
    <div className="communities_wrapper overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-[60vh] bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />

        <motion.div
          className="relative z-20 text-center px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              OUR COMMUNITIES
            </span>
          </h1>
          <motion.p
            className="text-xl text-amber-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Discover the perfect neighborhood for your dream home
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Community Grid Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-16 flex justify-center">
              <Loader />
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.map((community) => (
                <motion.div
                  key={community._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  {/* Community Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={community.featuredImage}
                      alt={community.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-sm">
                      <p className="text-xs font-medium text-gray-800 dark:text-white flex items-center">
                        <FiMapPin className="mr-1 text-amber-500" />
                        {community.city?.name}
                      </p>
                    </div>
                  </div>

                  {/* Community Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {community.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {community.description}
                    </p>

                    <Link
                      href={`/communities/${community.slug}`}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-800 dark:text-white">
                        View Community
                      </span>
                      <FiArrowRight className="text-amber-500" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="text-6xl mb-4">🏘️</div>
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  No Communities Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {city
                    ? `We don't currently have communities in ${city}`
                    : "No communities available"}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 bg-gradient-to-r from-amber-500 to-amber-600"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&#39;t Find Your Perfect Community?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Our team can help you discover upcoming neighborhoods and exclusive
            opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
          >
            Get Personalized Assistance
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Communities;
