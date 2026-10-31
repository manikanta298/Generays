import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "@/content/site";
import { getServiceIcon } from "@/content/service-icons";
import {
  serviceCategories,
  serviceCategory,
} from "@/content/service-categories";
import { useId, useState } from "react";

type ServiceBentoProps = {
  services: Service[];
  heading?: string;
  eyebrow?: string;
  description?: string;
  filterable?: boolean;
};

export function ServiceBento({
  services,
  filterable = false,
  heading = "What's included",
  eyebrow = "Services architecture",
  description = "Explore every capability, from brand foundations to websites, growth, automation and ongoing care. Each service is built as a focused system that can stand alone or connect with the rest of your digital ecosystem.",
}: ServiceBentoProps) {
  const [category, setCategory] = useState("All");
  const headingId = useId();
  const visibleServices = services.filter(
    (service) =>
      !filterable ||
      category === "All" ||
      serviceCategory[service.slug] === category,
  );
  return (
    <section className="service-bento" aria-labelledby={headingId}>
      <div className="service-bento__inner">
        <div className="service-bento__intro">
          <div className="service-bento__intro-copy">
            <div className="service-bento__eyebrow-row">
              <p className="service-bento__eyebrow">{eyebrow}</p>
              <span className="service-bento__count">
                {services.length} connected services
              </span>
            </div>
            <h2 id={headingId} className="service-bento__heading">
              Everything your brand needs,{" "}
              <span>without the empty spaces.</span>
            </h2>
            <p className="service-bento__description">{description}</p>
          </div>
        </div>

        {filterable && (
          <div
            className="brand-filters"
            role="group"
            aria-label="Filter services"
          >
            {serviceCategories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        {filterable && (
          <p className="brand-result-count" role="status">
            {visibleServices.length} services shown
          </p>
        )}
        <div
          className="service-bento__grid"
          role="list"
          aria-label="GeneRays services"
        >
          {visibleServices.map((service) => {
            const index = services.indexOf(service);
            const Icon = getServiceIcon(service.slug);
            const previewItems = service.items.slice(0, 4);
            const extraCount = Math.max(
              service.items.length - previewItems.length,
              0,
            );

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`service-bento__card service-bento__card--${service.letter}`}
                aria-label={`Explore ${service.title} and its ${service.items.length} included capabilities`}
                role="listitem"
              >
                <span className="service-bento__service-art" aria-hidden="true">
                  <Icon size={116} strokeWidth={1} />
                </span>
                <div className="service-bento__scrim" />
                <div className="service-bento__gridline" />

                <div className="service-bento__top">
                  <span className="service-bento__number">
                    {service.letter}
                  </span>
                  <span className="service-bento__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="service-bento__content">
                  <div className="service-bento__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{service.items.length} included</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-bento__tagline">{service.tagline}</p>

                  <div
                    className="service-bento__included"
                    aria-label={`Included in ${service.title}`}
                  >
                    {previewItems.map((item) => (
                      <span key={item}>
                        <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className="service-bento__more">
                        +{extraCount} more
                      </span>
                    )}
                  </div>

                  <span className="service-bento__action">
                    View what's included{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>

                <span className="service-bento__glow" aria-hidden="true">
                  <Icon size={30} strokeWidth={1.1} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
