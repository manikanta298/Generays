import { Check } from "lucide-react";
import { promises, whyGeneRays } from "@/content/site";

export function WhyGeneRaysSection() {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent">Why GeneRays</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">We don&apos;t believe in templates. We believe in originality.</h2>
          <ul className="mt-8 space-y-3.5">
            {whyGeneRays.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-primary-foreground/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-primary-foreground/15 pt-10 md:border-l md:border-t-0 md:pl-14 md:pt-0">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-highlight">Our promise</p>
          <ul className="mt-8 space-y-5">
            {promises.map((item) => <li key={item} className="font-display text-lg font-semibold">{item}</li>)}
          </ul>
          <p className="mt-10 text-sm text-primary-foreground/70">Success isn&apos;t delivering files. Success is building businesses.</p>
        </div>
      </div>
    </section>
  );
}
