"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface ImageCarouselProps {
  images: {
    url: string;
    alt?: string;
  }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHoveringMain, setIsHoveringMain] = useState(false);

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? selectedImage === 0
          ? images.length - 1
          : selectedImage - 1
        : selectedImage === images.length - 1
          ? 0
          : selectedImage + 1;

    setSelectedImage(newIndex);
    scrollToThumbnail(newIndex);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeImage();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showModal) {
        closeImage();
      }
      if (showModal) {
        if (event.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (event.key === "ArrowRight") {
          navigateImage("next");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const scrollToThumbnail = (index: number) => {
    if (containerRef.current) {
      const thumbnail = containerRef.current.children[index] as HTMLElement;
      thumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const openImage = (index: number) => {
    setSelectedImage(index);
    scrollToThumbnail(index);
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setShowModal(false);
    setIsFullscreen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Preview Image */}
      <motion.div
        className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 cursor-pointer shadow-md"
        onClick={openModal}
        onHoverStart={() => setIsHoveringMain(true)}
        onHoverEnd={() => setIsHoveringMain(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].alt || `Image ${selectedImage + 1}`}
          fill
          className="object-cover rounded-lg transition-all duration-300 ease-out"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHoveringMain ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-center bg-golden/90 text-white rounded-full p-3 shadow-lg"
            animate={{
              scale: isHoveringMain ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isHoveringMain ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <FaExpand className="text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Thumbnail Carousel Container */}
      <div className="flex items-center justify-center gap-2 w-full px-2">
        {/* Previous Button */}
        <motion.button
          onClick={() => navigateImage("prev")}
          className="bg-golden text-white p-2 rounded-full shadow-md hover:bg-golden-dark transition-colors cursor-pointer"
          aria-label="Previous image"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronLeft className="text-lg" />
        </motion.button>

        {/* Thumbnail Carousel */}
        <div
          ref={containerRef}
          className="flex-1 flex overflow-x-auto scroll-smooth gap-3 p-2 scrollbar-hide"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative h-20 w-28 md:h-24 md:w-32 rounded-md overflow-hidden cursor-pointer shrink-0 transition-all ${
                selectedImage === index
                  ? "ring-2 ring-golden shadow-md"
                  : "ring-1 ring-gray-200 hover:ring-2 hover:ring-golden/80"
              }`}
              onClick={() => openImage(index)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 128px"
                loading={index > 3 ? "lazy" : "eager"}
              />
              {selectedImage === index && (
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={() => navigateImage("next")}
          className="bg-golden text-white p-2 rounded-full shadow-md hover:bg-golden-dark transition-colors cursor-pointer"
          aria-label="Next image"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronRight className="text-lg" />
        </motion.button>
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              ref={modalRef}
              className={`relative w-full h-full flex items-center justify-center ${
                isFullscreen
                  ? "max-w-none max-h-none"
                  : "max-w-5xl max-h-[90vh]"
              }`}
            >
              {/* Image container */}
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 150 }}
              >
                <Image
                  src={images[selectedImage].url}
                  alt={
                    images[selectedImage].alt ||
                    `Enlarged image ${selectedImage + 1}`
                  }
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Close button */}
              <motion.button
                className="absolute top-8 right-3 text-white hover:text-golden z-50 transition-colors rounded-full bg-black/80 hover:bg-black p-3 cursor-pointer shadow-xl"
                onClick={closeImage}
                aria-label="Close image viewer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaTimes size={24} />
              </motion.button>

              {/* Navigation Arrows */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-golden text-white hover:text-white p-4 rounded-full shadow-xl z-50"
                aria-label="Previous image"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FaChevronLeft size={24} />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-golden text-white hover:text-white p-4 rounded-full shadow-xl z-50"
                aria-label="Next image"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FaChevronRight size={24} />
              </motion.button>

              {/* Fullscreen toggle */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
                className="absolute top-8 left-3 bg-black/70 hover:bg-golden text-white hover:text-white p-3 rounded-full shadow-xl z-50"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {isFullscreen ? (
                  <FaCompress size={20} />
                ) : (
                  <FaExpand size={20} />
                )}
              </motion.button>

              {/* Image Counter */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-golden px-4 py-2 rounded-full text-sm font-medium shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedImage + 1} / {images.length}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
