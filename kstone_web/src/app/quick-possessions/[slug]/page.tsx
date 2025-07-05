import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import Carousel from "@/components/carousel/Carousel";
import type { Metadata } from "next";
import {
  FiArrowLeft,
  FiHome,
  FiLayers,
  FiMapPin,
  FiDroplet,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import { FaPencilRuler } from "react-icons/fa";

interface FloorPlan {
  floor: string;
  image: string;
}

interface QuickPossessionDetail {
  _id: string;
  houseModel: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  sqft: number;
  beds: number;
  baths: number;
  oldPrice: number;
  newPrice: number;
  featuredImage: string;
  status: "ready" | "pending" | "sold";
  availability?: number;
  houseGallery?: { url: string }[];
  creativeTitle?: string;
  shortDescription?: string;
  keyFeatures?: string[];
  floorPlans?: FloorPlan[];
  slug: string;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const possession = await client.fetch<QuickPossessionDetail | null>(
    `*[_type == "quickPossession" && slug.current == $slug][0]{
      houseModel,
      "city": city->{name},
      "community": community->{name},
      shortDescription,
      "featuredImage": featuredImage.asset->url
    }`,
    { slug }
  );

  if (!possession) {
    return {
      title: "Quick Possession Not Found",
    };
  }

  return {
    title: `${possession.houseModel} | ${possession.community.name}`,
    description:
      possession.shortDescription ??
      `Explore the ${possession.houseModel} in ${possession.community.name}.`,
    openGraph: {
      images: [possession.featuredImage],
    },
  };
}

export default async function QuickPossessionPage({ params }: Params) {
  const { slug } = await params;

  const possession = await client.fetch<QuickPossessionDetail | null>(
    `*[_type == "quickPossession" && slug.current == $slug][0]{
      _id,
      houseModel,
      houseType,
      "city": city->{name},
      "community": community->{name},
      sqft,
      beds,
      baths,
      oldPrice,
      newPrice,
      "featuredImage": featuredImage.asset->url,
      status,
      availability,
      houseGallery[]{ "url": asset->url },
      creativeTitle,
      shortDescription,
      keyFeatures,
      floorPlans[]{ floor, "image": image.asset->url },
      "slug": slug.current
    }`,
    { slug }
  );

  if (!possession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Home Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The property you&#39;re looking for doesn&#39;t exist or may have been
            removed.
          </p>
          <Link
            href="/quick-possessions"
            className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Quick Possessions
          </Link>
        </div>
      </div>
    );
  }

  // Status configuration
  const statusConfig = {
    ready: {
      text: "Ready Now",
      color: "bg-green-600 text-white",
      icon: <FiCheckCircle className="mr-1" />,
    },
    pending: {
      text: possession.availability
        ? `Ready in ${possession.availability} days`
        : "Coming Soon",
      color: "bg-amber-500 text-white",
      icon: <FiCalendar className="mr-1" />,
    },
    sold: {
      text: "Sold",
      color: "bg-red-600 text-white",
      icon: <FiCheckCircle className="mr-1" />,
    },
  };

  return (
    <div className="text-gray-900 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-20">
          <Link
            href="/quick-possessions"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-6 transition-colors group"
          >
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Quick Possessions
          </Link>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-600 transition-all hover:shadow-3xl">
            {/* Image with gradient overlay */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={possession.featuredImage}
                alt={possession.houseModel}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className={`${statusConfig[possession.status].color} px-3 py-1.5 rounded-full text-sm font-medium flex items-center shadow-md`}
                >
                  {statusConfig[possession.status].icon}
                  <span className="ml-1">
                    {statusConfig[possession.status].text}
                  </span>
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Title and Location */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {possession.houseModel}
                </h1>
                <div className="flex items-center text-amber-600 dark:text-amber-400 font-medium mt-2">
                  <FiMapPin className="mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {possession.community?.name}, {possession.city?.name}
                  </span>
                </div>
              </div>

              {/* Features Grid - Enhanced */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  {
                    icon: <FiHome className="w-5 h-5" />,
                    label: "Type",
                    value: possession.houseType,
                  },
                  {
                    icon: <FaPencilRuler className="w-5 h-5" />,
                    label: "Size",
                    value: `${possession.sqft.toLocaleString()} sqft`,
                  },
                  {
                    icon: <FiLayers className="w-5 h-5" />,
                    label: "Beds",
                    value: possession.beds,
                  },
                  {
                    icon: <FiDroplet className="w-5 h-5" />,
                    label: "Baths",
                    value: possession.baths,
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg flex items-center gap-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-500"
                  >
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-full text-amber-500">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {feature.label}
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {feature.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${possession.newPrice.toLocaleString()}
                  </span>
                  {possession.oldPrice && (
                    <span className="text-lg line-through text-gray-500 dark:text-gray-400">
                      ${possession.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg gap-2"
                >
                  Inquire Now
                  <FiArrowLeft className="transform rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {Array.isArray(possession.houseGallery) &&
        possession.houseGallery.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                Property Gallery
              </h2>
              <Carousel images={possession.houseGallery} />
            </div>
          </section>
        )}

      {/* Description + Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:flex md:gap-12 items-start">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              About This Home
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {possession.shortDescription}
            </p>
          </div>

          <div className="md:w-1/2 bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {possession.keyFeatures?.map((feature: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="text-amber-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      {Array.isArray(possession.floorPlans) &&
        possession.floorPlans.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white text-center">
                Floor Plans
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {possession.floorPlans.map((floor: FloorPlan, i: number) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {floor.floor}
                      </h3>
                      <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                        <Image
                          src={floor.image}
                          alt={`${floor.floor} plan`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make It Yours?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Contact our team today to schedule a viewing or get more information
            about this property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Contact Agent
            </Link>
            <Link
              href="/quick-possessions"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Other Homes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
