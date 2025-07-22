"use client";
import { useState } from "react";
import Link from "next/link";
import { BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ScheduleVisit from "../scheduleVisit/ScheduleVisitPopup";
const ksCta = "/images/ks-cta.jpg";

const CTA = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="cta_container relative w-full h-[400px] md:h-[450px] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${ksCta})` }}
          ></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/70 to-dark/50" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="container flex flex-col justify-center items-center gap-4 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite">
              Ready to <span className="text-golden">Move In</span>?
            </h2>
            <p className="text-xl md:text-2xl text-offwhite/90 max-w-2xl">
              Schedule a viewing today and experience your future home in person
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-none"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="flex-1 flex justify-center items-center gap-3 bg-golden hover:bg-golden/90 text-dark font-bold px-8 py-4 md:py-5 rounded-lg border-2 border-golden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
            >
              <BiPhone size={24} className="group-hover:animate-pulse" />
              <span className="text-lg">Schedule Visit</span>
            </button>
            <Link
              href="/contact"
              className="flex-1 flex justify-center items-center gap-3 bg-transparent hover:bg-offwhite text-offwhite hover:text-dark font-bold px-8 py-4 md:py-5 rounded-lg border-2 border-offwhite shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
            >
              <MdEmail size={24} className="group-hover:animate-bounce" />
              <span className="text-lg">Get More Info</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Schedule Visit Popup - shown only when button is clicked */}
      <AnimatePresence>
        {showPopup && (
          <ScheduleVisit onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default CTA;
