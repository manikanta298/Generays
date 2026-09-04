import type { ComponentType } from "react";
import {
  Target,
  BarChart3,
  Users,
  TrendingUp,
  Search,
  Lightbulb,
  Code2,
  Rocket,
  LineChart,
  MessageSquare,
  Share2,
  FileText,
  Send,
  PieChart,
  UsersRound,
  PenLine,
  Play,
  Sliders,
  Star,
  CheckCircle2,
} from "lucide-react";

type Pillar = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  { icon: Target, title: "Strategy First", description: "Purpose-driven planning" },
  { icon: BarChart3, title: "Data Informed", description: "Insights that guide every move" },
  { icon: Users, title: "Customer Focused", description: "Built around real audiences" },
  { icon: TrendingUp, title: "Growth Oriented", description: "Designed to scale and adapt" },
];

type Stage = {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
  accent: string; // Tailwind color token shared by the number chip + icon badge
};

const stages: Stage[] = [
  {
    number: "01",
    name: "Discover",
    subtitle: "Understand deeply",
    description: "We research your market, audience, competitors and goals to uncover opportunities that matter.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    accent: "blue",
  },
  {
    number: "02",
    name: "Design",
    subtitle: "Shape the brand",
    description: "We craft your brand identity, positioning and experience with strategy, creativity and a human-first approach.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    accent: "violet",
  },
  {
    number: "03",
    name: "Build",
    subtitle: "Bring it to life",
    description: "We build fast, scalable digital products and automation on a solid infrastructure that just works.",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    accent: "blue",
  },
  {
    number: "04",
    name: "Launch",
    subtitle: "Go to market",
    description: "We launch with confidence. Marketing begins, systems activate, and your brand is ready to make an impact.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    accent: "orange",
  },
  {
    number: "05",
    name: "Grow",
    subtitle: "Optimize & scale",
    description: "We continuously optimize through data, creativity, campaigns and technology to scale your success.",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    accent: "emerald",
  },
];

const accentClasses: Record<string, { chip: string; badge: string }> = {
  blue: { chip: "bg-blue-600", badge: "bg-blue-600" },
  violet: { chip: "bg-violet-600", badge: "bg-violet-600" },
  orange: { chip: "bg-orange-500", badge: "bg-orange-500" },
  emerald: { chip: "bg-emerald-500", badge: "bg-emerald-500" },
};

const planningItems = [
  { icon: UsersRound, label: "Audience Research" },
  { icon: MessageSquare, label: "Positioning & Messaging" },
  { icon: Share2, label: "Channel Strategy" },
  { icon: FileText, label: "Content Planning" },
  { icon: Send, label: "Campaign Execution" },
  { icon: PieChart, label: "Analytics & Optimization" },
];

const workSteps = [
  { icon: UsersRound, title: "Understand", description: "We listen, research and align on your vision." },
  { icon: Target, title: "Strategize", description: "We map the right plan for measurable results." },
  { icon: PenLine, title: "Create", description: "We design and build experiences that connect." },
  { icon: Play, title: "Implement", description: "We launch with precision and performance." },
  { icon: Sliders, title: "Optimize", description: "We analyze, learn and grow together." },
];

const impactItems = [
  { icon: Star, label: "Stronger Brands" },
  { icon: CheckCircle2, label: "Better Engagement" },
  { icon: BarChart3, label: "Sustainable Growth" },
];

export function FrameworkSection() {
  return (
    <section className="border-b border-border bg-background" aria-labelledby="brand-framework-title">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        {/* Header row: eyebrow/title/subtitle on the left, four pillars on the right */}
        <div className="flex flex-col flex-wrap gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-xl">
            <p className="eyebrow">Brand Engineering Framework</p>
            <h2 id="brand-framework-title" className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Five stages. One <span className="bg-gradient-to-r from-primary to-neon-violet bg-clip-text text-transparent">blueprint.</span>
            </h2>
            <div className="mt-5 h-px w-16 rounded-full bg-gradient-to-r from-primary via-neon-violet to-neon-cyan" />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A proven framework that turns strategy into scalable brands and measurable growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4 lg:w-auto lg:shrink-0">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">{title}</span>
                  <span className="block text-sm text-muted-foreground">{description}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Five-stage timeline */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map(({ number, name, subtitle, description, icon: Icon, image, accent }) => {
            const { chip, badge } = accentClasses[accent];
            return (
              <div key={number} className="rounded-2xl border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold text-white ${chip}`}>
                    {number}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold uppercase tracking-wide text-foreground">{name}</span>
                    <span className="block text-xs text-muted-foreground">{subtitle}</span>
                  </span>
                </div>

                <div className="relative mt-4 overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className={`absolute -bottom-3 left-3 inline-flex h-9 w-9 m-5 mx-1 items-center justify-center rounded-full text-white shadow-md ${badge}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Digital marketing planning strip */}
        <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-border bg-primary-soft p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex shrink-0 rounded-xl bg-primary p-3 text-primary-foreground">
              <Target className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-base font-bold text-foreground">Digital Marketing Planning</span>
              <span className="block text-sm text-muted-foreground">Strategic roadmap to attract, engage and convert the right audience.</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {planningItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="inline-flex rounded-lg bg-background p-2 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How we work + Built for impact */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-center font-display text-lg font-bold text-foreground">How We Work</h3>
            <div className="mt-6 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {workSteps.map(({ icon: Icon, title, description }) => (
                <div key={title} className="text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-display text-lg font-bold text-foreground">Built for Impact</h3>
            <div className="mt-1 h-px w-10 rounded-full bg-primary" />
            <ul className="mt-6 space-y-4">
              {impactItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
