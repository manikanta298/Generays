import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServiceMedia } from "@/content/media";
import type { Service } from "@/content/site";

export function IconChip({ icon: Icon, accent, size = "md", className }: {
  icon: LucideIcon; accent: string; size?: "sm" | "md"; className?: string;
}) {
  return (
    <span aria-hidden className={cn("icon-chip shrink-0", accent, size === "sm" && "h-8 w-8 rounded-md", className)}>
      <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2} />
    </span>
  );
}

export function ServiceCard({ service, detail }: { service: Service; detail?: string }) {
  const media = getServiceMedia(service.slug);

  return (
    <Link
      to={`/services/${service.slug}`}
      aria-label={`Explore ${service.title}`}
      className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="service-card-media scanline relative aspect-[16/10] overflow-hidden">
        <img
          src={media.image}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover saturate-[0.65] brightness-[0.8] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-150 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-95" />
        <div className="blueprint-grid-fine absolute inset-0 opacity-40" />
        <span className="absolute left-4 top-4 flex items-center gap-3">
          <IconChip icon={media.icon} accent={media.accent} className="transition-transform duration-500 group-hover:scale-110" />
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-primary-foreground/90">{service.letter}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-primary/5 text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">{service.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
          </div>
        </div>
        {detail ? <p className="mt-4 text-xs leading-5 text-muted-foreground/80">{detail}</p> : null}
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
