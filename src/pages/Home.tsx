import { HomeHero } from "@/components/home/HomeHero";
import { CorePositioningSection } from "@/components/home/CorePositioningSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { WhyGeneRaysSection } from "@/components/home/WhyGeneRaysSection";
import { TransformationSection } from "@/components/home/TransformationSection";
import { GallerySection } from "@/components/home/GallerySection";
import { FinalCallSection } from "@/components/home/FinalCallSection";

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <CorePositioningSection />
      <FrameworkSection />
      <ServicesSection />
      <TechnologySection />
      <WhyGeneRaysSection />
      {/* <TransformationSection /> */}
      <GallerySection />
      <FinalCallSection />
    </div>
  );
}
