import heroImage from "@/assets/heroimage.png";
import "./HomeHeroReference.css";

export function HomeHero() {
  return (
    <section className="home-hero" aria-label="Generays hero">
      <div className="hero-container">
        <div className="hero-visual">
          <img
            className="hero-visual__image"
            src={heroImage}
            alt="Generays digital growth strategy"
          />
        </div>
      </div>
    </section>
  );
}
