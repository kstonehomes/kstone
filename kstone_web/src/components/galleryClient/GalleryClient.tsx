// components/GalleryClient.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GalleryImage } from "@/types/propsInterfaces";

export default function GalleryClient({
  galleryItems,
}: {
  galleryItems: GalleryImage[];
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigate = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage((prev) =>
        prev === 0 ? galleryItems.length - 1 : (prev || 0) - 1
      );
    } else {
      setSelectedImage((prev) =>
        (prev || 0) === galleryItems.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      {galleryItems.length > 0 ? (
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {galleryItems.map((item, index) => {
                const dimensions = item.image?.asset?.metadata?.dimensions;
                const aspectRatio = dimensions?.aspectRatio || 4 / 3;

                return (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    style={{ aspectRatio }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={item.image?.asset?.url || "/images/placeholder.jpg"}
                      alt={item.altText || "Kstone Homes property"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 className="text-md font-light">
                          View Image
                        </h4>
                      </div>
                      <div className="text-white p-3 bg-black/50 rounded-full backdrop-blur-sm">
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

      {/* Lightbox/Popup */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className={`absolute ${
              isMobile ? "top-2 right-2" : "top-4 right-4"
            } text-white hover:text-amber-400 transition-colors cursor-pointer z-[1001]`}
          >
            <FiX className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
          </button>

          <button
            onClick={() => navigate("prev")}
            className={`absolute ${
              isMobile ? "left-2" : "left-4"
            } text-white hover:text-amber-400 transition-colors p-2 z-[1001]`}
          >
            <FiChevronLeft className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
          </button>

          <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
            <Image
              src={
                galleryItems[selectedImage]?.image?.asset?.url ||
                "/images/placeholder.jpg"
              }
              alt={
                galleryItems[selectedImage]?.altText || "Kstone Homes property"
              }
              fill
              className="object-contain"
              quality={100}
            />
          </div>

          <button
            onClick={() => navigate("next")}
            className={`absolute ${
              isMobile ? "right-2" : "right-4"
            } text-white hover:text-amber-400 transition-colors p-2 cursor-pointer z-[1001]`}
          >
            <FiChevronRight className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
          </button>
        </div>
      )}
    </>
  );
}
