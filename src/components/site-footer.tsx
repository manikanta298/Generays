import Link from "next/link";
import { services } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl font-bold tracking-tight">GeneRays</div>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/75">
            Building Brands. Engineering Growth. Creating Digital Impact.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/60">
            We don&apos;t market businesses. We build brands that people remember.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-sm text-primary-foreground/85 transition-opacity hover:opacity-70">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              { href: "/about", label: "About GeneRays" },
              { href: "/process", label: "Brand Engineering Process" },
              { href: "/services", label: "All Services" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-primary-foreground/85 transition-opacity hover:opacity-70">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} GeneRays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
