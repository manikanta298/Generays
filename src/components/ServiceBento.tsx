import { ArrowUpRight, Check } from "lucide-react";
import { BeamCard } from "@/components/spectrumui/beam-card";
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
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
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
            const gradientId = `${headingId}-icon-${index}`;
            const previewItems = service.items.slice(0, 4);
            const extraCount = Math.max(
              service.items.length - previewItems.length,
              0,
            );

            return (
              <BeamCard
                key={service.slug}
                wrapperClassName="service-bento__beam"
                colorVariant="ocean"
                theme="light"
                borderRadius={14}
                active={hovered === service.slug || focused === service.slug}
                surface={
                  <Link
                    to={`/services/${service.slug}`}
                    className="service-bento__card"
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setHovered(service.slug);
                    }}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setFocused(service.slug);
                    }}
                    onBlur={() => setFocused(null)}
                    aria-label={`Explore ${service.title} and its ${service.items.length} included capabilities`}
                    role="listitem"
                  >
                    <div className="service-bento__top">
                      <span className="service-bento__icon" aria-hidden="true">
                        <Icon size={23} strokeWidth={1.9} color={`url(#${gradientId})`}>
                          <defs>
                            <linearGradient id={gradientId} x2="1" y2="1">
                              <stop stopColor="#002b8e" />
                              <stop offset="1" stopColor="#357cde" />
                            </linearGradient>
                          </defs>
                        </Icon>
                      </span>
                      <span className="service-bento__number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="service-bento__content">
                      <div className="service-bento__meta">
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

                  </Link>
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
