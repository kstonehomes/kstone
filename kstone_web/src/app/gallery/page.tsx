
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import HeroSection from "@/components/heroSection/HeroSection";
import CTA from "@/components/CTA/CTA";
import GalleryClient from "@/components/galleryClient/GalleryClient";
const ksGallery = "/images/ks-gallery.jpg";

const query = groq`
  *[_type == "gallery"] {
    _id,
    title,
    image {
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
      }
    },
    altText,
    "slug": slug.current
  }
`;

export default async function GalleryPage() {
  const galleryItems = await client.fetch(query);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <HeroSection
        heading="Design Gallery"
        paragraph="Explore our portfolio of exceptional craftsmanship"
        imageUrl={ksGallery}
      />

      {/* Gallery Intro */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-golden dark:text-amber-400 mb-4">
            Modern Design Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Browse through our collection of premium properties featuring luxury
            homes, innovative designs, and exceptional craftsmanship that define
            the Kstone Homes experience.
          </p>
        </div>
      </section>

      {/* Client-side interactive gallery */}
      <GalleryClient galleryItems={galleryItems} />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
