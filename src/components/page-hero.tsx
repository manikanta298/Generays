import Image, { type StaticImageData } from "next/image";
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
  image?: StaticImageData;
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
          <div className="scanline group relative hidden overflow-hidden rounded-2xl border border-primary/25 bg-card shadow-[var(--shadow-glow)] md:block">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              width={1280}
              height={960}
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-full w-full object-cover saturate-[0.7] brightness-[0.8] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.02] group-hover:saturate-150 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/45 via-transparent to-neon-violet/25 mix-blend-screen transition-opacity duration-700 group-hover:opacity-70" />
            <div className="blueprint-grid-fine absolute inset-0 opacity-40" />
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
