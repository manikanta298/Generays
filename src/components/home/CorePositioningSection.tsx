import React from "react";
import {
  HiSparkles,
  HiOutlineComputerDesktop,
  HiOutlineUserGroup,
  HiOutlineMegaphone,
  HiCheck,
} from "react-icons/hi2";
import {
  HiOutlineDocumentText,
  HiOutlineIdentification,
  HiOutlineDesktopComputer,
  HiOutlineCog,
  HiOutlineChartBar,
} from "react-icons/hi";

const cards = [
  {
    icon: HiSparkles,
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-500",
    title: "A logo without identity",
    desc: "is decoration.",
    art: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-40 h-28 bg-gradient-to-br from-slate-900 to-blue-950 rounded-md shadow-lg absolute rotate-[-8deg] translate-x-3" />
        <div className="w-44 h-28 bg-white rounded-md shadow-xl flex items-center justify-center gap-2 relative z-10">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">◆</div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-slate-800 leading-tight">YOUR</div>
            <div className="text-[10px] font-bold text-slate-800 leading-tight">LOGO</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: HiOutlineComputerDesktop,
    iconBg: "bg-gradient-to-br from-blue-500 to-sky-500",
    title: "A website without strategy",
    desc: "is a brochure.",
    art: (
      <div className="w-full h-full flex items-center justify-center p-3">
        <div className="w-full bg-white rounded-md shadow-lg p-2 border border-slate-100">
          <div className="flex items-center justify-between text-[8px] text-slate-400 font-medium mb-2 px-1">
            <span className="text-blue-600 font-bold">Logo</span>
            <span className="flex gap-2">
              <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2 h-12 bg-blue-100 rounded flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-blue-300" />
            </div>
            <div className="w-1/2 h-12 bg-indigo-100 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: HiOutlineUserGroup,
    iconBg: "bg-gradient-to-br from-teal-400 to-emerald-500",
    title: "Social media without consistency",
    desc: "is noise.",
    art: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-40 bg-slate-900 rounded-2xl p-1.5 shadow-xl">
          <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
            <div className="h-8 bg-slate-100 flex items-center gap-1 px-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <div className="w-6 h-1.5 bg-slate-300 rounded" />
            </div>
            <div className="h-16 bg-slate-700" />
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: HiOutlineMegaphone,
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    title: "Advertising without branding",
    desc: "is expense.",
    art: (
      <div className="w-full h-full flex items-center justify-end gap-1 pr-4">
        <div className="flex items-end gap-1 h-16">
          <div className="w-3 bg-blue-200 rounded-t h-6" />
          <div className="w-3 bg-blue-400 rounded-t h-10" />
          <div className="w-3 bg-blue-600 rounded-t h-16" />
        </div>
      </div>
    ),
  },
];

const steps = [
  { icon: HiOutlineDocumentText, title: "1. Brand Blueprint", desc: "We define your purpose, positioning and brand foundation.", color: "from-violet-500 to-indigo-500", text: "text-indigo-600" },
  { icon: HiOutlineIdentification, title: "2. Identity", desc: "We craft a unique visual identity that represents your brand.", color: "from-blue-500 to-blue-600", text: "text-blue-600" },
  { icon: HiOutlineDesktopComputer, title: "3. Website", desc: "We build strategic, high-performing websites that convert.", color: "from-sky-500 to-blue-500", text: "text-sky-600" },
  { icon: HiOutlineMegaphone, title: "4. Marketing", desc: "We create consistent content and campaigns that engage.", color: "from-teal-400 to-cyan-500", text: "text-teal-600" },
  { icon: HiOutlineCog, title: "5. Automation", desc: "We automate workflows to save time and increase efficiency.", color: "from-amber-400 to-orange-500", text: "text-amber-600" },
  { icon: HiOutlineChartBar, title: "6. Growth", desc: "We analyze, optimize and scale for long-term, sustainable growth.", color: "from-green-500 to-emerald-500", text: "text-green-600" },
];

export default function CorePositioning() {
  return (
    <section className="w-full bg-[#F4F6FB] py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] text-indigo-600 mb-4">
          CORE POSITIONING
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          We don't sell services.
          <br />
          We build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            business ecosystems.
          </span>
        </h2>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400 mb-6" />
        <p className="text-slate-500 text-base md:text-lg mb-12 max-w-xl">
          Isolated solutions create gaps.
          <br />
          Connected strategy creates growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-36 bg-gradient-to-br from-indigo-50 to-blue-100 relative">
                {c.art}
                <div
                  className={`absolute -bottom-5 left-5 w-11 h-11 rounded-full ${c.iconBg} flex items-center justify-center shadow-md border-4 border-white`}
                >
                  <c.icon className="text-white text-lg" />
                </div>
              </div>
              <div className="pt-8 pb-5 px-5">
                <h3 className="font-bold text-slate-900 text-[15px] leading-snug">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white shadow-sm px-6 py-5 flex items-center gap-4 mb-10">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shrink-0">
            <HiCheck className="text-white text-lg" />
          </div>
          <p className="text-slate-700 text-[15px] md:text-base">
            At GeneRays, every service connects together to create{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              one powerful business ecosystem.
            </span>
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-3 text-center md:w-32">
                  <div
                    className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}
                  >
                    <s.icon className="text-white text-2xl" />
                  </div>
                  <div className="text-left md:text-center">
                    <h4 className={`font-bold text-sm ${s.text}`}>{s.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center flex-1 pt-7">
                    <div className="w-full h-px bg-slate-200 relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-slate-300" />
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
