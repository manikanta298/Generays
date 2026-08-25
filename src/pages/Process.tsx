import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { processImage } from "@/content/media";
import { ecosystem, framework } from "@/content/site";


export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Brand engineering framework" title="The blueprint, stage by stage." subtitle="Marketing begins only after your foundation is strong. Here is the exact order we work in — and why it protects your budget." image={processImage} imageAlt="Futuristic five-stage GeneRays process visualization" />
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <ol className="relative border-l border-border pl-8 md:pl-12">
            {framework.map((stage) => (
              <li key={stage.step} className="relative pb-14 last:pb-0">
                <span className="absolute -left-[calc(2rem+1px)] grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-primary/30 bg-background font-display text-xs font-bold text-primary md:-left-[calc(3rem+1px)]">{stage.step}</span>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">{stage.title}</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">The ecosystem</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-foreground md:text-4xl">Every stage feeds the next.</h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {ecosystem.map((node, i) => <span key={node} className="flex items-center gap-3"><span className="rounded-sm border border-primary/25 bg-background px-3.5 py-2 font-display text-sm font-semibold text-primary">{node}</span>{i < ecosystem.length - 1 ? <ArrowRight className="h-4 w-4 text-muted-foreground" /> : null}</span>)}
          </div>
          <Link href="/services" className="mt-12 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">See what we build <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
