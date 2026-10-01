import { GallerySection } from "@/components/home/GallerySection";
import { HomeHero } from "@/components/home/HomeHero";
import { CorePositioningSection } from "@/components/home/CorePositioningSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { WhyGeneRaysSection } from "@/components/home/WhyGeneRaysSection";
import { TransformationSection } from "@/components/home/TransformationSection";
import { FinalCallSection } from "@/components/home/FinalCallSection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useHomeMotion } from "@/hooks/use-home-motion";

const testimonials = [
  {
    quote:
      "Thank you Madhav Garu for delivering a superb logo design in just two hours. The quick response, patience with multiple changes, and quality of the final design were outstanding. I strongly appreciate and recommend the work.",
    name: "Sai Manoj Marneedi",
    designation: "BNI Amigos, Eshwari Roofing Industry",
  },
  {
    quote:
      "GeneRays has excellent skills in website marketing and website design. Their attractive designs and social media promotions have been helpful to our growth. Thank you Prabhas Garu for your dedication and for treating our work with care.",
    name: "Ramesh Kumar Nemani",
    designation: "Client",
  },
];

export default function HomePage() {
  useHomeMotion();

  return (
    <div className="home-page bg-white">
      <HomeHero />
      <FrameworkSection />
      <ServicesSection />
      <GallerySection />
      <TechnologySection />
      <WhyGeneRaysSection />
      <CorePositioningSection />
      <section
        className="border-b border-slate-200 bg-white py-8 sm:py-10 lg:py-12"
        aria-labelledby="client-testimonials-title"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="client-testimonials-title" className="mb-5 text-center sm:mb-6">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-slate-950">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl md:text-5xl">
              Trusted partnerships. Meaningful results.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-slate-950" />
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
              Short, authentic client feedback on GeneRays&apos; design, marketing and digital work.
            </p>
          </div>
        </div>

        <AnimatedTestimonials testimonials={testimonials} />
      </section>
      {/* <TransformationSection /> */}
      <FinalCallSection />
    </div>
  );
}
