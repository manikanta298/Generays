import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FinalCallSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-28">
        <p className="eyebrow">Final call</p>
        <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-5xl">Your business already exists. Now it&apos;s time to build a brand.</h2>
        <p className="mt-6 text-base text-muted-foreground">Thousands of businesses compete every day. Only a handful become unforgettable. Let&apos;s create the one people remember.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Start Your Brand Journey <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to="/contact" className="inline-flex items-center rounded-sm border border-primary/30 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft">Schedule a Free Brand Consultation</Link>
        </div>
      </div>
    </section>
  );
}
