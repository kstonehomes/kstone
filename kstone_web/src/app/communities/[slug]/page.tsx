import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CommunityContent from "@/components/community/Community";

interface Community {
  _id: string;
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
  slug?: {
    current: string;
  };
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params; 
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name},
      slug
    }`,
    { slug }
  );

  if (!community) {
    return {
      title: "Community Not Found",
      description: "The requested community could not be found.",
    };
  }

  return {
    title: `${community.name} | ${community.city.name}`,
    description: community.description,
    openGraph: {
      title: `${community.name} | ${community.city.name}`,
      description: community.description,
      images: community.featuredImage ? [{ url: community.featuredImage }] : [],
      url: community.slug?.current
        ? `/communities/${community.slug.current}`
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${community.name} | ${community.city.name}`,
      description: community.description,
      images: community.featuredImage ? [community.featuredImage] : [],
    },
  };
}

export default async function CommunityPage({ params }: Params) {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      _id,
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name},
      slug
    }`,
    { slug }
  );

  if (!community) return notFound();

  return <CommunityContent community={community} />;
}
