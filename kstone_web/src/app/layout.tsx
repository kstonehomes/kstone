import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { NavigationProvider } from "../../context/navigationContext";
import { CityProvider } from "../../context/cityContext";
import { CityPopupProvider } from "../../context/CityPopupContext";
import { ClientComponents } from "./clientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kstone Homes",
  description: "Your Dream Home, Built with Heart",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased max-w-[1480px] mx-auto`}
        suppressHydrationWarning
      >
        <NavigationProvider>
          <CityProvider>
            <CityPopupProvider>
              <ClientComponents>{children}</ClientComponents>
            </CityPopupProvider>
          </CityProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
