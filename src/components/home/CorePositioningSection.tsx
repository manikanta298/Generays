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
    art: (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute h-28 w-40 translate-x-3 rotate-[-8deg] rounded-md bg-gradient-to-br from-slate-900 to-blue-950 shadow-lg" />
        <div className="relative z-10 flex h-28 w-44 items-center justify-center gap-2 rounded-md bg-white shadow-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">◆</div>
          <div className="text-left">
            <div className="text-[10px] font-bold leading-tight text-slate-800">YOUR</div>
            <div className="text-[10px] font-bold leading-tight text-slate-800">LOGO</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Monitor,
    iconBg: "bg-gradient-to-br from-blue-500 to-sky-500",
    title: "A website without strategy",
    desc: "is a brochure.",
    art: (
      <div className="flex h-full w-full items-center justify-center p-3">
        <div className="w-full rounded-md border border-slate-100 bg-white p-2 shadow-lg">
          <div className="mb-2 flex items-center justify-between px-1 text-[8px] font-medium text-slate-400">
            <span className="font-bold text-blue-600">Logo</span>
            <span className="flex gap-2">
              <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
            </span>
          </div>
          <div className="flex gap-2">
            <div className="flex h-12 w-1/2 items-center justify-center rounded bg-blue-100">
              <div className="h-4 w-4 rounded-full bg-blue-300" />
            </div>
            <div className="h-12 w-1/2 rounded bg-indigo-100" />
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    iconBg: "bg-gradient-to-br from-teal-400 to-emerald-500",
    title: "Social media without consistency",
    desc: "is noise.",
    art: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-40 w-24 rounded-2xl bg-slate-900 p-1.5 shadow-xl">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-white">
            <div className="flex h-8 items-center gap-1 bg-slate-100 px-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <div className="h-1.5 w-6 rounded bg-slate-300" />
            </div>
            <div className="h-16 bg-slate-700" />
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Megaphone,
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    title: "Advertising without branding",
    desc: "is expense.",
    art: (
      <div className="flex h-full w-full items-end justify-end gap-1 pr-4">
        <div className="flex h-16 items-end gap-1">
          <div className="h-6 w-3 rounded-t bg-blue-200" />
          <div className="h-10 w-3 rounded-t bg-blue-400" />
          <div className="h-16 w-3 rounded-t bg-blue-600" />
        </div>
      </div>
    ),
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

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cards.map((c, i) => (
            <div key={i} className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-36 shrink-0 bg-gradient-to-br from-indigo-50 to-blue-100 sm:h-40">
                {c.art}
                <div className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white ${c.iconBg} shadow-md`}>
                  <c.icon className="text-lg text-white" />
                </div>
              </div>
              <div className="px-5 pb-5 pt-8">
                <h3 className="text-[15px] font-bold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 flex items-start gap-3 rounded-2xl bg-white px-4 py-5 shadow-sm sm:items-center sm:gap-4 sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-500">
            <Check className="text-lg text-white" />
          </div>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px] md:text-base">
            At GeneRays, every service connects together to create{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text font-semibold text-transparent">one powerful business ecosystem.</span>
          </p>
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
