import React from "react";
import {
  Sparkles,
  Monitor,
  Users,
  Megaphone,
  Check,
  FileText,
  IdCard,
  Settings,
  BarChart3,
} from "lucide-react";

const cards = [
  {
    icon: Sparkles,
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-500",
    title: "A logo without identity",
    desc: "is decoration.",
    art: <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 via-white to-indigo-100"><Sparkles className="h-16 w-16 text-indigo-500 opacity-80" /></div>,
  },
  {
    icon: Monitor,
    iconBg: "bg-gradient-to-br from-blue-500 to-sky-500",
    title: "A website without strategy",
    desc: "is a brochure.",
    art: <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-sky-100"><Monitor className="h-16 w-16 text-blue-500 opacity-80" /></div>,
  },
  {
    icon: Users,
    iconBg: "bg-gradient-to-br from-teal-400 to-emerald-500",
    title: "Social media without consistency",
    desc: "is noise.",
    art: <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-white to-emerald-100"><Users className="h-16 w-16 text-teal-500 opacity-80" /></div>,
  },
  {
    icon: Megaphone,
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    title: "Advertising without branding",
    desc: "is expense.",
    art: <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100"><Megaphone className="h-16 w-16 text-sky-500 opacity-80" /></div>,
  },
];

const steps = [
  { icon: FileText, title: "1. Brand Blueprint", desc: "We define your purpose, positioning and brand foundation.", color: "from-violet-500 to-indigo-500", text: "text-indigo-600" },
  { icon: IdCard, title: "2. Identity", desc: "We craft a unique visual identity that represents your brand.", color: "from-blue-500 to-blue-600", text: "text-blue-600" },
  { icon: Monitor, title: "3. Website", desc: "We build strategic, high-performing websites that convert.", color: "from-sky-500 to-blue-500", text: "text-sky-600" },
  { icon: Megaphone, title: "4. Marketing", desc: "We create consistent content and campaigns that engage.", color: "from-teal-400 to-cyan-500", text: "text-teal-600" },
  { icon: Settings, title: "5. Automation", desc: "We automate workflows to save time and increase efficiency.", color: "from-amber-400 to-orange-500", text: "text-amber-600" },
  { icon: BarChart3, title: "6. Growth", desc: "We analyze, optimize and scale for long-term, sustainable growth.", color: "from-green-500 to-emerald-500", text: "text-green-600" },
];

export function CorePositioningSection() {
  return (
    <section className="w-full bg-[#F4F6FB] py-14 font-sans sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-indigo-600">CORE POSITIONING</p>
        <h2 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
          We don't sell services.
          <br />
          We build{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">business ecosystems.</span>
        </h2>
        <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400" />
        <p className="mb-10 max-w-xl text-base text-slate-500 sm:mb-12 md:text-lg">
          Isolated solutions create gaps.
          <br />
          Connected strategy creates growth.
        </p>

        <div className="core-positioning__cards mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <article key={i} className="core-positioning__card flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1">
              <div className="core-positioning__card-art relative h-36 shrink-0 bg-gradient-to-br from-indigo-50 to-blue-100 sm:h-40">
                {c.art}
                <div className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white ${c.iconBg} shadow-md`}>
                  <c.icon className="text-lg text-white" />
                </div>
              </div>
              <div className="core-positioning__card-copy flex min-h-[96px] flex-1 flex-col justify-start px-5 pb-5 pt-8">
                <h3 className="text-[15px] font-bold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

       

        <div className="rounded-2xl bg-white px-4 py-8 shadow-sm sm:px-6 sm:py-10">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-2">
            <div className="absolute bottom-8 left-7 top-8 w-px bg-slate-200 md:hidden" aria-hidden="true" />
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className="relative z-10 flex min-w-0 items-start gap-4 md:w-32 md:flex-col md:items-center md:gap-3">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.color} shadow-md`}>
                    <s.icon className="text-2xl text-white" />
                  </div>
                  <div className="min-w-0 text-left md:text-center">
                    <h4 className={`font-bold text-sm ${s.text}`}>{s.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden flex-1 items-center pt-7 md:flex">
                    <div className="relative h-px w-full bg-slate-200">
                      <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-300" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
