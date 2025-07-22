import { client } from "@/sanity/client";
import type { Metadata } from "next";

import { PropertyUI } from "@/components/property/PropertyUI";
interface QuickPossessionData {
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

  const query = `*[_type == "property" && propertyState == "quickPossession" && slug.current == $slug][0]{
    houseName,
    houseType,
    "city": city->{ name },
    "community": community->{ name },
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    slug
  }`;

  try {
    const quickPossession = await client.fetch<QuickPossessionData | null>(query, {
      slug,
    });


    if (!quickPossession) {
      return {
        title: "Quick Possession Not Found",
        description: "The requested Quick Possession could not be found.",
      };
    }

    const title = `${quickPossession.houseName} | ${quickPossession.community.name}`;
    const description =
      quickPossession.shortDescription ||
      `Explore the ${quickPossession.houseName} (${quickPossession.houseType}) located in ${quickPossession.community.name}, ${quickPossession.city?.name || ""}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: quickPossession.featuredImage ? [{ url: quickPossession.featuredImage }] : [],
        url: quickPossession.slug?.current
          ? `/show-homes/${quickPossession.slug.current}`
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: quickPossession.featuredImage ? [quickPossession.featuredImage] : [],
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

export default async function QuickPossessionPage({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="overflow-hidden">
      <PropertyUI propertyState="quickPossession" slug={slug} />
    </div>
  );
}
