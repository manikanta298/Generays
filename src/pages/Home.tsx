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
      "Thank u madhav Garu for giving a superb logo design in just two hours for our new firm. As logo should be printed on our machine mold in very short time and the way you responded and given logo design in just two hours was awesome. Even I think I asked you nearly 50 changes but the quality and the patience you had is superb. I strongly appreciate and refer undoubtedly. Thank you for your fabulous work ...",
    name: "Sai Manoj Marneedi",
    designation: "BNI Amigos, Eshwari Roofing Industry",
  },
  {
    quote:
      "GeneRays having excellent skills in website marketing n designing websites. Me n my brother observed his skills n appreciated him and we have given our website marketing to him, posting ads of our website in Facebook n Twitter promotions. He is doing our work with attractive designs helpful in promotions. Thanking u Prabhas garu for ur dedication on our work n treating our work as your own web site n helpful in our growth.",
    name: "Ramesh Kumar Nemani",
    designation: "Client",
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
