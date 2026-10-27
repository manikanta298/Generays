import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
export function SiteFooter() {
  return (
    <footer className="gr-footer">
      <div className="gr-container">
        <div className="gr-footer-top">
          <div>
            <Link to="/" aria-label="GeneRays home">
              <img
                src="/Generays-1.png"
                alt="GeneRays"
                width="180"
                height="57"
              />
            </Link>
            <p>
              Building brands. Engineering growth.
              <br />
              Creating digital impact.
            </p>
            <Link className="gr-text-link" to="/contact">
              Let’s build your next chapter{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h2>Brand & digital</h2>
            <ul>
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Growth & support</h2>
            <ul>
              {services.slice(6).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`}>
                    {service.title.replace("Customer Engagement — ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {[
                { href: "/about", label: "About GeneRays" },
                { href: "/process", label: "Our process" },
                { href: "/portfolio", label: "Our work" },
                { href: "/contact", label: "Contact us" },
                { href: "/submit-testimonial", label: "Share feedback" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gr-footer-bottom">
          <p>© {new Date().getFullYear()} GeneRays. All rights reserved.</p>
          <p>Strategy first. Original by design.</p>
        </div>
      </div>
    </footer>
  );
}
