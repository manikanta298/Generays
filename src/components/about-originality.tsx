import { Sparkles, Target, BarChart3, Compass, Heart, Network } from "lucide-react";

const points = [
  { icon: Sparkles, label: "Original by default", text: "Every logo begins with a blank page—not a template." },
  { icon: Compass, label: "Strategy before pixels", text: "Every website starts with a clear strategic direction." },
  { icon: BarChart3, label: "Data with purpose", text: "Every campaign is shaped by evidence, not guesswork." },
  { icon: Target, label: "Design with intent", text: "Every visual decision has a job to do." },
  { icon: Heart, label: "Focused attention", text: "Every brand gets thoughtful, hands-on attention." },
  { icon: Network, label: "Connected systems", text: "We build an ecosystem instead of isolated deliverables." },
];

export function AboutOriginality() {
  return (
    <div className="about-originality">
      <div className="about-originality__intro">
        <span>01 / Originality</span>
        <p>Six principles keep every GeneRays brand unmistakably its own.</p>
      </div>
      <div className="about-originality__grid">
        {points.map(({ icon: Icon, label, text }, index) => (
          <article key={label} className="about-originality__card">
            <div className="about-originality__number">0{index + 1}</div>
            <div className="about-originality__icon"><Icon /></div>
            <div>
              <h3>{label}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
