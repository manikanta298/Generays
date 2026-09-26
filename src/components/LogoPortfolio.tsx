import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./LogoPortfolio.css";

const logos = [
  ["https://hellokakinada.in/wp-content/uploads/2026/09/APEX.png", "APEX"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/alu-tech-white.jpg", "Alu Tech"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Cogniking.jpg", "Cogniking"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Deena.jpg", "Deena"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Dream.jpg", "Dream"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Gems-Trust-3.png", "Gems Trust"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/HH-scaled.jpg", "HH"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Just-you.jpg", "Just You"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/logo-2.jpg", "Logo Design"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/mockups-scaled.jpg", "Brand Mockup"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/NEW-COLOR-LOGO.jpg", "New Color Logo"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Parameswara-Traders-jpeg-2.jpg", "Parameswara Traders"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/PJ.jpg", "PJ"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/svs.jpg", "SVS"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/UTC.jpg", "UTC"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Vlp-swan.jpg", "VLP Swan"],
  ["https://hellokakinada.in/wp-content/uploads/2026/09/Vybe-scaled.jpg", "Vybe"],
] as const;

export function LogoPortfolio() {
  const [selected, setSelected] = useState<(typeof logos)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section className="logo-portfolio" aria-labelledby="logo-portfolio-title">
      <div className="logo-portfolio__container">
        <header className="logo-portfolio__heading">
          <span>Our work</span>
          <h2 id="logo-portfolio-title">Logo Portfolio</h2>
        </header>

        <div className="logo-portfolio__gallery" role="list">
          {logos.map(([src, alt]) => (
            <button
              key={src}
              type="button"
              className="logo-portfolio__item"
              role="listitem"
              onClick={() => setSelected([src, alt])}
              aria-label={"Preview " + alt + " logo"}
            >
              <span className="logo-portfolio__media">
                <img src={src} alt={alt} loading="lazy" decoding="async" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="logo-portfolio__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected[1] + " logo preview"}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <button
            type="button"
            className="logo-portfolio__close"
            onClick={() => setSelected(null)}
            aria-label="Close logo preview"
          >
            <X size={24} />
          </button>
          <img src={selected[0]} alt={selected[1]} />
        </div>
      )}
    </section>
  );
}
