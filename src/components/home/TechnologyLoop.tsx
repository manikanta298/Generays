import { useState, type ReactNode } from "react";
import { Braces, PanelsTopLeft } from "lucide-react";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { technologies } from "@/content/site";
import "./TechnologyLoop.css";

const stack = ["React", "TypeScript", "Vite", "Tailwind CSS", "MongoDB", "Vercel"];
const icons: Record<string, string> = {
  React: "react",
  TypeScript: "typescript",
  Vite: "vite",
  "Tailwind CSS": "tailwindcss",
  MongoDB: "mongodb",
  Vercel: "vercel",
  PHP: "php",
  HTML5: "html5",
  CSS3: "css3",
  Laravel: "laravel",
  WordPress: "wordpress",
  Magento: "magento",
  Joomla: "joomla",
  Shopify: "shopify",
  JavaScript: "javascript",
  Bootstrap: "bootstrap",
  MySQL: "mysql",
};
const categoryIcons: Record<string, ReactNode> = {
  "REST APIs": <Braces />,
  "Responsive Web Development": <PanelsTopLeft />,
};

function logoItems(names: readonly string[], showLabels: boolean): LogoItem[] {
  return names.map((name) => ({
    node: (
      <span className="inline-flex items-center gap-2.5 whitespace-nowrap" title={name}>
        <span aria-hidden="true" className="inline-flex">
          {icons[name] ? <img src={`/technology-logos/${icons[name]}.svg`} width="24" height="24" alt="" /> : categoryIcons[name]}
        </span>
        <span className={showLabels ? "text-sm font-medium text-muted-foreground" : "sr-only"}>{name}</span>
      </span>
    ),
  }));
}

const stackLogos = logoItems(stack, false);
const expertiseLogos = logoItems(technologies, true);

export function TechnologyLoop({ variant }: { variant: "stack" | "expertise" }) {
  const [paused, setPaused] = useState(false);
  const isStack = variant === "stack";
  const label = isStack ? "Technology stack and hosting" : "Technology expertise";
  return (
    <div className="technology-loop">
      <div className="mb-3 flex items-center justify-between gap-3">
        {isStack && <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</h2>}
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className="technology-loop__control ml-auto rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2"
          aria-label={`${paused ? "Resume" : "Pause"} ${label.toLowerCase()} logos`}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <LogoLoop
        logos={isStack ? stackLogos : expertiseLogos}
        ariaLabel={label}
        className={paused ? "technology-loop__row technology-loop__row--paused" : "technology-loop__row"}
        speed={paused ? 0 : isStack ? 38 : 30}
        direction={isStack ? "left" : "right"}
        logoHeight={isStack ? 30 : 22}
        gap={isStack ? 54 : 32}
        pauseOnHover
      />
    </div>
  );
}
