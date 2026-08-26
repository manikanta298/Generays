import { technologies } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import { TechMarquee } from "@/components/home/TechMarquee";

export function TechnologySection() {
  return (
    <section className="overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Technology expertise" title="We choose technology around the business — not the other way around." subtitle="A flexible stack spanning product engineering, cloud, commerce, data and automation." />
        <div className="mt-12 rounded-2xl border border-border bg-primary-soft/40 py-8 ">
          <TechMarquee />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {technologies.map((tech) => <span key={tech} className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground">{tech}</span>)}
        </div>
      </div>
    </section>
  );
}
