import type { Metadata } from "next";
import "./globals.css";

import Footer from "../components/footer/Footer";

import { Alegreya, Inter, Italiana, Montserrat, Roboto } from "next/font/google";
import { NavigationProvider } from "../../context/navigationContext";
import { CityProvider } from "../../context/cityContext";
import CityPopup from "@/components/cityPopup/CityPopup";
import { CityPopupProvider } from "../../context/CityPopupContext";
import Header from "@/components/header/Header";
import { ModalProvider } from "@/components/client/modal-provider";
// import FormModalWrapper from "@/components/client/form-modal-wrapper";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-italiana",
  weight: ["400"],
  display: "swap",
});

export const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kstone Homes",
  description: "Your Dream Home, Built with Heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` scroll-smooth ${inter.variable} ${montserrat.variable}`}>
      <body
        id="__next"
        className={`antialiased overflow-x-hidden`}
      >
        <ModalProvider>
          <NavigationProvider>
            <CityProvider>
              <CityPopupProvider>
                <Header />
                <CityPopup />
                {/* <FormModalWrapper /> */}
                {children}
                <Footer />
              </CityPopupProvider>
            </CityProvider>
          </NavigationProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
