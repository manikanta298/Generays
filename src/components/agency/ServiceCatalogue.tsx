import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import { getServiceMedia } from "@/content/media";
import {
  serviceGroups,
  serviceGroupBySlug,
  type ServiceGroup,
} from "@/content/service-groups";

export function ServiceCatalogue({ featured = false }: { featured?: boolean }) {
  const [group, setGroup] = useState<ServiceGroup>("all");
  const visibleServices = featured
    ? services.filter((service) =>
        [
          "brand-foundation",
          "website-development",
          "digital-marketing",
          "creative-studio",
          "ecommerce-development",
          "whatsapp-automation",
        ].includes(service.slug),
      )
    : services.filter(
        (service) =>
          group === "all" || serviceGroupBySlug[service.slug] === group,
      );
  return (
    <>
      {!featured && (
        <div
          className="gr-filters"
          role="group"
          aria-label="Filter services by category"
        >
          {serviceGroups.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={group === item.id}
              onClick={() => setGroup(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <p className="gr-sr-only" role="status">
        {visibleServices.length} services shown
      </p>
      <div className="gr-service-grid">
        {visibleServices.map((service) => {
          const Icon = getServiceMedia(service.slug).icon;
          return (
            <Link
              className="gr-service-card"
              to={`/services/${service.slug}`}
              key={service.slug}
            >
              <div className="gr-service-card-top">
                <span className="gr-icon">
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={22}
                  className="gr-card-arrow"
                  aria-hidden="true"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.tagline}</p>
              <span className="gr-service-card-bottom">
                Explore service{" "}
                <span>
                  {String(service.items.length).padStart(2, "0")} capabilities
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
