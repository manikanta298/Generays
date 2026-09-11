import { useState } from "react";
import { ArrowRight, BarChart3, Compass, Layers3, Rocket, Sparkles } from "lucide-react";

const stages = [
  { title: "Discover", icon: Compass, body: "Understand your business, audience, competitors and goals before creating anything." },
  { title: "Design", icon: Sparkles, body: "Shape a distinctive personality and visual system people can recognize." },
  { title: "Build", icon: Layers3, body: "Connect websites, applications, automation and digital infrastructure." },
  { title: "Launch", icon: Rocket, body: "Activate the foundation with a focused launch built to scale." },
  { title: "Grow", icon: BarChart3, body: "Continuously optimize through data, creativity, campaigns and technology." },
];

export function ProcessEcosystem() {
  const [active, setActive] = useState(0);
  const current = stages[active];
  const Icon = current.icon;

  return (
    <div className="process-ecosystem">
      <div className="process-ecosystem__loop" aria-label="Five stage ecosystem">
        <div className="process-ecosystem__orbit" />
        {stages.map((stage, index) => {
          const StageIcon = stage.icon;
          const angle = index * 72 - 90;
          return (
            <button key={stage.title} type="button" onClick={() => setActive(index)} className={`process-ecosystem__node ${active === index ? "is-active" : ""}`} style={{ "--angle": `${angle}deg` } as React.CSSProperties} aria-pressed={active === index}>
              <span className="process-ecosystem__node-inner"><StageIcon /></span>
              <span>{stage.title}</span>
            </button>
          );
        })}
        <div className="process-ecosystem__core"><span>GeneRays</span><strong>ECOSYSTEM</strong></div>
      </div>
      <div className="process-ecosystem__detail">
        <div className="process-ecosystem__detail-icon"><Icon /></div>
        <div>
          <span>Stage {String(active + 1).padStart(2, "0")}</span>
          <h3>{current.title}</h3>
          <p>{current.body}</p>
        </div>
      </div>
      <div className="process-ecosystem__controls" aria-label="Choose ecosystem stage">
        {stages.map((stage, index) => <button key={stage.title} type="button" onClick={() => setActive(index)} className={active === index ? "is-active" : ""}>{String(index + 1).padStart(2, "0")}</button>)}
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
