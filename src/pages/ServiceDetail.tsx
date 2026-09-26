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

const getCapabilityDescription = (label: string) => {
  const value = label.toLowerCase();

  if (value.includes("logo") || value.includes("mark") || value.includes("emblem")) return "A distinctive visual mark designed to stay recognisable across every touchpoint.";
  if (value.includes("brand") || value.includes("identity") || value.includes("guideline")) return "A clear brand system that keeps every customer-facing detail consistent.";
  if (value.includes("strategy") || value.includes("positioning")) return "A focused direction that clarifies your audience, message and market position.";
  if (value.includes("colour") || value.includes("color") || value.includes("typography")) return "A considered visual choice that strengthens recognition and communicates personality.";
  if (value.includes("voice") || value.includes("content") || value.includes("copy")) return "Clear, consistent communication shaped around your audience and brand personality.";
  if (value.includes("website") || value.includes("landing") || value.includes("portal") || value.includes("cms")) return "A responsive digital experience structured around usability, clarity and conversion.";
  if (value.includes("shopify") || value.includes("woocommerce") || value.includes("magento") || value.includes("commerce") || value.includes("store")) return "A commerce-ready experience designed to make browsing, buying and managing orders easier.";
  if (value.includes("payment") || value.includes("billing") || value.includes("order") || value.includes("inventory")) return "A reliable business workflow that keeps day-to-day operations organised and connected.";
  if (value.includes("social") || value.includes("instagram") || value.includes("facebook") || value.includes("linkedin") || value.includes("youtube") || value.includes("pinterest") || value.includes("snapchat") || value.includes("twitter") || value.includes("whatsapp")) return "Channel-ready creative and communication built for consistent audience engagement.";
  if (value.includes("marketing") || value.includes("advertising") || value.includes("campaign") || value.includes("lead") || value.includes("remarketing") || value.includes("growth")) return "A measurable growth activity focused on visibility, qualified demand and stronger conversion.";
  if (value.includes("amazon") || value.includes("marketplace") || value.includes("listing") || value.includes("seller") || value.includes("a+")) return "Marketplace-ready optimisation that helps products present clearly and compete effectively.";
  if (value.includes("email") || value.includes("workspace") || value.includes("microsoft")) return "Professional communication infrastructure configured for reliability, security and everyday use.";
  if (value.includes("security") || value.includes("backup") || value.includes("maintenance") || value.includes("monitoring") || value.includes("support") || value.includes("speed") || value.includes("upgrade") || value.includes("plugin")) return "Ongoing technical care that keeps the digital experience secure, healthy and dependable.";
  if (value.includes("automation") || value.includes("chatbot") || value.includes("notification") || value.includes("reminder") || value.includes("broadcast") || value.includes("integration")) return "A connected workflow that reduces repetitive work and keeps customer communication moving.";
  if (value.includes("application") || value.includes("erp") || value.includes("crm") || value.includes("dashboard") || value.includes("admin") || value.includes("software") || value.includes("pos")) return "A purpose-built digital system that turns complex business processes into usable workflows.";
  if (value.includes("packaging") || value.includes("flyer") || value.includes("banner") || value.includes("brochure") || value.includes("profile") || value.includes("catalogue") || value.includes("card") || value.includes("letterhead") || value.includes("presentation") || value.includes("certificate") || value.includes("invitation") || value.includes("menu") || value.includes("cover")) return "A polished creative asset designed to communicate clearly and strengthen the brand experience.";
  return "A focused capability shaped to support the service outcome and the wider brand system.";
};

export default function ServiceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);

  if (!service) return <NotFoundPage />;

  const media = getServiceMedia(service.slug);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

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
        <div className="service-included__wash service-included__wash--top" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-18 lg:py-20">
          <div className="service-included__header">
            <div className="service-included__intro">
              <div className="service-included__eyebrow-row">
                <span className="service-included__letter">{service.letter}</span>
                <span className="service-included__eyebrow">What's included</span>
              </div>

              <h2 className="service-included__heading">
                Everything needed to make <span>{service.title.toLowerCase()}</span> work.
              </h2>

              <p className="service-included__description">
                {service.intro}
              </p>

              <div className="service-included__meta">
                <span>{service.items.length} capabilities</span>
                <span>Built around your goals</span>
              </div>
            </div>

          </div>

          <div className="service-included__grid" role="list" aria-label={`What's included in ${service.title}`}>
            {service.items.map((item, index) => {
              const Icon = getItemIcon(item);
              return (
                <article
                  key={item}
                  className="service-included__card group"
                  role="listitem"
                  tabIndex={0}
                >
                  <div className="service-included__card-glow" aria-hidden="true" />
                  <div className="service-included__card-top">
                    <span className="service-included__icon" aria-hidden="true">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="service-included__number">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="service-included__card-copy">
                    <h3>{item}</h3>
                    <p>{getCapabilityDescription(item)}</p>
                  </div>
                </article>
              );
            })}
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
