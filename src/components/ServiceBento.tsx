import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "@/content/site";
import { getServiceMedia } from "@/content/media";
import "./ServiceBento.css";

type ServiceBentoProps = {
  services: Service[];
  heading?: string;
  eyebrow?: string;
  description?: string;
};

export function ServiceBento({
  services,
  heading = "What's included",
  eyebrow = "Our services",
  description = "A complete digital partner for brand, web, commerce, growth and customer engagement — with every capability organised around a clear business outcome.",
}: ServiceBentoProps) {
  return (
    <section className="service-bento" aria-labelledby="service-bento-heading">
      <div className="service-bento__inner">
        <header className="service-bento__intro">
          <div>
            <p className="service-bento__eyebrow">{eyebrow}</p>
            <h2 id="service-bento-heading" className="service-bento__heading">
              {heading}
            </h2>
          </div>
          <div className="service-bento__intro-side">
            <p>{description}</p>
            <span>{services.length} services · built to work together</span>
          </div>
        </header>

        <div className="service-bento__grid" role="list" aria-label="GeneRays services">
          {services.map((service, index) => {
            const media = getServiceMedia(service.slug);
            const Icon = media.icon;
            const featured = index === 0 || index === 3 || index === 6 || index === 9;
            const previewItems = service.items.slice(0, featured ? 6 : 4);
            const extraCount = Math.max(service.items.length - previewItems.length, 0);

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`service-bento__card service-bento__card--${service.letter} ${featured ? "is-featured" : ""}`}
                role="listitem"
                aria-label={`Explore ${service.title} and its ${service.items.length} included capabilities`}
              >
                <div className="service-bento__visual">
                  <img
                    src={media.image}
                    alt=""
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="service-bento__visual-overlay" />
                  <span className="service-bento__letter">{service.letter}</span>
                  <span className="service-bento__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="service-bento__body">
                  <div className="service-bento__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{service.items.length} capabilities</span>
                  </div>

                  <div className="service-bento__title-row">
                    <h3>{service.title}</h3>
                    <span className="service-bento__arrow" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  <p className="service-bento__tagline">{service.tagline}</p>

                  <div className="service-bento__included">
                    {previewItems.map((item) => (
                      <span key={item}>
                        <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                    {extraCount > 0 && <span className="service-bento__more">+{extraCount} more</span>}
                  </div>

                  <span className="service-bento__cta">Explore service</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
