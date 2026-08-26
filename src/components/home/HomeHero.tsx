import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ecosystem } from "@/content/site";
import heroBlueprint from "@/assets/hero-blueprint.jpg";
import geneRaysLogoMark from "@/assets/generays-logo-mark.svg";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__grid" aria-hidden="true" />
      <div className="home-hero__glow home-hero__glow--one" aria-hidden="true" />
      <div className="home-hero__glow home-hero__glow--two" aria-hidden="true" />

      <div className="home-hero__inner">
        <div className="home-hero__watermark" aria-hidden="true">
          GENE
        </div>

        <div className="home-hero__topline">
          <img className="home-hero__brandmark" src={geneRaysLogoMark} alt="GeneRays" />
          <span className="home-hero__brandname">GeneRays</span>
          <span className="home-hero__separator" />
          <span className="home-hero__eyebrow">Brand Engineering Company</span>
        </div>

        <div className="home-hero__content">
          <div className="home-hero__copy">
            <p className="home-hero__kicker">
              <Sparkles aria-hidden="true" />
              Strategy first. Identity next. Growth always.
            </p>
            <h1 id="home-hero-title" className="home-hero__title">
              Stop looking like every other business.
              <span>Become the brand everyone remembers.</span>
            </h1>
            <p className="home-hero__description">
              Most businesses sell products. The unforgettable ones build brands. At GeneRays we engineer your entire digital identity — from your very first logo to the last customer click.
            </p>
            <div className="home-hero__actions">
              <Link to="/contact" className="home-hero__primary">
                Build My Brand <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/services" className="home-hero__secondary">
                View Our Work
              </Link>
            </div>

            <div className="home-hero__scroll" aria-hidden="true">
              <span>Scroll to explore</span>
              <ArrowDown />
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__image-shell">
              <img
                className="home-hero__image"
                src={heroBlueprint}
                alt="Futuristic digital blueprint representing GeneRays brand engineering"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              <div className="home-hero__image-label">
                <span className="home-hero__image-label-dot" />
                Digital experience blueprint
              </div>

              <div className="home-hero__service-stack" aria-label="GeneRays service system">
                {[
                  "Strategy",
                  "Design",
                  "Development",
                  "Growth",
                ].map((item, index) => (
                  <div key={item} className="home-hero__stack-row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-hero__blueprint-panel">
              <span className="home-hero__panel-title">Brand ecosystem</span>
              <ol>
                {ecosystem.slice(0, 5).map((node, index) => (
                  <li key={node}>
                    <span>{index + 1}</span>
                    {node}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="home-hero__stats" aria-label="GeneRays capabilities">
          <div>
            <strong>01</strong>
            <span>Plan before building</span>
          </div>
          <div>
            <strong>05</strong>
            <span>Connected brand stages</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>Room to scale</span>
          </div>
        </div>
      </div>
    </section>
  );
}
