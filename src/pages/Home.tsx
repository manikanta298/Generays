import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/heroimage.png";
import { ServiceCatalogue } from "@/components/agency/ServiceCatalogue";
import {
  AboutIntro,
  SelectedWork,
  ProcessOverview,
  FrequentlyAskedQuestions,
  AgencyCallToAction,
} from "@/components/agency/AgencySections";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="gr-home">
      <section className="gr-hero" aria-labelledby="home-hero-title">
        <div className="gr-container gr-hero-grid">
          <div className="gr-hero-copy">
            <p className="gr-eyebrow">
              <span className="gr-status-dot" /> Strategy. Creativity.
              Technology.
            </p>
            <h1 id="home-hero-title">
              Building brands.
              <br />
              <span>
                Engineering
                <br />
                growth.
              </span>
            </h1>
            <p>
              We turn ambitious businesses into brands people remember. From the
              first blueprint to your next stage of growth, we connect every
              piece.
            </p>
            <div className="gr-hero-actions">
              <Link className="gr-button" to="/contact">
                Build my brand <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <Link className="gr-hero-work" to="/portfolio">
                See our work <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <div className="gr-hero-note">
              <span>11 connected services</span>
              <span>One growth partner</span>
            </div>
          </div>
          <div className="gr-hero-visual">
            <span className="gr-visual-label">
              The thinking behind your next big thing.
            </span>
            <img
              src={heroImage}
              alt="Strategy, creative thinking and data working together for digital growth"
              width="1227"
              height="1284"
              fetchPriority="high"
            />
            <span className="gr-visual-footer">
              GENE<span>RAYS</span> / BRAND ENGINEERING
            </span>
          </div>
        </div>
        <a className="gr-scroll-link" href="#what-we-do">
          Explore the possibilities <ArrowDown size={16} aria-hidden="true" />
        </a>
      </section>
      <div
        className="gr-capability-strip"
        aria-label="Our connected capabilities"
      >
        <div className="gr-container">
          <span>Brand strategy</span>
          <span aria-hidden="true">✳</span>
          <span>Digital experiences</span>
          <span aria-hidden="true">✳</span>
          <span>Creative communication</span>
          <span aria-hidden="true">✳</span>
          <span>Business growth</span>
        </div>
      </div>
      <AboutIntro />
      <section
        className="gr-section gr-services"
        id="what-we-do"
        aria-labelledby="services-heading"
      >
        <div className="gr-container">
          <div className="gr-section-head">
            <div>
              <p className="gr-eyebrow">What we do</p>
              <h2 id="services-heading">
                Built individually.
                <br />
                <span>Stronger together.</span>
              </h2>
            </div>
            <div>
              <p>
                From defining your identity to building the systems behind your
                growth. Start with what you need. Connect the rest as you grow.
              </p>
              <Link className="gr-text-link" to="/services">
                Explore all 11 services{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ServiceCatalogue featured />
        </div>
      </section>
      <SelectedWork />
      <ProcessOverview />
      <TestimonialsSection />
      <FrequentlyAskedQuestions />
      <AgencyCallToAction />
    </div>
  );
}
