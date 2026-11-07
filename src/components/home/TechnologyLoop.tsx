import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import "./TechnologyLoop.css";

const stack = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Vite", icon: "vite" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Vercel", icon: "vercel" },
];

// Original brand artwork from https://github.com/devicons/devicon.
const stackLogos: LogoItem[] = stack.map(({ name, icon }) => ({
  node: (
    <span className="technology-loop__tile">
      <img src={`/technology-logos/${icon}.svg`} width="30" height="30" alt="" />
      <span>{name}</span>
    </span>
  ),
}));

export function TechnologyLoop() {
  return (
    <section className="technology-loop" aria-labelledby="technology-stack-heading">
      <h2 id="technology-stack-heading" className="technology-loop__heading">
        Technology stack and hosting
      </h2>
      <LogoLoop
        logos={stackLogos}
        ariaLabel="Project technologies and hosting"
        className="technology-loop__row"
        speed={24}
        logoHeight={30}
        gap={14}
        pauseOnHover
      />
    </section>
  );
}
