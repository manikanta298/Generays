import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/heroimage.png";
import "./HomeHeroReference.css";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__container">
        <div className="home-hero__content">
          <div className="home-hero__eyebrow">
            <span>Digital solutions that drive real growth</span>
            <span className="home-hero__eyebrow-dot" aria-hidden="true" />
          </div>

          <h1 id="home-hero-title" className="home-hero__title">
            <span>We Build Brands</span>
            <span>
              That <em>Inspire</em>
            </span>
          </h1>

          <p className="home-hero__description">
            Generays is a digital growth partner for forward-thinking businesses.
            We blend strategy, creativity, and technology to deliver measurable success.
          </p>

          <div className="home-hero__actions">
            <a className="home-hero__primary" href="/services">
              Explore Services
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="home-hero__secondary" href="/services">
              See Our Work
            </a>
          </div>

          <div className="home-hero__trust" aria-label="Trusted by more than 100 businesses">
            <div className="home-hero__avatars" aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>100+</strong>
            </div>
            <div>
              <b>Trusted by 100+ Businesses</b>
              <span>to scale and succeed</span>
            </div>
          </div>
        </div>

        <div className="home-hero__visual">
          <img
            className="home-hero__image"
            src={heroImage}
            alt="Digital growth strategy illustration"
          />
        </div>
      </div>
    </section>
  );
}
