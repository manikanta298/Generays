import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { framework, services } from "@/content/site";
import { getServiceMedia } from "@/content/media";
import { IconChip } from "@/components/futuristic";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service not found — GeneRays", robots: { index: false, follow: false } };
  return {
    title: `${service.title} — GeneRays`,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} — GeneRays`, description: service.intro, type: "website" as const },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const media = getServiceMedia(service.slug);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="blueprint-grid fade-mask-b pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div>
            <Link href="/services" className="eyebrow inline-flex items-center gap-2">Services / {service.letter}</Link>
            <div className="mt-6 flex items-center gap-4">
              <IconChip icon={media.icon} accent={media.accent} />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{service.letter} / GeneRays capability</span>
            </div>
            <h1 className="rise-in mt-5 max-w-3xl text-4xl font-bold leading-[1.08] text-foreground md:text-5xl">{service.title}</h1>
            <p className="rise-in mt-5 max-w-2xl font-display text-lg font-semibold text-primary">{service.tagline}</p>
            <p className="rise-in mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{service.intro}</p>
          </div>
          <div className="scanline group relative overflow-hidden rounded-2xl border border-primary/25 shadow-[var(--shadow-glow)]">
            <Image src={media.image} alt={media.alt} width={1024} height={768} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover saturate-[0.75] transition-all duration-700 group-hover:scale-105 group-hover:saturate-150" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-neon-violet/20 mix-blend-screen" />
            <div className="blueprint-grid-fine absolute inset-0 opacity-30" />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">What's included</h2>
          <div className="mt-4 h-px w-16 bg-primary" />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item) => <li key={item} className="flex items-start gap-3 bg-background px-6 py-4 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">How we deliver it</h2>
          <div className="mt-4 h-px w-16 bg-primary" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-5">
            {framework.map((stage) => <div key={stage.step} className="bg-background p-6"><span className="font-display text-2xl font-bold text-primary/25">{stage.step}</span><h3 className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-foreground">{stage.title}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Pairs well with</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {others.map((other) => <Link key={other.slug} href={`/services/${other.slug}`} className="group bg-background p-7 transition-colors hover:bg-primary-soft"><h3 className="font-display text-base font-bold text-foreground">{other.title}</h3><p className="mt-2 text-sm text-muted-foreground">{other.tagline}</p><span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}
          </div>
          <div className="mt-16 rounded-sm border border-primary/20 bg-primary p-10 text-primary-foreground">
            <h2 className="max-w-xl text-2xl font-bold leading-snug md:text-3xl">Ready to build {service.title.toLowerCase()} that actually works?</h2>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-sm bg-background px-6 py-3.5 text-sm font-semibold text-primary">Schedule a Free Brand Consultation <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
