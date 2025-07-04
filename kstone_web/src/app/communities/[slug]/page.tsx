import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FilterShowHomes from "@/components/showHomes/FilterShowHomes";
import FilterPossesions from "@/components/quickPossessions/FilterPossesions";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-10">
        <Image
          src={community.featuredImage}
          alt={community.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {community.name}
            </h1>
            <p className="text-xl text-amber-300 font-medium">
              {community.city.name}
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="mb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-semibold text-amber-600 mb-6">
            About {community.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {community.description}
          </p>
        </div>
      </section>

      {/* Listings Section */}
      <section className="space-y-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-600 mb-4">
            Available Properties
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Show Homes */}
        <div className="bg-gray-300 dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Show Homes
              </h3>
              <div className="w-16 h-1 bg-amber-500 mt-2"></div>
            </div>
          </div>
          <FilterShowHomes community={community.name} />
        </div>

        {/* Quick Possessions */}
        <div className="bg-gray-300 dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Quick Possessions
              </h3>
              <div className="w-16 h-1 bg-amber-500 mt-2"></div>
            </div>
          </div>
          <FilterPossesions community={community.name} />
        </div>
      </section>
    </div>
  );
}
