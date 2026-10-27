import type { ReactNode } from "react";
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  transparentImage = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  transparentImage?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="gr-page-hero">
      <div
        className={`gr-container gr-page-hero-inner ${image ? "gr-page-hero-with-image" : ""}`}
      >
        <div>
          <p className="gr-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {subtitle && <p className="gr-page-subtitle">{subtitle}</p>}
          {children}
        </div>
        {image && (
          <div
            className={`gr-page-hero-image ${transparentImage ? "gr-image-transparent" : ""}`}
          >
            <img
              src={image}
              alt={imageAlt ?? ""}
              width="700"
              height="525"
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="gr-section-heading">
      {eyebrow && <p className="gr-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
