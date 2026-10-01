import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="blueprint-grid grid-drift pointer-events-none absolute inset-0 opacity-70" />
      <div className="aurora-bloom pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full" />
      <div className={`relative mx-auto max-w-6xl gap-12 px-5 py-20 md:py-24 ${image ? "grid md:grid-cols-[1.05fr_0.95fr] md:items-center" : ""}`}>
        <div>
          <p className="eyebrow rise-in">{eyebrow}</p>
          <h1 className="rise-in mt-5 max-w-3xl text-4xl font-bold leading-[1.08] text-foreground md:text-5xl">{title}</h1>
          {subtitle ? <p className="rise-in mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p> : null}
          {children}
        </div>

        {image ? (
          <div className="group relative hidden min-h-[360px] items-center justify-center md:flex">
            <img
              src={image}
              alt={imageAlt ?? ""}
              loading="eager"
              fetchPriority="high"
              className="h-auto max-h-[460px] w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
      <div className="mt-5 h-px w-16 rounded-full bg-gradient-to-r from-primary via-neon-violet to-neon-cyan" />
      {subtitle ? <p className="mt-5 text-base leading-relaxed text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
