import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./HomeHeroReference.css";
import heroImage from "@/assets/heroimage.png";


export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="hero-container">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            DIGITAL SOLUTIONS THAT DRIVE REAL GROWTH
            <span className="hero-eyebrow__dot" aria-hidden="true" />
          </span>

          <h1 id="home-hero-title" className="hero-title">
            <span>We Build Brands</span>
            <span>
              That <em>Inspire</em>
            </span>
          </h1>

          <p className="hero-description">
            Generays is a digital growth partner for forward-thinking businesses.
            We blend strategy, creativity, and technology to deliver measurable success.
          </p>

          <div className="hero-ctas">
            <Link to="/services" className="hero-cta hero-cta--primary">
              Explore Services
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/services" className="hero-cta hero-cta--secondary">
              See Our Work
            </Link>
          </div>

          <div className="hero-trust">
            <div className="hero-avatars" aria-hidden="true">
              {trustedAvatars.map((src) => (
                <img key={src} src={src} alt="" />
              ))}
              <span>100+</span>
            </div>
            <p>
              <strong>Trusted by 100+ Businesses</strong>
              <span>to scale and succeed</span>
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-visual__image"
            src={heroImage}
            alt="Generays growth strategy"
          />
        </div>         

          <Sparkles className="hero-spark" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
