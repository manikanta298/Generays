import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Blocks,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  Camera,
  Check,
  Cloud,
  Code2,
  CreditCard,
  Database,
  FileBadge2,
  FileImage,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Images,
  Layers3,
  LayoutDashboard,
  LineChart,
  Mail,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  PenTool,
  ReceiptText,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  Users,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { framework, services } from "@/content/site";
import { getServiceMedia } from "@/content/media";
import { IconChip } from "@/components/futuristic";
import NotFoundPage from "@/pages/NotFound";
import "./ServiceDetail.css";

const itemIcons: Array<[string[], LucideIcon]> = [
  [["corporate", "business", "brand"], BriefcaseBusiness],
  [["logo", "lettermark", "wordmark", "mascot", "emblem", "mark"], PenTool],
  [["identity", "colour", "color", "typography", "guidelines", "voice"], Palette],
  [["strategy", "positioning"], Target],
  [["minimal", "modern", "luxury", "handcrafted", "custom"], Sparkles],
  [["profile", "brochure", "catalogue", "deck", "cover"], FileImage],
  [["flyer", "banner", "hoarding", "standee"], Megaphone],
  [["card", "letterhead", "certificate", "invitation"], FileBadge2],
  [["social", "reels", "content", "campaign"], Images],
  [["menu", "packaging", "label", "box"], ShoppingBag],
  [["website", "landing"], Globe2],
  [["educational", "school"], GraduationCap],
  [["government"], Building2],
  [["portfolio"], MonitorSmartphone],
  [["ngo"], Users],
  [["hospital"], HeartPulse],
  [["hotel"], Hotel],
  [["restaurant"], Store],
  [["membership", "portal"], Users],
  [["booking", "appointment"], CalendarCheck2],
  [["real estate"], Building2],
  [["cms"], Database],
  [["woocommerce", "shopify", "magento", "commerce", "store"], ShoppingBag],
  [["marketplace", "amazon"], Store],
  [["b2b", "b2c"], BriefcaseBusiness],
  [["payment"], CreditCard],
  [["inventory"], Layers3],
  [["order"], ReceiptText],
  [["application", "software", "erp", "crm"], Code2],
  [["billing", "pos"], ReceiptText],
  [["dashboard", "admin"], LayoutDashboard],
  [["cloud"], Cloud],
  [["facebook", "instagram", "linkedin", "youtube", "pinterest", "snapchat", "twitter", "x ("], Smartphone],
  [["whatsapp", "messaging", "notification"], MessageCircle],
  [["google business"], Search],
  [["organic", "growth", "performance", "analytics"], LineChart],
  [["advertising", "ads"], Megaphone],
  [["lead"], Users],
  [["remarketing", "conversion"], Target],
  [["influencer"], Video],
  [["seller", "onboarding"], ShoppingBag],
  [["listing", "a+ content", "keyword", "store optimization"], Search],
  [["product image", "images"], Camera],
  [["email", "workspace", "microsoft"], Mail],
  [["migration", "configuration"], ServerCog],
  [["security"], ShieldCheck],
  [["api"], Blocks],
  [["automation", "automated"], Bot],
  [["broadcast"], BellRing],
  [["chatbot"], Bot],
  [["reminder"], CalendarCheck2],
  [["integration"], Blocks],
  [["monitoring", "maintenance", "amc", "support"], Wrench],
  [["backup"], Database],
  [["speed"], LineChart],
];

const getItemIcon = (label: string) => {
  const normalized = label.toLowerCase();
  const match = itemIcons.find(([keywords]) => keywords.some((keyword) => normalized.includes(keyword)));
  return match?.[1] ?? BadgeCheck;
};

const getSectionVariant = (letter: string) => {
  const variants = {
    A: "from-indigo-50 via-white to-sky-50",
    B: "from-violet-50 via-white to-fuchsia-50",
    C: "from-amber-50 via-white to-orange-50",
    D: "from-sky-50 via-white to-cyan-50",
    E: "from-emerald-50 via-white to-teal-50",
    F: "from-blue-50 via-white to-indigo-50",
    G: "from-pink-50 via-white to-rose-50",
    H: "from-orange-50 via-white to-yellow-50",
    I: "from-cyan-50 via-white to-blue-50",
    J: "from-slate-100 via-white to-slate-50",
    K: "from-green-50 via-white to-lime-50",
  } as const;
  return variants[letter as keyof typeof variants] ?? "from-indigo-50 via-white to-sky-50";
};

