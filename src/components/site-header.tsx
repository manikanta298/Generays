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
      <div className="site-header-shell mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/65 px-3 shadow-[0_10px_30px_-16px_rgba(37,99,235,0.28)] backdrop-blur-xl sm:h-[66px] sm:px-5 lg:h-[72px] lg:px-6">
        <Link to="/" className="shrink-0 rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={() => setOpen(false)} aria-label="Generays home">
          <img src="/Generays.png" alt="Generays" className="h-auto w-[112px] sm:w-[132px] lg:w-[150px]" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
          {nav.map((item) => <Link key={item.href} to={item.href} className="nav-link whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/contact" className="nav-action hidden min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-sky-200/80 bg-sky-100/80 px-5 py-2 text-sm font-semibold text-primary shadow-[0_5px_16px_-10px_rgba(59,130,246,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:inline-flex">Build My Brand</Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/15 bg-white/75 text-primary shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="site-header-mobile-menu absolute left-3 right-3 top-[4.5rem] overflow-hidden rounded-[24px] border shadow-lg sm:left-5 sm:right-5 lg:hidden">
          <nav className="mx-auto flex w-full flex-col p-3 sm:p-4" aria-label="Mobile navigation">
            {nav.map((item) => <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="nav-link flex min-h-12 items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors">{item.label}</Link>)}
            <Link to="/contact" onClick={() => setOpen(false)} className="nav-action mt-2 flex min-h-11 items-center justify-center rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-all hover:-translate-y-0.5">Build My Brand</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
