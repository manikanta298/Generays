import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import raviSolarEngineers from "@/assets/gallery-ravi-solar-engineers.jpg";
import helloKakinadaLaunch from "@/assets/gallery-hellokakinada-launch.jpg";
import helloKakinadaAnniversary from "@/assets/gallery-hellokakinada-anniversary.jpg";
import vamsiChestHospital from "@/assets/gallery-vamsi-chest-hospital.jpg";
import rrPropertiesUgadi from "@/assets/gallery-rr-properties-ugadi.jpg";
import rrPropertiesRamNavami from "@/assets/gallery-rr-properties-ram-navami.jpg";

const projects = [
  {
    title: "Ravi Solar Engineers",
    category: "Brand Campaign",
    description: "A focused visual campaign built to communicate solar energy and EV charging with clarity.",
    image: raviSolarEngineers,
    alt: "Solar EV charging campaign poster for Ravi Solar Engineers",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "HelloKakinada Launch",
    category: "Digital Campaign",
    description: "Launch creative for a local business discovery platform.",
    image: helloKakinadaLaunch,
    alt: "HelloKakinada launch campaign",
    className: "",
  },
  {
    title: "Vamsi Chest Hospital",
    category: "Healthcare Creative",
    description: "Patient-focused awareness creative with a clear, approachable visual system.",
    image: vamsiChestHospital,
    alt: "Vamsi Chest Hospital awareness campaign",
    className: "",
  },
  {
    title: "RR Properties — Ugadi",
    category: "Seasonal Campaign",
    description: "Festival campaign creative designed for consistent brand recognition.",
    image: rrPropertiesUgadi,
    alt: "RR Properties Ugadi campaign",
    className: "",
  },
  {
    title: "RR Properties — Ram Navami",
    category: "Seasonal Campaign",
    description: "A culturally relevant campaign visual aligned with the property's brand language.",
    image: rrPropertiesRamNavami,
    alt: "RR Properties Ram Navami campaign",
    className: "",
  },
  {
    title: "HelloKakinada Anniversary",
    category: "Brand Campaign",
    description: "Anniversary creative celebrating the platform's first year with a strong visual focus.",
    image: helloKakinadaAnniversary,
    alt: "HelloKakinada anniversary campaign",
    className: "md:col-span-2",
  },
];

export default function PortfolioPage() {
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

      <section className="py-14 sm:py-16 lg:py-20" aria-labelledby="selected-work-title">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-indigo-600">
              SELECTED WORK
            </p>
            <h2 id="selected-work-title" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              A visual layer of GeneRays work.
            </h2>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className={"group relative min-h-0 overflow-hidden rounded-2xl bg-white " + project.className}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
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
    </div>
  );
}
