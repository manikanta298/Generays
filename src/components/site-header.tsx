import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5 lg:px-8 lg:pt-6">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-[#081a31]/82 px-3 shadow-[0_18px_50px_-22px_rgba(14,91,190,0.55),0_10px_30px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:h-[66px] sm:px-5 lg:h-[72px] lg:px-6">
        <Link
          to="/"
          className="shrink-0 rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setOpen(false)}
          aria-label="Generays home"
        >
          <img
            src="/Generays.png"
            alt="Generays"
            className="h-auto w-[112px] sm:w-[132px] lg:w-[150px]"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/contact"
            className="hidden min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-cyan-300/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-14px_rgba(34,211,238,0.75)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 lg:inline-flex"
          >
            Build My Brand
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_8px_22px_-16px_rgba(34,211,238,0.7)] backdrop-blur-md transition-colors hover:border-cyan-200/30 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-3 right-3 top-[4.5rem] overflow-hidden rounded-[24px] border border-white/15 bg-[#081a31]/94 shadow-[0_24px_60px_-24px_rgba(14,91,190,0.55),0_18px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:left-5 sm:right-5 lg:hidden">
          <nav className="mx-auto flex w-full flex-col p-3 sm:p-4" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-11 items-center justify-center rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_24px_-14px_rgba(34,211,238,0.75)] backdrop-blur-md transition-all hover:border-cyan-200/30 hover:bg-cyan-200/10"
            >
              Build My Brand
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
