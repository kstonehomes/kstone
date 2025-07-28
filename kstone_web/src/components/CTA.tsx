"use client";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import ModalButton from "./client/modal-button";
import { useNavigation } from "../../context/navigationContext";

export default function CTA(){
    const { active} = useNavigation();
 const getPageLabel = () => {
  switch (active) {
    case "/quick-possessions":
      return "Quick Possessions";
    case "/show-homes":
      return "Showhomes";
    case "/communities":
      return "Communities";
    case "/floor-plans":
      return "Floor Plans";
    default:
      return "";
  }
};

const currentPageLabel = getPageLabel();
  return(<>
    
    <section className="py-16  bg-[url('/images/ks-quickpossession.jpg')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/80 w-full h-full top-0 left-0"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Ready to Make This Home Yours?
          </h2>
          <p className="text-xl font-base text-white/90 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss out on this incredible opportunity. Contact our team today to schedule a viewing or get more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link
              href="/contact"
              className="bg-white text-secondary hover:bg-gray/90 font-display font-bold px-8 py-4  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FaPhone className="w-5 h-5" />
              Schedule a Tour
            </Link> */}
            <ModalButton source={currentPageLabel} label="Schedule Visit" />
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-secondary font-display font-bold px-8 py-4  transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaEnvelope className="w-5 h-5" />
              Get More Info
            </Link>
          </div>
        </div>
      </section>
    </>)
}