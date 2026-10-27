import { PageHero } from "@/components/page-hero";
import { ServiceCatalogue } from "@/components/agency/ServiceCatalogue";
import { AgencyCallToAction } from "@/components/agency/AgencySections";
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our capabilities"
        title={
          <>
            Everything your brand needs.
            <br />
            <span>Under one roof.</span>
          </>
        }
        subtitle="Eleven connected capabilities. Start with one, or bring them together into a complete business ecosystem."
      />
      <section
        className="gr-section gr-services"
        aria-label="Explore our services"
      >
        <div className="gr-container">
          <ServiceCatalogue />
        </div>
      </section>
      <AgencyCallToAction />
    </>
  );
}
