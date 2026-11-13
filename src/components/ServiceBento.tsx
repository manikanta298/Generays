import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/content/site";
import { getServiceIcon } from "@/content/service-icons";
import { getServiceMedia } from "@/content/media";
import { serviceCategories, serviceCategory } from "@/content/service-categories";
import { useId, useLayoutEffect, useRef, useState } from "react";

type ServiceBentoProps = {
  services: Service[];
  heading?: string;
  eyebrow?: string;
  description?: string;
  filterable?: boolean;
};

function AmazonBrandMark() {
  return (
    <svg className="service-bento__amazon-mark" viewBox="0 0 100 62" role="img" aria-label="Amazon">
      <text x="8" y="39" className="service-bento__amazon-word">amazon</text>
      <path d="M17 47 C37 61 66 60 84 45" fill="none" stroke="#ff9900" strokeWidth="4.5" strokeLinecap="round" />
      <path d="m75 44 10 1-4 9" fill="none" stroke="#ff9900" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppBrandMark() {
  return (
    <span className="service-bento__whatsapp-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.347-.57-.347" />
        <path d="M12.05 2.1a9.85 9.85 0 0 0-8.5 14.82L2.2 21.8l5.03-1.32a9.9 9.9 0 0 0 4.82 1.25h.01a9.82 9.82 0 0 0 9.84-9.82 9.77 9.77 0 0 0-2.88-6.95 9.78 9.78 0 0 0-6.97-2.86Zm0 17.9h-.01a8.16 8.16 0 0 1-4.15-1.13l-.3-.18-2.99.78.8-2.91-.2-.31a8.1 8.1 0 1 1 6.85 3.75Z" />
      </svg>
    </span>
  );
}

function GoogleBrandMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

function SocialPlatformMarks() {
  return (
    <span className="service-bento__brand-row" aria-hidden="true">
      <span className="service-bento__brand-badge service-bento__brand-badge--facebook">
        <svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
      </span>
      <span className="service-bento__brand-badge service-bento__brand-badge--instagram">
        <svg viewBox="0 0 24 24"><path d="M7.03.084c-1.277.06-2.149.264-2.911.563-.789.308-1.458.72-2.123 1.388-.665.668-1.075 1.337-1.38 2.127-.296.764-.496 1.637-.552 2.914-.056 1.278-.069 1.688-.063 4.947.006 3.259.021 3.667.083 4.947.061 1.277.264 2.148.563 2.911.308.789.72 1.457 1.388 2.123.668.665 1.337 1.074 2.129 1.38.763.295 1.636.496 2.913.552 1.277.056 1.688.069 4.946.063 3.258-.006 3.668-.021 4.948-.081 1.28-.061 2.147-.266 2.91-.564.789-.308 1.458-.72 2.123-1.388.665-.668 1.075-1.337 1.379-2.128.296-.763.497-1.636.552-2.912.056-1.281.069-1.69.063-4.948-.006-3.258-.021-3.667-.082-4.947-.061-1.28-.264-2.149-.563-2.912-.308-.789-.72-1.457-1.388-2.123-.668-.665-1.337-1.074-2.128-1.379-.764-.296-1.636-.497-2.913-.552C15.647.009 15.236-.005 11.977.001 8.718.008 8.31.022 7.03.084M7.17 21.777c-1.17-.051-1.805-.245-2.229-.408-.56-.216-.96-.477-1.382-.895-.422-.418-.681-.818-.9-1.378-.164-.423-.362-1.058-.417-2.228-.06-1.265-.073-1.644-.079-4.848-.007-3.204.005-3.583.061-4.848.05-1.169.245-1.805.408-2.228.216-.561.476-.96.895-1.382.418-.422.818-.681 1.378-.9.423-.165 1.058-.362 2.227-.417 1.266-.06 1.645-.073 4.848-.079 3.204-.007 3.584.005 4.85.061 1.169.051 1.805.245 2.228.408.561.216.96.475 1.382.895.422.419.682.818.901 1.379.165.422.362 1.056.417 2.226.06 1.266.074 1.645.08 4.848.006 3.204-.006 3.584-.061 4.849-.051 1.17-.245 1.805-.408 2.229-.216.56-.476.96-.895 1.381-.419.422-.818.681-1.379.9-.422.165-1.058.362-2.226.418-1.266.059-1.645.072-4.849.079-3.204.006-3.583-.006-4.848-.061" /></svg>
      </span>
      <span className="service-bento__brand-badge service-bento__brand-badge--linkedin">in</span>
      <span className="service-bento__brand-badge service-bento__brand-badge--youtube">
        <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      </span>
    </span>
  );
}

function CommunicationBrandMarks() {
  return (
    <span className="service-bento__brand-row service-bento__brand-row--communication" aria-hidden="true">
      <span className="service-bento__brand-badge service-bento__brand-badge--google"><GoogleBrandMark /></span>
      <span className="service-bento__brand-badge service-bento__brand-badge--microsoft"><i /><i /><i /><i /></span>
    </span>
  );
}

function ServiceVisual({ service, Icon }: { service: Service; Icon: LucideIcon }) {
  if (service.slug === "marketplace-growth") return <AmazonBrandMark />;
  if (service.slug === "digital-marketing") return <SocialPlatformMarks />;
  if (service.slug === "business-communication") return <CommunicationBrandMarks />;
  if (service.slug === "whatsapp-automation") return <WhatsAppBrandMark />;
  return <Icon size={34} strokeWidth={1.85} aria-hidden="true" />;
}

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

  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const visibleServices = services.filter(
    (service) =>
      !filterable ||
      category === "All" ||
      serviceCategory[service.slug] === category,
  );
  const selectedMedia = selected ? getServiceMedia(selected.slug) : null;

  return (
    <section className="service-bento" aria-labelledby={headingId}>
      <div className="service-bento__inner">
        <div className="service-bento__intro">
          <div className="service-bento__intro-copy">
            <div className="service-bento__eyebrow-row">
              <p className="service-bento__eyebrow">{eyebrow}</p>
            </div>
            <h2 id={headingId} className="service-bento__heading">{heading}</h2>
            <p className="service-bento__description">{description}</p>
          </div>
        </div>

        {filterable && (
          <div className="brand-filters" role="group" aria-label="Filter services">
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

        <div className="service-bento__grid" role="group" aria-label="GeneRays services">
          {visibleServices.map((service) => {
            const Icon = getServiceIcon(service.slug);
            const isActive = hovered === service.slug || focused === service.slug;
            return (
              <button
                type="button"
                key={service.slug}
                className={"service-bento__card" + (isActive ? " is-active" : "")}
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
                <span className="service-bento__icon-wrap">
                  <ServiceVisual service={service} Icon={Icon} />
                </span>
                <span className="service-bento__card-title">{service.title}</span>
                <span className="service-bento__card-arrow" aria-hidden="true"><ArrowRight size={16} /></span>
              </button>
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
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          {selected && selectedMedia && (
            <div className="service-bento__dialog-content">
              <button
                type="button"
                className="service-bento__close"
                aria-label="Close service details"
                onClick={() => dialog.current?.close()}
              >
                <X size={22} aria-hidden="true" />
              </button>
              <div className="service-bento__dialog-image">
                <img src={selectedMedia.image} alt={selectedMedia.alt} />
              </div>
              <div className="service-bento__dialog-heading">
                <span className="service-bento__dialog-eyebrow">GeneRays service</span>
                <h3 id={dialogTitleId}>{selected.title}</h3>
                <p className="service-bento__dialog-tagline">{selected.tagline}</p>
                <p className="service-bento__dialog-intro">{selected.intro}</p>
              </div>
              <div className="service-bento__details">
                <h4>What’s Included</h4>
                <ul>{selected.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <Link
                className="service-bento__more"
                to={"/services/" + selected.slug}
                onClick={() => dialog.current?.close()}
              >
                View full service <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
}
