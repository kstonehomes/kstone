"use client"
import { useScroll, useTransform, motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";

const HeroSection = ({
  heading,
  paragraph,
  imageUrl,
}: {
  heading: string;
  paragraph: string;
  imageUrl: string;
}) => {
  const pathname = usePathname();
  const items = pathname.split("/");
  const containerRef = useRef(null);

  // Enhanced scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoother parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  // const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Improved animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      } as Transition,
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      } as Transition,
    },
  };

  const headingVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      } as Transition,
    },
  };

  const paragraphVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      } as Transition,
    },
  };

  return (
    <div
      className="hero-section relative h-[300px] lg:h-[500px] overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${imageUrl})`,
            y,
            scale,
          }}
        />
      </div>

      {/* Enhanced overlay with gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-yellow-300/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content with improved animations */}
      <div className="relative h-full flex items-center">
        <motion.div
          className="container px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Breadcrumb with better stagger */}
          <motion.div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-6 text-lg text-gray-400 font-medium">
              {items.map((item, index) => {
                const isHome = item === "";
                const href = "/" + items.slice(1, index + 1).join("/");

                return (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2"
                    variants={itemVariants}
                    custom={index}
                  >
                    {isHome ? <AiOutlineHome size={16} /> : null}
                    <Link
                      href={isHome ? "/" : href}
                      className={`capitalize ${
                        index === items.length - 1 ? "text-offwhite" : ""
                      }`}
                    >
                      {isHome ? "Home" : item}
                    </Link>
                    {index < items.length - 1 ? <IoIosArrowForward /> : null}
                  </motion.li>
                );
              })}
            </nav>
          </motion.div>

          {/* Heading with more prominent animation */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl text-offwhite leading-tight mb-4"
            style={{ fontWeight: 400 }}
            variants={headingVariants}
          >
            {heading}
          </motion.h2>

          {/* Paragraph with smoother reveal */}
          <motion.p
            className="text-xl text-offwhite max-w-2xl"
            variants={paragraphVariants}
          >
            {paragraph}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
