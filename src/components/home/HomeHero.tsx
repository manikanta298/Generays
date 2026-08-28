import {
  ArrowRight,
  BarChart3,
  Facebook,
  Instagram,
  Linkedin,
  Palette,
  Play,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { SplineScene } from "@/components/SplineScene";
import "./HomeHeroReference.css";

type HeroIcon = {
  icon: LucideIcon;
  label: string;
  x: string;
  y: string;
  delay: string;
};

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const heroIcons: HeroIcon[] = [
  { icon: Instagram, label: "Instagram", x: "35%", y: "35%", delay: "0s" },
  { icon: BarChart3, label: "Analytics", x: "65%", y: "35%", delay: "0.35s" },
  { icon: Target, label: "Digital strategy", x: "75%", y: "53%", delay: "0.7s" },
  { icon: Facebook, label: "Facebook", x: "67%", y: "75%", delay: "1.05s" },
  { icon: Linkedin, label: "LinkedIn", x: "33%", y: "75%", delay: "1.4s" },
  { icon: Palette, label: "Brand design", x: "25%", y: "53%", delay: "1.75s" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomeHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);

  const updateSpotlight = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.max(160, Math.min(300, rect.width * 0.2));

    stage.style.setProperty("--spotlight-x", `${(x / rect.width) * 100}%`);
    stage.style.setProperty("--spotlight-y", `${(y / rect.height) * 100}%`);
    stage.style.setProperty("--spotlight-opacity", "1");

    heroIcons.forEach((item, index) => {
      const icon = iconRefs.current[index];
      if (!icon) return;
      const iconX = (parseFloat(item.x) / 100) * rect.width;
      const iconY = (parseFloat(item.y) / 100) * rect.height;
      const distance = Math.hypot(x - iconX, y - iconY);
      icon.style.setProperty("--reveal", clamp(1 - distance / radius, 0.35, 1).toFixed(3));
    });
  }, []);

  const hideSpotlight = useCallback(() => {
    stageRef.current?.style.setProperty("--spotlight-opacity", "0");
    iconRefs.current.forEach((icon) => icon?.style.setProperty("--reveal", "0.7"));
  }, []);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="hero-shell">
        <div ref={stageRef} className="hero-stage" onPointerMove={updateSpotlight} onPointerLeave={hideSpotlight}>
          <div className="hero-brand-section" aria-hidden="true">
            <h1 id="home-hero-title" className="hero-wordmark">
              {"GENERAYS".split("").map((letter, index) => (
                <span key={`${letter}-${index}`} className="hero-wordmark__letter" style={{ "--letter-index": index } as CSSProperties}>{letter}</span>
              ))}
            </h1>
          </div>

          <div className="hero-orbit-section" aria-hidden="true">
            <div className="hero-orbit hero-orbit--outer" />
            <div className="hero-orbit hero-orbit--middle" />
            <div className="hero-orbit hero-orbit--inner" />
            <div className="hero-spotlight" />
          </div>

          <div className="hero-robot-section">
            <SplineScene scene={SPLINE_SCENE} className="hero-robot__canvas" />
          </div>

          <div className="hero-icon-section" aria-label="Social and analytics icons">
            {heroIcons.map(({ icon: Icon, label, x, y, delay }, index) => (
              <div
                key={label}
                ref={(element) => { iconRefs.current[index] = element; }}
                className="hero-icon-section__item"
                style={{ "--icon-x": x, "--icon-y": y, "--icon-delay": delay } as CSSProperties}
                title={label}
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className="hero-action-section">
            <div className="hero-action-section__item hero-action-section__item--work">
              <Link to="/services" className="hero-button hero-button--primary">
                <span className="hero-button__play"><Play aria-hidden="true" /></span>
                <span>View Our Work</span>
              </Link>
            </div>
            <div className="hero-action-section__item hero-action-section__item--brand">
              <Link to="/contact" className="hero-button hero-button--secondary">
                <span>Build My Brand</span>
                <ArrowRight className="hero-button__arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* <div className="hero-copy-section">
            <p className="hero-copy-section__text">
              <strong>Redefine Digital Experience</strong>, we build digital experiences
              <br className="hero-copy-section__break" />
              that inspire trust, drive engagement and deliver
              <br className="hero-copy-section__break" />
              measurable growth.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
