import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

const query = groq`
  *[_type == "gallery"][0]{
    _id,
    title,
    images[]{
      altText,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      hotspot,
      crop
    }
  }
`;

type GalleryImage = {
  altText?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  hotspot?: string;
  crop?: string;
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Gallery() {
  const gallery = await client.fetch(query);
  const images: GalleryImage[] = gallery?.images ?? [];
  

  return (
    <main className="">
      {/* Banner Section */}
      <PageHeader
        title="gallery"
        subtitle=""
        backgroundImage="/images/ks-gallery.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "gallery" }]}
      />

      <section className="">
        <div className="container">
          <div className="text-center max-w-5xl mx-auto mb-5">
            <h2 className="title mb-5">Modern Design Gallery</h2>
            <p className="content">
              Explore our stunning portfolio of premium Kstone Homes properties.
              Discover high-quality visuals that showcase our luxury residences,
              sophisticated design choices, and the outstanding craftsmanship
              that define the Kstone Homes lifestyle.
            </p>
          </div>

          <div>
            <GalleryGrid images={images} />
          </div>
        </div>
      </section>
    </main>
  );
}