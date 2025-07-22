import { client } from "@/sanity/client";
import type { Metadata } from "next";

import { PropertyUI } from "@/components/property/PropertyUI";
interface preConstructionDetails {
  _id: string;
  houseModel: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  shortDescription: string;
  featuredImage: string;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const possession = await client.fetch<preConstructionDetails | null>(
    `*[_type == "property" && propertyState == preConstruction && slug.current == ${slug}][0]{
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
      title: "Pre-construction Not Found",
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

export default async function PreConstructions({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="overflow-hidden">
      <PropertyUI propertyState="preConstruction" slug={slug} />
    </div>
  );
}
