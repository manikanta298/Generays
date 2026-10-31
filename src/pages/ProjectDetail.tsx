import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { websiteProjects } from "@/content/projects";
import NotFoundPage from "./NotFound";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = websiteProjects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  const related = websiteProjects.filter(
    (item) => item.slug !== slug && item.industry === project.industry,
  );
  return (
    <>
      <PageHero
        eyebrow={`${project.industry} / Selected work`}
        title={project.title}
        subtitle={project.description}
      >
        <Link
          to="/portfolio"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>
      </PageHero>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Project overview</p>
            <h2 className="mt-4 text-3xl font-bold">{project.category}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <a
              className="brand-button mt-7"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore live website <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <dl className="space-y-6 rounded-2xl border border-border bg-primary-soft p-7">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Project
              </dt>
              <dd className="mt-2 font-semibold">{project.title}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Industry
              </dt>
              <dd className="mt-2">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </dt>
              <dd className="mt-2">{project.category}</dd>
            </div>
          </dl>
        </div>
      </section>
      {related.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="text-2xl font-bold">More in {project.industry}</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  className="rounded-xl border border-border px-5 py-4 text-primary"
                  to={`/portfolio/${item.slug}`}
                >
                  {item.title}{" "}
                  <ArrowUpRight
                    className="inline-block"
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14">
          <h2 className="text-2xl font-bold">
            Have a similar project in mind?
          </h2>
          <Link to="/contact" className="brand-button">
            Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
