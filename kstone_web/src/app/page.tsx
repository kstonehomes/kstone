import HeroSlider from "@/components/HeroSlider";
import ExploreHomes from "@/sections/ExploreHomes";
import OverviewSection from "@/sections/OverviewSections";

export default function Home() {
  // const spInterior = "/videos/sp-interior.mp4";

  return (
    <div className="home_page">
      {/* Hero section */}
      <HeroSlider />
      <OverviewSection />
      <ExploreHomes />
    </div>
  );
}
