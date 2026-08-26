import { services } from "@/content/site";
import { ServiceBento } from "@/components/ServiceBento";

export function ServicesSection() {
  return (
    <ServiceBento
      services={services}
      eyebrow="Services architecture"
      heading="Everything your brand needs. Under one roof."
      description="Eleven connected capabilities, designed to work together instead of becoming isolated deliverables."
    />
  );
}
