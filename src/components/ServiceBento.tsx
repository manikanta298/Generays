import { ArrowRight, X } from "lucide-react";
import { BeamCard } from "@/components/spectrumui/beam-card";
import { Link } from "react-router-dom";
import type { Service } from "@/content/site";
import { getServiceIcon } from "@/content/service-icons";
import { getServiceMedia } from "@/content/media";
import {
  serviceCategories,
  serviceCategory,
} from "@/content/service-categories";
import { useId, useLayoutEffect, useRef, useState } from "react";

const brandIconByService: Record<string, { src: string; alt: string }> = {
  "digital-marketing": { src: "/brand-icons/meta.svg", alt: "Meta" },
  "whatsapp-automation": { src: "/brand-icons/whatsapp.svg", alt: "WhatsApp" },
};

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
  heading = "Our Services",
  eyebrow = "Services architecture",
  description = "Explore every capability, from brand foundations to websites, growth, automation and ongoing care. Each service is built as a focused system that can stand alone or connect with the rest of your digital ecosystem.",
}: ServiceBentoProps) {
  const [category, setCategory] = useState("All");
  const headingId = useId();
  const dialogTitleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  useLayoutEffect(() => {
    if (selected && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
    }
  }, [selected]);
  const selectedMedia = selected ? getServiceMedia(selected.slug) : null;
  const selectedBrandIcon = selected ? brandIconByService[selected.slug] : null;
  const SelectedIcon = selected ? getServiceIcon(selected.slug) : null;
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
            </div>
            <h2 id={headingId} className="service-bento__heading">
              {heading}
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
          role="group"
          aria-label="GeneRays services"
        >
          {visibleServices.map((service) => {
            const Icon = getServiceIcon(service.slug);
            const brandIcon = brandIconByService[service.slug];

            return (
              <BeamCard
                key={service.slug}
                wrapperClassName="service-bento__beam"
                colorVariant="ocean"
                theme="light"
                borderRadius={14}
                active={hovered === service.slug || focused === service.slug}
                surface={
                  <button
                    type="button"
                    className="service-bento__card"
                    aria-haspopup="dialog"
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setHovered(service.slug);
                    }}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setFocused(service.slug);
                    }}
                    onBlur={() => setFocused(null)}
                    onClick={(event) => {
                      trigger.current = event.currentTarget;
                      setSelected(service);
                    }}
                  >
                    {brandIcon ? <img className="service-bento__brand-icon" src={brandIcon.src} alt={brandIcon.alt} /> : <Icon size={32} strokeWidth={1.8} aria-hidden="true" />}
                    <span>{service.title}</span>
                  </button>
                }
              />
            );
          })}
        </div>
        <dialog
          ref={dialog}
          className="service-bento__dialog"
          aria-labelledby={dialogTitleId}
          onClose={() => {
            setSelected(null);
            trigger.current?.focus();
          }}
        >
          <div className="service-bento__dialog-content">
            <button type="button" className="service-bento__close" aria-label="Close service details" onClick={() => dialog.current?.close()}>
              <X size={24} aria-hidden="true" />
            </button>
            {selected && SelectedIcon && (
              <>
                {selectedMedia && (
                  <img className="service-bento__dialog-image" src={selectedMedia.image} alt={selectedMedia.alt} loading="lazy" />
                )}
                {selectedBrandIcon ? <img className="service-bento__dialog-brand-icon" src={selectedBrandIcon.src} alt={selectedBrandIcon.alt} /> : <SelectedIcon className="service-bento__dialog-icon" size={34} aria-hidden="true" />}
                <h3 id={dialogTitleId}>{selected.title}</h3>
                <p className="service-bento__dialog-intro">{selected.tagline}</p>
                <div className="service-bento__details">
                  <h4>What’s Included</h4>
                  <ul>
                    {selected.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <Link className="service-bento__more" to={`/services/${selected.slug}`} onClick={() => dialog.current?.close()}>
                  More <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </dialog>
      </div>
    </section>
  );
}
