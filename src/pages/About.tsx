import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/page-hero";
import { aboutImage } from "@/content/media";
import { promises, transformation } from "@/content/site";
import { AboutOriginality } from "@/components/about-originality";
import companyProfilePdf from "@/assets/GenerayscompanyProfile.pdf";

export default function AboutPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  return (
    <>
      <PageHero
        eyebrow="About GeneRays"
        title="We don't market businesses. We build brands that people remember."
        subtitle="Every successful business is built from a blueprint. Before a building, product or startup takes shape, there is a plan. We use the same philosophy for brands."
        image={aboutImage}
        imageAlt="Futuristic GeneRays brand identity blueprint and digital ecosystem"
        transparentImage
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The philosophy"
              title="Blueprint first. Everything else second."
              subtitle="Create the strategic blueprint first, then build identity, digital presence, marketing and growth around it. That order is what turns spending into compounding brand equity."
            />
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View Company Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>A logo without identity is decoration. A website without strategy is a brochure. Social media without consistency is noise. Advertising without branding is expense.</p>
            <p>At GeneRays, every service connects together to create one powerful business ecosystem — so each deliverable makes the next one stronger instead of starting over.</p>
            <p className="font-display text-lg font-semibold text-foreground">Because your business deserves more than outsourced creativity. It deserves ownership.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="Why GeneRays" title="We believe in originality." />
          <div className="mt-12"><AboutOriginality /></div>
        </div>
      </section>

      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-highlight">Our promise</p>
          <div className="mt-10 grid gap-8 md:grid-cols-4">{promises.map((item) => <p key={item} className="font-display text-lg font-semibold leading-snug">{item}</p>)}</div>
          <p className="mt-12 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/70">Success isn&apos;t delivering files. Success is building businesses.</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="The shift" title="What changes when the blueprint exists." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            <div className="bg-background p-7"><p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before</p><ul className="mt-5 space-y-3 text-sm text-muted-foreground">{transformation.map((row) => <li key={row.before}>{row.before}</li>)}</ul></div>
            <div className="bg-background p-7"><p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-primary">After</p><ul className="mt-5 space-y-3 text-sm font-medium text-foreground">{transformation.map((row) => <li key={row.after}>{row.after}</li>)}</ul></div>
          </div>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">Start Your Brand Journey <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {isProfileOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="company-profile-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsProfileOpen(false);
          }}
        >
          <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
              <h2 id="company-profile-title" className="font-display text-sm font-bold text-slate-950 sm:text-base">
                GeneRays Company Profile
              </h2>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                aria-label="Close company profile"
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <iframe
              title="GeneRays Company Profile PDF"
              src={companyProfilePdf + "#toolbar=0&navpanes=0&scrollbar=1"}
              className="min-h-0 flex-1 border-0"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
