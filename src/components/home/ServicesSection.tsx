import { services } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import { ServiceCard } from "@/components/futuristic";

export function ServicesSection() {
  return (
    <section className="border-b border-border bg-primary-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading eyebrow="Services architecture" title="Everything your brand needs. Under one roof." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </div>
    </section>
  );
}
