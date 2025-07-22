import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { PropertyUI } from "@/components/property/PropertyUI";
interface ShowHome {
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

  const query = `*[_type == "property" && propertyState == "showhome" && slug.current == $slug][0]{
    houseName,
    houseType,
    "city": city->{ name },
    "community": community->{ name },
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    slug
  }`;

  try {
    const showhome = await client.fetch<ShowHome | null>(query, { slug });


    if (!showhome) {
      return {
        title: "Show Home Not Found",
        description: "The requested show home could not be found.",
      };
    }

    const title = `${showhome.houseName} | ${showhome.community.name}`;
    const description =
      showhome.shortDescription ||
      `Explore the ${showhome.houseName} (${showhome.houseType}) located in ${showhome.community.name}, ${showhome.city?.name || ""}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: showhome.featuredImage ? [{ url: showhome.featuredImage }] : [],
        url: showhome.slug?.current
          ? `/show-homes/${showhome.slug.current}`
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: showhome.featuredImage ? [showhome.featuredImage] : [],
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

export default async function ShowHomeSingle({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="overflow-hidden">
      <PropertyUI propertyState="showhome" slug={slug} />
    </div>
  );
}
