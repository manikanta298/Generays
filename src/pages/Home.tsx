import { HomeHero } from "@/components/home/HomeHero";
import { CorePositioningSection } from "@/components/home/CorePositioningSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { WhyGeneRaysSection } from "@/components/home/WhyGeneRaysSection";
import { TransformationSection } from "@/components/home/TransformationSection";
import { GallerySection } from "@/components/home/GallerySection";
import { FinalCallSection } from "@/components/home/FinalCallSection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionHeading } from "@/components/page-hero";
import { useHomeMotion } from "@/hooks/use-home-motion";

const testimonials = [
  {
    quote:
      "The GeneRays team turned our vision into a clear, high-converting digital presence. Every detail feels intentional.",
    name: "Sarah Chen",
    designation: "Founder, GrowthBrand",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote:
      "From strategy to launch, the process was seamless. Our new website finally represents the quality of our business.",
    name: "Michael Rodriguez",
    designation: "Director, InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote:
      "GeneRays made complex digital work feel simple. The result is a stronger brand and a much better customer experience.",
    name: "Emily Watson",
    designation: "Operations Lead, CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote:
      "The combination of creative thinking and technical execution gave us exactly the digital foundation we needed.",
    name: "James Kim",
    designation: "Engineering Lead, DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote:
      "Our brand now feels consistent across every touchpoint. GeneRays helped us turn ideas into a system that can scale.",
    name: "Lisa Thompson",
    designation: "VP of Technology, FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HomePage() {
  useHomeMotion();

  return (
    <div className="home-page">
      <HomeHero />
      <FrameworkSection />
      <ServicesSection />
      <GallerySection />
      <TechnologySection />
      <WhyGeneRaysSection />
      <CorePositioningSection />
      <section
        className="border-b border-slate-200 bg-[#F4F6FB] py-16 sm:py-20 md:py-24 lg:py-28"
        aria-labelledby="client-testimonials-title"
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div
            id="client-testimonials-title"
            className="mb-10 rounded-2xl border border-slate-200/80 bg-white px-5 py-6 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.38)] sm:mb-12 sm:px-7 md:mb-16 md:px-8 md:py-7"
          >
            <SectionHeading
              eyebrow="Client testimonials"
              title="Trusted partnerships. Meaningful results."
              subtitle="Hear directly from clients about the clarity, craft and impact GeneRays brings to every digital experience."
            />
          </div>
        </div>

        <AnimatedTestimonials testimonials={testimonials} />
      </section>
      {/* <TransformationSection /> */}
      <FinalCallSection />
    </div>
  );
}
