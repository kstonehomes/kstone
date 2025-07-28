"use client";
import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface GalleryImage {
  url: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

const PropGallery = ({ images, title = "Gallery" }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const VISIBLE_THUMBNAILS = 5;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextMainImage = () => {
    setMainImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevMainImage = () => {
    setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextThumbnails = () => {
    if (thumbnailStartIndex + VISIBLE_THUMBNAILS < images.length) {
      setThumbnailStartIndex(prev => prev + 1);
    }
  };

  const prevThumbnails = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(prev => prev - 1);
    }
  };

  const selectThumbnail = (index: number) => {
    setMainImageIndex(index);
  };

  if (!images || images.length === 0) return null;

  const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailStartIndex + VISIBLE_THUMBNAILS);

  return (
    <>
      <section className="py-16 bg-white">
        <div className=" mx-auto p-0 md:px-6">
          <div className="flex justify-center ">
            <h3 className="title">
              {title}
              <div className="line"></div>
            </h3>
          </div>

          {/* Main Featured Image with Navigation */}
          <div className="mb-8 relative group">
            <div className="relative w-full aspect-[16/9]  overflow-hidden shadow-xl cursor-pointer" onClick={() => openLightbox(mainImageIndex)}>
              <Image
                src={images[mainImageIndex].url}
                alt="Featured gallery image"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaExpand className="w-5 h-5 text-secondary" />
              </div>
            </div>

            {/* Main Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevMainImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 transition-all duration-300 hover:scale-110 opacity-0_ group-hover:opacity-100"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMainImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 transition-all duration-300 hover:scale-110 opacity-0_ group-hover:opacity-100"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Row with Navigation */}
          {images.length > 1 && (
            <div className="relative">
              {/* Thumbnail Navigation Buttons */}
              {thumbnailStartIndex > 0 && (
                <button
                  onClick={prevThumbnails}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-primary shadow-lg hover:shadow-xl p-2 md:p-3 transition-all duration-300 hover:scale-110"
                >
                  <FaChevronLeft className="w-4 h-4 text-white" />
                </button>
              )}
              
              {thumbnailStartIndex + VISIBLE_THUMBNAILS < images.length && (
                <button
                  onClick={nextThumbnails}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-primary shadow-lg hover:shadow-xl p-2 md:p-3 transition-all duration-300 hover:scale-110"
                >
                  <FaChevronRight className="w-4 h-4 text-white" />
                </button>
              )}

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-4 px-8">
                {visibleThumbnails.map((image, index) => {
                  const actualIndex = thumbnailStartIndex + index;
                  const isActive = actualIndex === mainImageIndex;
                  
                  return (
                    <div
                      key={actualIndex}
                      className={`group cursor-pointer relative aspect-square  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                        isActive ? 'ring-4 ring-secondary ring-opacity-50' : ''
                      }`}
                      onClick={() => selectThumbnail(actualIndex)}
                    >
                      <Image
                        src={image.url}
                        alt={`Gallery image ${actualIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}></div>
                      <div className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <FaExpand className="w-3 h-3 text-secondary" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Thumbnail Counter */}
              <div className="text-center mt-4 text-sm text-gray-500">
                Showing {thumbnailStartIndex + 1}-{Math.min(thumbnailStartIndex + VISIBLE_THUMBNAILS, images.length)} of {images.length} images
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-secondary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-primary backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 transition-all duration-300 hover:scale-110"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 z-10 bg-primary backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 transition-all duration-300 hover:scale-110 hover:translate-x-1"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-1 z-10 bg-primary backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 transition-all duration-300 hover:scale-110 hover:-translate-x-1"
                >
                  <FaChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full max-h-[80vh] rounded-2xl overflow-hidden">
              <Image
                src={images[currentIndex].url}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 font-display font-semibold">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropGallery;