import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const websiteProjects = [
  {
    title: "JATAS Ayurveda",
    category: "Ayurveda & Wellness Website",
    description: "A premium wellness-focused website for JATAS Ayurveda.",
    url: "https://jatasayurveda.com/",
    accent: "from-emerald-600 to-teal-400",
  },
  {
    title: "RR Properties",
    category: "Real Estate Website",
    description: "A polished digital presence for RR Properties and its real-estate offering.",
    url: "https://rrproperties.co.in/",
    accent: "from-indigo-600 to-blue-400",
  },
  {
    title: "ZENAIZ",
    category: "Engineering Internship Platform",
    description: "An engineering-focused digital experience for ZENAIZ.",
    url: "https://www.zenaiz.com/",
    accent: "from-violet-600 to-fuchsia-400",
  },
  {
    title: "Anish Dental",
    category: "Healthcare Website",
    description: "A dental-care website designed to present services and patient information clearly.",
    url: "https://anish-dental-five.vercel.app/",
    accent: "from-cyan-600 to-sky-400",
  },
  {
    title: "Beauty Parlour",
    category: "Beauty & Salon Website",
    description: "A modern beauty-parlour website experience.",
    url: "https://beauty-parlour-website-ruby.vercel.app/",
    accent: "from-rose-600 to-pink-400",
  },
  {
    title: "GL Sports",
    category: "Sports Website",
    description: "A dedicated sports-focused web experience.",
    url: "https://gl-sports.vercel.app/",
    accent: "from-orange-600 to-amber-400",
  },
  {
    title: "Eliphas Shipping Services",
    category: "Shipping & Logistics Website",
    description: "A business website for shipping and logistics services.",
    url: "https://eliphas-shipping-services.vercel.app/",
    accent: "from-slate-700 to-slate-400",
  },
  {
    title: "Edu-Tech",
    category: "Education Platform",
    description: "An education-focused digital experience for learning and technology.",
    url: "https://edu-tech123-uzav.vercel.app/",
    accent: "from-blue-700 to-cyan-400",
  },
];
export default function PortfolioPage() {
  const [previewProject, setPreviewProject] = useState<(typeof websiteProjects)[number] | null>(null);

  useEffect(() => {
    if (!previewProject) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewProject]);

  return (
    <div className="bg-[#F4F6FB]">
      <section className="border-b border-slate-200 bg-[#F4F6FB] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-indigo-600">
            PORTFOLIO
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl md:text-6xl">
            Work that turns{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              ideas into experiences.
            </span>
          </h1>
          <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400" />
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Explore selected GeneRays creative work across brand campaigns,
            digital experiences and visual communication.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="website-projects-title">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-indigo-600">
              WEB PROJECTS
            </p>
            <h2 id="website-projects-title" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Websites built for real businesses.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
              Explore live website experiences created across healthcare, education, real estate, wellness, sports and business services.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {websiteProjects.map((project) => (
              <article
                key={project.title}
                className="group flex min-w-0 flex-[1_1_calc(50%-0.625rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#F4F6FB] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_-30px_rgba(15,23,42,0.5)] sm:flex-[1_1_calc(50%-0.625rem)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <iframe
                    src={project.url}
                    title={`${project.title} live website preview`}
                    className="absolute inset-0 h-full w-full border-0 bg-white"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewProject(project)}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Preview
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                    >
                      Open website
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
            Some websites may disable embedded previews for security reasons. If a preview is blocked, use the Open website button to view the project directly.
          </p>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-600">
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
      {previewProject && (
        <div
          className="fixed inset-0 z-[100] flex h-[100dvh] w-full items-center justify-center bg-slate-950/95 p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} live website preview`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewProject(null);
            }
          }}
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {previewProject.title}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {previewProject.url}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                aria-label="Close live website preview"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-white">
              <iframe
                src={previewProject.url}
                title={`${previewProject.title} full-screen live preview`}
                className="h-full w-full border-0"
                allow="fullscreen"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
