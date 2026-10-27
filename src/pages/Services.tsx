import { Code2, Cpu, Cloud, Database, Smartphone, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { heroBlueprint } from "@/content/media";
import { services, technologies } from "@/content/site";
import LogoLoop from "@/components/LogoLoop";
import { TechnologySection } from "@/components/home/TechnologySection";
import { ServiceBento } from "@/components/ServiceBento";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services architecture"
        title="Everything your brand needs. Under one roof."
        subtitle="Branding, websites, commerce, marketing and business systems. Explore what each service covers and where it fits your goals."
        image={heroBlueprint}
        imageAlt="Futuristic GeneRays services and technology architecture"
        transparentImage
      />

      <ServiceBento services={services} />
      <TechnologySection/>
      
    </>
  );
}
