import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/page-hero";
import { aboutImage } from "@/content/media";
import { promises, transformation, whyGeneRays } from "@/content/site";


export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About GeneRays" title="We don't market businesses. We build brands that people remember." subtitle="Every successful business is built from a blueprint. Before a building, product or startup takes shape, there is a plan. We use the same philosophy for brands." image={aboutImage} imageAlt="Futuristic GeneRays brand identity blueprint and digital ecosystem" />
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
          <SectionHeading eyebrow="The philosophy" title="Blueprint first. Everything else second." subtitle="Create the strategic blueprint first, then build identity, digital presence, marketing and growth around it. That order is what turns spending into compounding brand equity." />
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
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whyGeneRays.map((point) => <li key={point} className="flex gap-3 bg-background p-7 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{point}</li>)}
          </ul>
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
    </>
  );
}
