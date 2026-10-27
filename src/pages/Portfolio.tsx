import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AgencyCallToAction } from "@/components/agency/AgencySections";
import { galleryImages } from "@/content/gallery";
import { websiteProjects } from "@/content/projects";

const projectColors = [
  "#244739",
  "#272e61",
  "#49326e",
  "#175062",
  "#6b3452",
  "#734325",
  "#263749",
  "#254577",
];
export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Ideas into experiences.
            <br />
            <span>Businesses into brands.</span>
          </>
        }
        subtitle="Explore GeneRays websites and creative communication across healthcare, education, real estate, wellness and more."
      />
      <section
        className="gr-section gr-services"
        aria-labelledby="website-projects-title"
      >
        <div className="gr-container">
          <div className="gr-section-head">
            <div>
              <p className="gr-eyebrow">Digital experiences</p>
              <h2 id="website-projects-title">Built for real businesses.</h2>
            </div>
            <p>
              Explore the live projects in a new tab. Each has its own audience,
              purpose and personality.
            </p>
          </div>
          <div className="gr-project-grid">
            {websiteProjects.map((project, index) => (
              <article className="gr-project-card" key={project.url}>
                <div
                  className="gr-project-cover"
                  style={
                    { "--project-color": projectColors[index] } as CSSProperties
                  }
                >
                  <span>GeneRays / Website project 0{index + 1}</span>
                  <h3>{project.title}</h3>
                </div>
                <div className="gr-project-copy">
                  <small>{project.category}</small>
                  <p>{project.description}</p>
                  <a
                    className="gr-text-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {project.title}
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="gr-sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="gr-section"
        id="creative-work"
        aria-labelledby="creative-work-title"
      >
        <div className="gr-container">
          <div className="gr-section-head">
            <div>
              <p className="gr-eyebrow">Creative communication</p>
              <h2 id="creative-work-title">A brand in every detail.</h2>
            </div>
            <p>
              Campaigns, awareness creatives and brand moments from our existing
              visual portfolio.
            </p>
          </div>
          <div className="gr-creative-grid">
            {galleryImages.map((item) => (
              <figure key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <figcaption>
                  <h3>{item.text}</h3>
                  <p>{item.alt}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <AgencyCallToAction />
    </>
  );
}
