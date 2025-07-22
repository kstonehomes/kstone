"use client";
import CTA from "@/components/CTA/CTA";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [countersActive, setCountersActive] = useState(false);
  const testimonialSectionRef = useRef(null);

  useEffect(() => {
    const currentRef = testimonialSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCountersActive(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const exploreItems = [
    {
      item: "Gallery",
      image: "/images/ks-gallery.jpg",
      link: "/gallery",
      description: "Explore our stunning home designs and finishes",
    },
    {
      item: "Pre Construction",
      image: "/images/ks-preconstruction.jpg",
      link: "/pre-construction",
      description: "Customize your dream home from the ground up",
    },
    {
      item: "Quick Possessions",
      image: "/images/ks-quickpossession.jpg",
      link: "/quick-possessions",
      description: "Move into your perfect home today",
    },
    {
      item: "Show Homes",
      image: "/images/ks-showhomes.jpg",
      link: "/show-homes",
      description: "Experience our quality firsthand",
    },
    {
      item: "Community",
      image: "/images/ks-communities.jpg",
      link: "/communities",
      description: "Discover our premium neighborhoods",
    },
  ];

  const testimonialData = [
    {
      icon: <LuBuilding2 className="w-full h-full text-golden" />,
      value: 200,
      suffix: "+",
      label: "Project Completed",
      duration: 2,
    },
    {
      icon: <FaUsers className="w-full h-full text-golden" />,
      value: 3000,
      suffix: "+",
      label: "Happy Families",
      duration: 2.5,
    },
    {
      icon: <FaMapMarkerAlt className="w-full h-full text-golden" />,
      value: 15,
      suffix: "+",
      label: "Locations",
      duration: 1.5,
    },
    {
      icon: <SlCalender className="w-full h-full text-golden" />,
      value: 10,
      suffix: "+",
      label: "Years Experience",
      duration: 2,
    },
  ];

  return (
    <div className="homepage">
      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] md:min-h-[800px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Enhanced Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: yBg,
            scale,
            opacity,
          }}
        >
          <Image
            src="/images/ks-hero.jpg"
            alt="Modern home exterior"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Improved gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Crafting <span className="text-golden">Exceptional</span> Living
              Spaces
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Where innovative design meets unparalleled craftsmanship to create
              homes that inspire.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/pre-construction"
                className="px-8 py-4 bg-golden hover:bg-amber-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg group"
              >
                Begin Your Journey
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg flex items-center gap-2 transition-all duration-300"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-6 bg-white" ref={testimonialSectionRef}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 order-2 lg:order-1"
            >
              <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/ks-house-dream.jpg"
                  alt="Home construction process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 order-1 lg:order-2"
            >
              <h2 className="text-golden text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
                Your Home, Your Story
              </h2>
              <div className="w-24 h-1 bg-golden mb-6"></div>
              <p className="text-gray-700 text-lg">
                At Kstone Homes, we believe that exceptional living starts with
                purposeful design and a deep respect for how people truly live.
                Each of our homes is more than just bricks and beams — it&apos;s
                a canvas for life&apos;s everyday moments, crafted with care,
                precision, and a vision for the future.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {testimonialData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-golden/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-4 mx-auto">{item.icon}</div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: countersActive ? index * 0.2 : 0,
                    }}
                  >
                    {countersActive ? (
                      <Counter
                        from={0}
                        to={item.value}
                        duration={item.duration}
                      />
                    ) : (
                      0
                    )}
                    {item.suffix}
                  </motion.div>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-golden mb-2">
              Explore Our Portfolio
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-golden via-golden/80 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Discover the exceptional quality and design that sets our homes
              apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exploreItems.map(({ item, image, link, description }, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link href={link} className="block h-full w-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={image}
                      alt={item}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <MdOutlineRemoveRedEye size={42} color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item}
                    </h3>
                    <p className="text-white/90 mb-4">{description}</p>
                    <div className="text-offwhite px-4 py-2 bg-golden hover:bg-yellow-700 font-medium flex items-center gap-2 w-fit transition-colors duration-300 rounded-lg group">
                      Explore
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}

// Counter component
const Counter = ({
  from,
  to,
  duration,
}: {
  from: number;
  to: number;
  duration: number;
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const end = to;
    const increment = end > start ? 1 : -1;
    const range = end - start;
    const step = Math.abs(Math.floor((duration * 1000) / range));

    const timer = setInterval(() => {
      start += increment;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{count}</span>;
};
