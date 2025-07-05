import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FilterShowHomes from "@/components/showHomes/FilterShowHomes";
import FilterPossesions from "@/components/quickPossessions/FilterPossesions";
import { FiMapPin, FiHome, FiCalendar } from "react-icons/fi";

interface Community {
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) {
    return {
      title: "Community Not Found",
    };
  }

  return {
    title: `${community.name} | ${community.city.name}`,
    description: community.description,
    openGraph: {
      images: [community.featuredImage],
    },
  };
}

export default async function CommunityPage({ params }: Params) {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <section className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 group">
        <Image
          src={community.featuredImage}
          alt={community.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {community.name}
            </h1>
            <div className="flex items-center text-amber-300 font-medium text-xl">
              <FiMapPin className="mr-2" />
              <span>{community.city.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="mb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
              About {community.name}
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {community.description}
            </p>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="space-y-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
            Available Properties
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Property Types Cards */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Show Homes Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-full mr-4">
                  <FiHome className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Show Homes</h3>
              </div>
            </div>
            <div className="p-6">
              <FilterShowHomes community={community.name} />
            </div>
          </div>

          {/* Quick Possessions Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-full mr-4">
                  <FiCalendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Quick Possessions
                </h3>
              </div>
            </div>
            <div className="p-6">
              <FilterPossesions community={community.name} />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interested in {community.name}?
          </h3>
          <p className="text-amber-100 text-lg mb-6 max-w-2xl mx-auto">
            Contact our team to learn more about available properties and
            community amenities.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
          >
            Schedule a Visit
          </a>
        </div>
      </section>
    </div>
  );
}
