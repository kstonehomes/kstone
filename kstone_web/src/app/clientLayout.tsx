"use client";

import { ReactNode, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import CityPopup from "@/components/cityPopup/CityPopup";
import MobilePhone from "@/components/globalContact/MobilePhone";
import WhatsApp from "@/components/globalContact/WhatsApp";

const PROBLEMATIC_ATTRIBUTES = [
  "bis_skin_checked",
  "__processed_",
  "bis_register",
];

export function ClientComponents({ children }: { children: ReactNode }) {
  useEffect(() => {
    const cleanup = () => {
      document.querySelectorAll("*").forEach((element) => {
        PROBLEMATIC_ATTRIBUTES.forEach((attr) => {
          if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
          }
        });
      });
    };

    cleanup();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          cleanup();
        }
      });
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: PROBLEMATIC_ATTRIBUTES,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <CityPopup />
      <div className="pt-24 relative">
        <MobilePhone />
        <WhatsApp />
        {children}
      </div>
      <Footer />
    </>
  );
}
