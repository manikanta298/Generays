import { Cloud, Code2, Cpu, Database, Rocket, Smartphone } from "lucide-react";
import { technologies } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import LogoLoop from "@/components/LogoLoop";

export function TechnologySection() {
  return (
    <section className="overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Technology expertise" title="We choose technology around the business — not the other way around." subtitle="A flexible stack spanning product engineering, cloud, commerce, data and automation." />
        <div className="mt-12 rounded-2xl border border-border bg-primary-soft/40 py-8 shadow-[var(--shadow-glow)]">
          <LogoLoop
            logos={[
              { node: <Code2 />, title: "React" },
              { node: <Cpu />, title: "Next-generation web" },
              { node: <Cloud />, title: "Cloud platforms" },
              { node: <Database />, title: "Data systems" },
              { node: <Smartphone />, title: "Mobile experiences" },
              { node: <Rocket />, title: "Growth infrastructure" },
            ]}
            speed={55}
            direction="left"
            logoHeight={34}
            gap={58}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="var(--primary-soft)"
            ariaLabel="GeneRays technology expertise"
            className="tech-logo-loop"
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {technologies.map((tech) => <span key={tech} className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground">{tech}</span>)}
        </div>
      </div>
    </section>
  );
}
