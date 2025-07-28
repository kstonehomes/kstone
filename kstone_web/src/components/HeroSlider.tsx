"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

interface SlideData {
  id: number;
  type: "image" | "video";
  background: string;
  subtitle: string;
  title: string;
  actionButton: {
    text: string;
    href: string;
  };
}

const slidesData: SlideData[] = [
  {
    id: 1,
    type: "image",
    background: "images/ks-hero.jpg",
    subtitle: "Premium living spaces",
    title: "Modern Architecture Redefined",
    actionButton: {
      text: "Explore Now",
      href: "/showhomes",
    },
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slidesData.length <= 1) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (videoRef.current && currentSlideData.type === "video") {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    if (videoRef.current && currentSlideData.type === "video") {
      videoRef.current
        .play()
        .catch((e) => console.error("Video play failed:", e));
    }
  };

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const textVariants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const currentSlideData = slidesData[currentSlide];

  return (
    <div
      className="relative w-full h-[500px] md:h-[750px] lg:h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute w-full inset-0 overflow-hidden"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {currentSlideData.type === "image" ? (
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentSlideData.background})` }}
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={currentSlideData.background} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="text-left text-white container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="font-display text-lg md:text-xl text-offwhite/90 mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {currentSlideData.subtitle}
              </motion.p>

              <motion.h1
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-offwhite mb-8 leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {currentSlideData.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  href={currentSlideData.actionButton.href}
                  className="inline-flex items-center gap-3 bg-primary text-offwhite px-8 py-4 font-display font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group"
                >
                  {currentSlideData.actionButton.text}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    <FaArrowRightLong />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows - Only show if multiple slides */}
      {slidesData.length > 1 && (
        <>
          <motion.button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-offwhite/80 hover:text-offwhite bg-black/20 hover:bg-black/40 p-3 rounded-full transition-all duration-300 z-10"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-offwhite/80 hover:text-offwhite bg-black/20 hover:bg-black/40 p-3 rounded-full transition-all duration-300 z-10"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </>
      )}

      {/* Bullet Navigation - Only show if multiple slides */}
      {slidesData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slidesData.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary scale-125"
                  : "bg-offwhite/50 hover:bg-offwhite/80"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Progress Bar - Only show if multiple slides */}
      {slidesData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            key={currentSlide}
          />
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
