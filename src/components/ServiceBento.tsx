import { ArrowUpRight, Check, Sparkles } from "lucide-react";
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
  "brand-foundation": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=88",
  "logo-design": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=88",
  "creative-studio": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=88",
  "website-development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=88",
  "ecommerce-development": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=88",
  "web-applications": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=88",
  "digital-marketing": "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=88",
  "marketplace-growth": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=88",
  "business-communication": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=88",
  "website-care-amc": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=88",
  "whatsapp-automation": "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1400&q=88",
};

export function ServiceBento({
  services,
  heading = "What's included",
  eyebrow = "Services architecture",
  description = "Explore every capability, from brand foundations to websites, growth, automation and ongoing care. Each service is built as a focused system that can stand alone or connect with the rest of your digital ecosystem.",
}: ServiceBentoProps) {
  return (
    <section className="service-bento" aria-labelledby="service-bento-heading">
      <div className="service-bento__inner">
        <div className="service-bento__intro">
          <div className="service-bento__intro-copy">
            <div className="service-bento__eyebrow-row">
              <p className="service-bento__eyebrow">{eyebrow}</p>
              <span className="service-bento__count">{services.length} connected services</span>
            </div>
            <h2 id="service-bento-heading" className="service-bento__heading">
              Everything your brand needs,{" "}
              <span>without the empty spaces.</span>
            </h2>
            <p className="service-bento__description">{description}</p>
          </div>
        </div>

        <div className="service-bento__grid" role="list" aria-label="GeneRays services">
          {services.map((service, index) => {
            const media = getServiceMedia(service.slug);
            const image = onlineImages[service.slug] ?? media.image;
            const Icon = media.icon;
            const previewItems = service.items.slice(0, 4);
            const extraCount = Math.max(service.items.length - previewItems.length, 0);

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`service-bento__card service-bento__card--${service.letter}`}
                aria-label={`Explore ${service.title} and its ${service.items.length} included capabilities`}
                role="listitem"
              >
                <img
                  className="service-bento__image"
                  src={image}
                  alt=""
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.src !== media.image) target.src = media.image;
                  }}
                />
                <div className="service-bento__scrim" />
                <div className="service-bento__gridline" />

                <div className="service-bento__top">
                  <span className="service-bento__number">{service.letter}</span>
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

                  <div className="service-bento__included" aria-label={`Included in ${service.title}`}>
                    {previewItems.map((item) => (
                      <span key={item}>
                        <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                    {extraCount > 0 && <span className="service-bento__more">+{extraCount} more</span>}
                  </div>

                  <span className="service-bento__action">
                    View what's included <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>

                <span className="service-bento__glow" aria-hidden="true">
                  <Sparkles size={30} strokeWidth={1.1} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