export default function ServiceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);

  if (!service) return <NotFoundPage />;

  const media = getServiceMedia(service.slug);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const sectionVariant = getSectionVariant(service.letter);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="blueprint-grid fade-mask-b pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <Link to="/services" className="eyebrow inline-flex items-center gap-2">
              Services / {service.letter}
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <IconChip icon={media.icon} accent={media.accent} />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {service.letter} / GeneRays capability
              </span>
            </div>
            <h1 className="rise-in mt-5 max-w-3xl text-4xl font-bold leading-[1.08] text-foreground md:text-5xl">
              {service.title}
            </h1>
            <p className="rise-in mt-5 max-w-2xl font-display text-lg font-semibold text-primary">{service.tagline}</p>
            <p className="rise-in mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{service.intro}</p>
          </div>
          <div className="scanline group relative overflow-hidden rounded-2xl border border-primary/25 shadow-[var(--shadow-glow)]">
            <img
              src={media.image}
              alt={media.alt}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover saturate-[0.75] transition-all duration-700 group-hover:scale-105 group-hover:saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-neon-violet/20 mix-blend-screen" />
            <div className="blueprint-grid-fine absolute inset-0 opacity-30" />
          </div>
        </div>
      </section>

      <section className={`service-included service-included--${service.letter} relative overflow-hidden border-b border-border bg-background`} data-service={service.slug}>
        <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${sectionVariant}`} aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="service-included__layout grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <div className="service-included__intro lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-[0_12px_28px_-14px_hsl(var(--primary))]">
                  {service.letter}
                </span>
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">What's included</span>
              </div>
              <h2 className="mt-5 max-w-sm font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Everything needed to make {service.title.toLowerCase()} work.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                A focused set of capabilities, arranged for quick scanning and easy decision-making.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground">{service.items.length} capabilities</span>
                <span className="rounded-full border border-primary/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground">Built around your goals</span>
              </div>
            </div>

            <div className="service-included__grid grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.items.map((item, index) => {
                const Icon = getItemIcon(item);
                return (
                  <article
                    key={item}
                    className="service-included__card group relative flex min-h-[104px] items-center overflow-hidden rounded-2xl border border-border/80 bg-white/90 p-4 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.28)]"
                  >
                    <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[2rem] bg-primary/[0.04] transition-colors group-hover:bg-primary/[0.09]" aria-hidden="true" />
                    <div className="relative flex items-start gap-3">
                      <span className="service-included__icon grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10 transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold tracking-wider text-primary/60">{String(index + 1).padStart(2, "0")}</span>
                        <h3 className="mt-0.5 text-sm font-semibold leading-5 text-foreground">{item}</h3>
                      </div>
                      <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center self-center rounded-full border border-primary/15 bg-primary/5 text-primary/55 transition-all group-hover:border-primary/25 group-hover:bg-primary/10 group-hover:text-primary" aria-hidden="true">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">Our method</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">How we deliver it</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">A clear five-stage path keeps strategy, design, build and growth connected.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            {framework.map((stage, index) => (
              <div key={stage.step} className="rounded-2xl border border-border bg-background p-5">
                <span className="font-display text-2xl font-bold text-primary/25">{stage.step}</span>
                <span className="mt-2 block text-[11px] font-bold uppercase tracking-wider text-primary">0{index + 1}</span>
                <h3 className="mt-1 font-display text-sm font-bold uppercase tracking-wide text-foreground">{stage.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">Explore the ecosystem</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">Pairs well with</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {others.map((other) => (
              <Link key={other.slug} to={`/services/${other.slug}`} className="group rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary-soft">
                <span className="font-display text-xs font-bold text-primary">{other.letter}</span>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">{other.title}</h3>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{other.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground md:p-10">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Next step</span>
                <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-snug md:text-3xl">Ready to build {service.title.toLowerCase()} that actually works?</h2>
              </div>
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5">
                Schedule a Free Brand Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
