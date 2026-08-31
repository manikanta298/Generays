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
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:h-20 lg:px-8">
        <Link
          to="/"
          className="shrink-0 rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setOpen(false)}
          aria-label="Generays home"
        >
          <img
            src="/Generays.png"
            alt="Generays"
            className="h-auto w-[132px] sm:w-[150px] lg:w-[170px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/contact"
            className="hidden min-h-10 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex"
          >
            Build My Brand
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border/60 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Build My Brand
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
