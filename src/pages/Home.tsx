import { TechnologyLoop } from "@/components/home/TechnologyLoop";
import { GallerySection } from "@/components/home/GallerySection";
import { HomeHero } from "@/components/home/HomeHero";
import { CorePositioningSection } from "@/components/home/CorePositioningSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { WhyGeneRaysSection } from "@/components/home/WhyGeneRaysSection";
import { TransformationSection } from "@/components/home/TransformationSection";
import { FinalCallSection } from "@/components/home/FinalCallSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { useHomeMotion } from "@/hooks/use-home-motion";

export default function HomePage() {
  useHomeMotion();

  return (
    <div className="home-page bg-white">
      <HomeHero />
      <div className="mx-auto max-w-6xl px-5 pb-4">
        <TechnologyLoop />
      </div>
      <FrameworkSection />
      <ServicesSection />
      <GallerySection />
      <TechnologySection />
      <WhyGeneRaysSection />
      <CorePositioningSection />
      <TestimonialsSection />
      {/* <TransformationSection /> */}
      <FinalCallSection />
    </div>
  );
}
