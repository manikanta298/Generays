import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Our work" },
  { href: "/process", label: "Our process" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return (
    <header className={`gr-header ${pathname === "/" ? "gr-header-dark" : ""}`}>
      <a className="gr-skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="gr-container gr-header-inner">
        <Link to="/" aria-label="GeneRays home" onClick={() => setOpen(false)}>
          <img
            className="gr-logo"
            src={pathname === "/" ? "/Generays-1.png" : "/Generays.png"}
            alt="GeneRays"
            width="150"
            height="48"
          />
        </Link>
        <nav className="gr-desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          className="gr-header-cta"
          to="/contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <button
          ref={button}
          className="gr-menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav
          className="gr-mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact us
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
