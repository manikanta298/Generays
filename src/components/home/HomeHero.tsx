import { ArrowDown, ArrowRight, Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office.png";

const heroStats = [
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

const serviceStack = ["Strategy", "Design", "Development", "Growth"];

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Plus className="home-hero__mark home-hero__mark--plus" aria-hidden="true" />
      <span className="home-hero__mark home-hero__mark--copyright" aria-hidden="true">
        &copy;
      </span>

      <div className="home-hero__inner">
        <h2 className="home-hero__wordmark" aria-hidden="true">
          GENERAYS
        </h2>

        <div className="home-hero__frame">
          <img
            className="home-hero__image"
            src={heroOffice}
            alt="GeneRays studio: strategists and engineers building a client's digital brand"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <div className="home-hero__panel" aria-label="GeneRays engagement stages">
            <ul>
              {serviceStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/services" className="home-hero__showreel">
              <span className="home-hero__showreel-icon">
                <Play aria-hidden="true" />
              </span>
              View Our Work
            </Link>
          </div>
        </div>

        <div className="home-hero__bottom">
          <div className="home-hero__copy">
            <h1 id="home-hero-title" className="home-hero__title">
              Ideas<span>.</span> Identity<span>.</span> Impact<span>.</span>
            </h1>
            <p className="home-hero__description">
              A brand engineering company crafting bold identities and digital experiences that turn businesses into brands people remember.
            </p>
            <button type="button" className="home-hero__scroll" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
              Scroll to explore <ArrowDown aria-hidden="true" />
            </button>
          </div>

          <div className="home-hero__side">
            <div className="home-hero__stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="home-hero__cta">
              Build My Brand <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
