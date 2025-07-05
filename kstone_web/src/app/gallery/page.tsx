import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "@/sanity/client";
import { FiZoomIn } from "react-icons/fi";
import Link from "next/link";

const banner = "/images/ks-gallery.jpg";

const query = groq`
  *[_type == "gallery"][0]{
    _id,
    title,
    images[]{
      altText,
      image{
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
      }
    }
  }
`;

type GalleryImage = {
  altText?: string;
  image?: {
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
  };
};

export default async function Gallery() {
  const gallery = await client.fetch(query);
  const images: GalleryImage[] = gallery?.images ?? [];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src={banner}
          alt="Gallery showcase"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div className="px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                DESIGN GALLERY
              </span>
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Explore our portfolio of exceptional craftsmanship
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Intro */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-4">
            Modern Design Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Browse through our collection of premium properties featuring luxury
            homes, innovative designs, and exceptional craftsmanship that define
            the Kstone Homes experience.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, index) => {
                const dimensions = img.image?.asset?.metadata?.dimensions;
                const aspectRatio = dimensions?.aspectRatio || 4 / 3;

                return (
                  <div
                    key={img.image?.asset?._id || index}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={img.image?.asset?.url || "/images/placeholder.jpg"}
                      alt={img.altText || "Kstone Homes property"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={85}
                      loading={index > 3 ? "lazy" : "eager"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white p-3 bg-black/50 rounded-full">
                        <FiZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Gallery Empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No images available in the gallery at this time.
            </p>
            <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
              Check Back Soon
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Inspired By Our Designs?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Contact us to discuss how we can bring your dream home to life.
          </p>
          <Link href="/contact" className="inline-block bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold shadow-lg transition-colors">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
