import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { PropertyUI } from "@/components/property/PropertyUI";

interface ShowHome {
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
  const home = await client.fetch<ShowHome | null>(
    `*[_type == "property" && propertyState == showhome && slug.current == ${slug}][0]{
      houseModel,
      houseType,
      "community": community->{ name },
      "featuredImage": featuredImage.asset->url
    }`,
    { slug }
  );

  if (!home) {
    return {
      title: "Show Home Not Found",
    };
  }

  return {
    title: `${home.houseModel} | ${home.community.name}`,
    description: `Explore the ${home.houseModel} (${home.houseType}) located in ${home.community.name}.`,
    openGraph: {
      images: [home.featuredImage],
    },
  };
}

export default async function ShowHomeSingle({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="overflow-hidden">
      <PropertyUI propertyState="showhome" slug={slug} />
    </div>
  );
}
