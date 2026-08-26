import {
  ArrowRight,
  BarChart3,
  EyeOff,
  Globe2,
  Palette,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Waypoints,
} from "lucide-react";
import { transformation } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import "./TransformationSection.css";

const beforeIcons = [Palette, Globe2, Users, Sparkles, Waypoints, Target, BarChart3, EyeOff];
const afterIcons = [Sparkles, ShieldCheck, Globe2, Palette, TrendingUp, ShieldCheck, BarChart3, Globe2];

export function TransformationSection() {
  return (
    <section className="home-transform" aria-labelledby="transformation-title">
      <div className="home-transform__inner">
        <SectionHeading eyebrow="Transformation story" title="Before GeneRays. After GeneRays." />

        <div id="transformation-title" className="home-transform__grid">
          <div className="home-transform__column-label home-transform__column-label--before">
            <span>Before</span>
            <p>The starting point</p>
          </div>
          <div className="home-transform__column-label home-transform__column-label--after">
            <span>After</span>
            <p>The transformation</p>
          </div>

          {transformation.map((row, index) => {
            const BeforeIcon = beforeIcons[index] ?? Sparkles;
            const AfterIcon = afterIcons[index] ?? Sparkles;

            return (
              <div className="home-transform__pair" key={row.before}>
                <article className="home-transform__card home-transform__card--before">
                  <span className="home-transform__icon home-transform__icon--muted" aria-hidden="true">
                    <BeforeIcon />
                  </span>
                  <div>
                    <span className="home-transform__micro-label">Before</span>
                    <h3>{row.before}</h3>
                  </div>
                </article>

                <div className="home-transform__arrow" aria-hidden="true">
                  <ArrowRight />
                </div>

                <article className="home-transform__card home-transform__card--after">
                  <span className="home-transform__icon home-transform__icon--active" aria-hidden="true">
                    <AfterIcon />
                  </span>
                  <div>
                    <span className="home-transform__micro-label">After</span>
                    <h3>{row.after}</h3>
                  </div>
                  <span className="home-transform__status" aria-hidden="true">
                    <span />
                  </span>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
