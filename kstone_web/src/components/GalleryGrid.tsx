"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No images found in the gallery.
      </div>
    );
  }

  // Convert images to lightbox format
  const slides = images
    .filter(image => image.asset?.url)
    .map((image) => ({
      src: image.asset!.url,
      alt: image.altText || 'Gallery image',
      width: image.asset?.metadata?.dimensions?.width || 1200,
      height: image.asset?.metadata?.dimensions?.height || 800,
    }));

  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <motion.div 
        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {images.map((image, imageIndex) => {
          const imageUrl = image.asset?.url;
          const altText = image.altText || `Gallery image ${imageIndex + 1}`;
          
          if (!imageUrl) return null;

          return (
            <motion.div
              key={image.asset?._id || imageIndex}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => openLightbox(imageIndex)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: imageIndex * 0.1,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={imageUrl}
                  alt={altText}
                  width={image.asset?.metadata?.dimensions?.width || 400}
                  height={image.asset?.metadata?.dimensions?.height || 300}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">View Image</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        animation={{ fade: 300, swipe: 500 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.90)" },
          slide: { padding: "20px" },
        }}
      />
    </div>
  );
}