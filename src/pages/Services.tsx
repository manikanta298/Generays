import { Code2, Cpu, Cloud, Database, Smartphone, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { servicesHeaderImage } from "@/content/media";
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
        subtitle="Eleven connected capabilities. Take one, or let them compound into a single business ecosystem."
        image={servicesHeaderImage}
        imageAlt="GeneRays services architecture connecting technology, digital growth, commerce, communication and customer engagement"
      />

      <ServiceBento services={services} />
      <TechnologySection/>
      
    </>
  );
}
