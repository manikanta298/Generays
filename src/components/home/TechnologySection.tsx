import { TechnologyLoop } from "@/components/home/TechnologyLoop";
import { SectionHeading } from "@/components/page-hero";
import { TechMarquee } from "@/components/home/TechMarquee";

export function TechnologySection() {
  return (
    <section className="overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Technology expertise" title="We choose technology around the business — not the other way around." subtitle="A flexible stack spanning product engineering, cloud, commerce, data and automation." />
        <div className="mt-12 rounded-2xl ">
          <TechMarquee />
        </div>
        <div className="mt-8"><TechnologyLoop variant="expertise" /></div>
      </div>
    </section>
  );
}
