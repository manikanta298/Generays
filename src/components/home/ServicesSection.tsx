import { services } from "@/content/site";
import { ServiceBento } from "@/components/ServiceBento";

export function ServicesSection() {
  return (
    <section aria-label="Services">
      <ServiceBento
        services={services}
        eyebrow="Services architecture"
        description="Explore twelve services across branding, websites, commerce, marketing and automation. Start with your business priorities."
      />
    </section>
  );
}
