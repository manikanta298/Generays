import { ArrowUpRight, Sparkles } from "lucide-react";
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

const onlineImages: Record<string, string> = {
  "brand-foundation":
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
  "logo-design":
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=85",
  "creative-studio":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85",
  "website-development":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  "ecommerce-development":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  "web-applications":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  "digital-marketing":
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
  "marketplace-growth":
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85",
  "business-communication":
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  "website-care-amc":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  "whatsapp-automation":
    "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1200&q=85",
};

const spanClasses = [
  "service-bento__card--wide",
  "service-bento__card--tall",
  "",
  "",
  "service-bento__card--wide",
  "",
  "service-bento__card--tall",
  "",
  "service-bento__card--wide",
  "",
  "",
];

export function ServiceBento({
  services,
  heading = "Everything your brand needs. Under one roof.",
  eyebrow = "Services architecture",
  description = "Eleven connected capabilities, designed to work together instead of becoming isolated deliverables.",
}: ServiceBentoProps) {
  return (
    <section className="service-bento" aria-labelledby="service-bento-heading">
      <div className="service-bento__inner">
        <div className="service-bento__intro">
          <div>
            <p className="service-bento__eyebrow">{eyebrow}</p>
            <h2 id="service-bento-heading" className="service-bento__heading">
              {heading}
            </h2>
          </div>
          <p className="service-bento__description">{description}</p>
        </div>

        <div className="service-bento__grid">
          {services.map((service, index) => {
            const media = getServiceMedia(service.slug);
            const image = onlineImages[service.slug] ?? media.image;
            const Icon = media.icon;

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`service-bento__card ${spanClasses[index] ?? ""}`}
                aria-label={`Explore ${service.title}`}
              >
                <img
                  className="service-bento__image"
                  src={image}
                  alt=""
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.src !== media.image) {
                      target.src = media.image;
                    }
                  }}
                />

                <div className="service-bento__scrim" />
                <div className="service-bento__gridline" />

                <div className="service-bento__top">
                  <span className="service-bento__number">{service.letter}</span>
                  <span className="service-bento__icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="service-bento__content">
                  <p className="service-bento__kicker">GeneRays capability</p>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>

                  <span className="service-bento__action">
                    Explore service
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>

                <span className="service-bento__glow" aria-hidden="true">
                  <Sparkles size={28} strokeWidth={1.2} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
