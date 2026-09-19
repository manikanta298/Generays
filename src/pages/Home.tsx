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
        className="border-b border-slate-200 bg-[#F4F6FB] py-14 sm:py-16 lg:py-20"
        aria-labelledby="client-testimonials-title"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="client-testimonials-title" className="mb-8 sm:mb-10 lg:mb-12">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-indigo-600">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Trusted partnerships.
              <br />
              Meaningful results.
            </h2>
            <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400" />
            <p className="max-w-xl text-base text-slate-500 md:text-lg">
              Hear directly from clients about the clarity, craft and impact GeneRays brings to every digital experience.
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
