import { Check } from "lucide-react";
import { promises, whyGeneRays } from "@/content/site";

export function WhyGeneRaysSection() {
  return (
    <section className="border-b border-border bg-white text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-16">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Why GeneRays</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">We don&apos;t believe in templates. We believe in originality.</h2>
          <ul className="mt-7 space-y-3.5">
            {whyGeneRays.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-slate-200 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Our promise</p>
          <ul className="mt-6 space-y-4">
            {promises.map((item) => <li key={item} className="font-display text-lg font-semibold text-slate-950">{item}</li>)}
          </ul>
          <p className="mt-8 text-sm text-slate-600">Success isn&apos;t delivering files. Success is building businesses.</p>
        </div>
      </div>
    </section>
  );
}
