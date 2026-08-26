import { ArrowRight, Sparkles } from "lucide-react";
import { ecosystem } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";

const points = [
  ["A logo without identity", "is decoration."],
  ["A website without strategy", "is a brochure."],
  ["Social media without consistency", "is noise."],
  ["Advertising without branding", "is expense."],
] as const;

export function CorePositioningSection() {
  return (
    <section className="border-b border-border bg-primary-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading eyebrow="Core positioning" title="We don't sell services. We build business ecosystems." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
          {points.map(([lead, tail]) => (
            <div key={lead} className="group bg-background p-7 transition-all duration-300 hover:bg-primary-soft">
              <div className="mb-5 inline-flex rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-primary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-display text-base font-semibold text-foreground">{lead}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{tail}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-base text-muted-foreground">
          At GeneRays, every service connects together to create one powerful business ecosystem.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
          {ecosystem.map((node, i) => (
            <span key={node} className="flex items-center gap-3">
              <span className="rounded-sm border border-primary/25 bg-background px-3.5 py-2 font-display text-sm font-semibold text-primary">{node}</span>
              {i < ecosystem.length - 1 ? <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" /> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
