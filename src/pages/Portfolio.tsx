import { ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { websiteProjects, projectIndustries } from "@/content/projects";

const pageSize = 12;

export default function PortfolioPage() {
  const [params, setParams] = useSearchParams();
  const requestedIndustry = params.get("industry") ?? "All";
  const industry = projectIndustries.includes(requestedIndustry) ? requestedIndustry : "All";
  const projects = websiteProjects.filter(
    (project) => industry === "All" || project.industry === industry,
  );
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize));
  const requestedPage = Number(params.get("page") ?? 1);
  const page = Number.isInteger(requestedPage)
    ? Math.min(pageCount, Math.max(1, requestedPage))
    : 1;

  function updateListing(nextIndustry: string, nextPage = 1) {
    const updated = new URLSearchParams(params);
    if (nextIndustry === "All") updated.delete("industry");
    else updated.set("industry", nextIndustry);
    if (nextPage === 1) updated.delete("page");
    else updated.set("page", String(nextPage));
    setParams(updated);
  }

  return (
    <div className="bg-[#F4F6FB]">
      <section className="blueprint-grid-fine px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="portfolio-heading">
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold tracking-widest text-primary">SELECTED PROJECTS</p>
            <h1 id="portfolio-heading" className="text-4xl font-extrabold text-slate-950 sm:text-6xl">
              Our Case Studies
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Explore websites GeneRays built across healthcare, education, real estate, wellness, sports, and business services.
            </p>
          </header>
          <div className="brand-filters justify-center" role="group" aria-label="Filter projects by industry">
            {projectIndustries.map((item) => (
              <button key={item} type="button" aria-pressed={industry === item} onClick={() => updateListing(item)}>
                {item}
              </button>
            ))}
          </div>
          <p className="brand-result-count text-center" role="status">{projects.length} projects shown</p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice((page - 1) * pageSize, page * pageSize).map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <iframe
                      src={project.url}
                      title={`${project.title} website preview`}
                      className="pointer-events-none absolute inset-0 size-full border-0"
                      tabIndex={-1}
                      aria-hidden="true"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <span className="absolute top-4 left-4 rounded-md bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white">
                      {project.industry}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-bold tracking-wide text-primary uppercase">{project.title}</p>
                    <h2 className="text-xl leading-tight font-bold text-slate-950">{project.category}</h2>
                    <p className="mt-3 mb-5 text-sm leading-relaxed text-slate-600">{project.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 border-t border-slate-200 pt-4 text-sm font-bold text-primary group-hover:underline">
                      View Case Study <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          {pageCount > 1 && (
            <nav className="brand-filters justify-center" aria-label="Case study pagination">
              <button type="button" disabled={page === 1} onClick={() => updateListing(industry, page - 1)}>Previous</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => (
                <button key={item} type="button" aria-current={page === item ? "page" : undefined} onClick={() => updateListing(industry, item)}>
                  {item}
                </button>
              ))}
              <button type="button" disabled={page === pageCount} onClick={() => updateListing(industry, page + 1)}>Next</button>
            </nav>
          )}
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary">
              HAVE A PROJECT IN MIND?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Let&apos;s build something meaningful.
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
