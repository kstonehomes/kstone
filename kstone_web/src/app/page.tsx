"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImArrowRight } from "react-icons/im";

export default function Home() {
  const skInterior = "/videos/sp-interior.mp4";
  const exploreItems = [
    {
      item: "Quick Possessions",
      image: "/images/ks-quickpossession.jpg",
      link: "/quick-possessions",
    },
    {
      item: "Show Homes",
      image: "/images/ks-showhomes.jpg",
      link: "/show-homes",
    },
    {
      item: "Gallery",
      image: "/images/ks-gallery.jpg",
      link: "/gallery",
    },
    {
      item: "Community",
      image: "/images/ks-communities.jpg",
      link: "/communities",
    },
  ];

  return (
    <div className="home_page -mt-2 overflow-hidden">
      {/* Hero section */}
      <motion.section
        className="hero_section relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>

        {/* Video section */}
        <motion.video
          className="w-full object-cover h-[480px] sm:h-[520px] md:h-[580px] lg:h-[640px]"
          loop
          muted
          autoPlay
          playsInline
          poster="/images/video-placeholder.png"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <source src={skInterior} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Text section */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center z-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center justify-center text-white px-4">
            <motion.h1
              className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide pb-4 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              YOUR DREAM HOME, BUILT WITH HEART
            </motion.h1>
            <motion.p
              className="max-w-3xl tracking-wide text-white text-lg sm:text-2xl font-light p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Experience Design & Innovation in Every Detail of Your Dream Home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="text-xl font-semibold text-white px-8 py-4 bg-amber-500 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-amber-600 hover:shadow-xl flex items-center gap-2"
              >
                Contact Us
                <ImArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Emotional Tagline */}
      <motion.div
        className="emotional_tagline flex flex-col items-center justify-center py-16 px-6 bg-white/90 dark:bg-gray-800 rounded-xl shadow-lg my-12 mx-auto max-w-4xl border border-amber-100 dark:border-gray-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500 mb-6 tracking-wide text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          YOUR HOME, YOUR STORY
        </motion.h2>
        <motion.p
          className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl font-light text-center leading-relaxed max-w-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          More than walls and a roof — a home is where your life unfolds.
          It&apos;s where laughter echoes, dreams grow, and memories are made.
          At{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            Kstone Homes
          </span>
          , we don&apos;t just build houses — we shape the spaces that shape
          you. Explore homes designed not just for living, but for belonging.
          Let&apos;s create the place you&apos;ll call yours — in every sense of
          the word.
        </motion.p>
      </motion.div>

      {/* Explore Your Dream Home */}
      <motion.section
        className="explore-container py-16 px-6 bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-amber-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Explore Your Dream Home
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {exploreItems.map(({ item, image, link }, index) => (
            <motion.div
              className="explore-card group relative p-6 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "320px",
                width: "100%",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              key={item}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10 rounded-xl"></div>
              <motion.div
                className="relative h-full flex flex-col justify-end z-20 text-center text-white pb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300">
                  {item}
                </span>
                <Link href={link}>
                  <span className="text-lg font-semibold flex items-center justify-center gap-2 text-amber-300 hover:text-white transition-colors duration-300">
                    <span>View</span>
                    <ImArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
