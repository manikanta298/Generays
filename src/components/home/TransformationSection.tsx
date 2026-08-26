import { ArrowRight, Award, BarChart3, EyeOff, Globe2, Palette, ShieldCheck, Sparkles, Target, TrendingUp, Users, Waypoints } from "lucide-react";
import { transformation } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";

const icons = [Palette, Globe2, Users, Sparkles, Waypoints, Target, BarChart3, EyeOff];
const afterIcons = [Sparkles, ShieldCheck, Globe2, Palette, TrendingUp, ShieldCheck, BarChart3, Globe2];

export function TransformationSection() {
  return (
    <section className="home-transform" aria-labelledby="transformation-title">
      <div className="home-transform__inner">
        <SectionHeading eyebrow="Transformation story" title="Before GeneRays. After GeneRays." />
        <div id="transformation-title" className="home-transform__grid">
          <div className="home-transform__panel home-transform__panel--before">
            <div className="home-transform__panel-head">
              <span className="home-transform__badge home-transform__badge--muted">Before</span>
              <h3>The starting point</h3>
            </div>
            {transformation.map((row, index) => {
              const Icon = icons[index] ?? Sparkles;
              return (
                <article className="home-transform__row" key={row.before}>
                  <span className="home-transform__icon home-transform__icon--muted"><Icon aria-hidden="true" /></span>
                  <span>{row.before}</span>
                </article>
              );
            })}
          </div>

          <div className="home-transform__connector" aria-hidden="true">
            {transformation.map((row) => (
              <span key={row.before} className="home-transform__arrow">
                <ArrowRight />
              </span>
            ))}
          </div>

          <div className="home-transform__panel home-transform__panel--after">
            <div className="home-transform__panel-head">
              <span className="home-transform__badge home-transform__badge--active">After</span>
              <h3>The transformation</h3>
            </div>
            {transformation.map((row, index) => {
              const Icon = afterIcons[index] ?? Sparkles;
              return (
                <article className="home-transform__row home-transform__row--after" key={row.after}>
                  <span className="home-transform__icon home-transform__icon--active"><Icon aria-hidden="true" /></span>
                  <span>{row.after}</span>
                  <span className="home-transform__chevron">›</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
