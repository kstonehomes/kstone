import { client } from "@/sanity/client";
import type { Metadata } from "next";

import { PropertyUI } from "@/components/property/PropertyUI";
interface PreConstructionData {
  _id: string;
  houseName: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  shortDescription: string;
  featuredImage: string;
  slug?: {
    current: string;
  };
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const query = `*[_type == "property" && propertyState == "preConstruction" && slug.current == $slug][0]{
    houseName,
    houseType,
    "city": city->{ name },
    "community": community->{ name },
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    slug
  }`;

  try {
    const preConstruction = await client.fetch<PreConstructionData | null>(
      query,
      {
        slug,
      }
    );

    if (!preConstruction) {
      return {
        title: "Quick Possession Not Found",
        description: "The requested Quick Possession could not be found.",
      };
    }

    const title = `${preConstruction.houseName} | ${preConstruction.community.name}`;
    const description =
      preConstruction.shortDescription ||
      `Explore the ${preConstruction.houseName} (${preConstruction.houseType}) located in ${preConstruction.community.name}, ${preConstruction.city?.name || ""}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: preConstruction.featuredImage
          ? [{ url: preConstruction.featuredImage }]
          : [],
        url: preConstruction.slug?.current
          ? `/show-homes/${preConstruction.slug.current}`
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: preConstruction.featuredImage
          ? [preConstruction.featuredImage]
          : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Show Home",
      description: "Explore our show homes",
    };
  }
}

export default async function PreConstructions({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="overflow-hidden">
      <PropertyUI propertyState="preConstruction" slug={slug} />
    </div>
  );
}
