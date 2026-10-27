import { services } from "@/content/site";
import { ServiceBento } from "@/components/ServiceBento";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-section-heading">
      <ServiceBento
        services={services}
        eyebrow="Services architecture"
        heading="Everything your brand needs. Under one roof."
        description="Explore eleven services across branding, websites, commerce, marketing and automation. Start with your business priorities."
      />
    </section>
  );
}
