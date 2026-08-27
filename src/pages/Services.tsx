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
        subtitle="Eleven connected capabilities. Take one, or let them compound into a single business ecosystem."
        image={heroBlueprint}
        imageAlt="Futuristic GeneRays brand blueprint glowing on a digital grid"
      />

      <ServiceBento services={services} />
      <TechnologySection/>
      

      {/* <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">Technology expertise</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold text-foreground md:text-3xl">
            A modern stack that adapts to the job.
          </h2>
          <div className="mt-8 rounded-2xl border border-border bg-background py-7">
            <LogoLoop
              logos={[
                { node: <Code2 />, title: "Web engineering" },
                { node: <Cpu />, title: "Application architecture" },
                { node: <Cloud />, title: "Cloud" },
                { node: <Database />, title: "Data" },
                { node: <Smartphone />, title: "Mobile" },
                { node: <Rocket />, title: "Growth" },
              ]}
              speed={50}
              logoHeight={32}
              gap={54}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--background)"
              ariaLabel="Technology expertise"
              className="tech-logo-loop"
            />
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-border bg-background px-3.5 py-2 text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
