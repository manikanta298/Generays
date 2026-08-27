import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Facebook,
  Instagram,
  Linkedin,
  Palette,
  Play,
  Plus,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { SplineScene } from "@/components/SplineScene";
import "./HomeHero.css";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const heroStats = [
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

type HeroIcon = {
  icon: LucideIcon;
  label: string;
  x: string;
  y: string;
  delay: string;
};

const heroIcons: HeroIcon[] = [
  { icon: Instagram, label: "Instagram", x: "36%", y: "35%", delay: "0s" },
  { icon: BarChart3, label: "Analytics", x: "66%", y: "35%", delay: "0.55s" },
  { icon: Target, label: "Digital strategy", x: "75%", y: "54%", delay: "1.1s" },
  { icon: Facebook, label: "Facebook", x: "67%", y: "76%", delay: "1.65s" },
  { icon: Linkedin, label: "LinkedIn", x: "34%", y: "76%", delay: "2.2s" },
  { icon: Palette, label: "Brand design", x: "25%", y: "54%", delay: "2.75s" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomeHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const updateSpotlight = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.max(150, Math.min(270, rect.width * 0.18));

    stage.style.setProperty("--spotlight-x", `${(x / rect.width) * 100}%`);
    stage.style.setProperty("--spotlight-y", `${(y / rect.height) * 100}%`);
    stage.style.setProperty("--spotlight-opacity", "1");

    heroIcons.forEach((item, index) => {
      const icon = iconRefs.current[index];
      if (!icon) return;
      const iconX = (parseFloat(item.x) / 100) * rect.width;
      const iconY = (parseFloat(item.y) / 100) * rect.height;
      const distance = Math.hypot(x - iconX, y - iconY);
      icon.style.setProperty("--reveal", clamp(1 - distance / radius, 0, 1).toFixed(3));
    });
  }, []);

  const hideSpotlight = useCallback(() => {
    stageRef.current?.style.setProperty("--spotlight-opacity", "0");
    iconRefs.current.forEach((icon) => icon?.style.setProperty("--reveal", "0.35"));
  }, []);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Plus className="home-hero__mark home-hero__mark--plus" aria-hidden="true" />
      <span className="home-hero__mark home-hero__mark--copyright" aria-hidden="true">&copy;</span>

      <div className="home-hero__inner">
        <div
          ref={stageRef}
          className="home-hero__stage"
          onPointerMove={updateSpotlight}
          onPointerLeave={hideSpotlight}
          aria-label="GeneRays interactive 3D hero"
        >
          <div className="home-hero__grid" aria-hidden="true" />
          <div className="home-hero__orbit home-hero__orbit--outer" aria-hidden="true" />
          <div className="home-hero__orbit home-hero__orbit--middle" aria-hidden="true" />
          <div className="home-hero__orbit home-hero__orbit--inner" aria-hidden="true" />
          <div className="home-hero__spotlight" aria-hidden="true" />

          <h2 className="home-hero__wordmark" aria-hidden="true">
            {"GENERAYS".split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="home-hero__wordmark-letter"
                style={{ "--letter-index": index } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </h2>

          <div className="home-hero__spline">
            <SplineScene scene={SPLINE_SCENE} className="home-hero__spline-canvas" />
          </div>

          <div className="home-hero__icons" aria-hidden="true">
            {heroIcons.map(({ icon: Icon, label, x, y, delay }, index) => (
              <span
                key={label}
                ref={(element) => { iconRefs.current[index] = element; }}
                className="home-hero__icon"
                style={{ "--icon-x": x, "--icon-y": y, "--icon-delay": delay } as CSSProperties}
                title={label}
              >
                <Icon />
              </span>
            ))}
          </div>

          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Redefine digital</p>
            <h1 id="home-hero-title" className="home-hero__headline">
              Experience<span>.</span>
            </h1>
            <p className="home-hero__lead">
              We build digital experiences that inspire trust, drive engagement and deliver measurable growth.
            </p>
            <Link to="/services" className="home-hero__work-button">
              <span className="home-hero__play-icon"><Play aria-hidden="true" /></span>
              View Our Work
            </Link>
            <Link to="/contact" className="home-hero__arrow-button" aria-label="Build your brand">
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="home-hero__bottom">
          <div className="home-hero__copy">
            <h2 className="home-hero__title">Ideas. Identity. Impact<span>.</span></h2>
            <p className="home-hero__description">
              A brand engineering company crafting bold identities and digital experiences that turn businesses into brands people remember.
            </p>
            <button
              type="button"
              className="home-hero__scroll"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              Scroll to explore <ArrowDown aria-hidden="true" />
            </button>
          </div>

          <div className="home-hero__side">
            <div className="home-hero__stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="home-hero__cta">
              Build My Brand <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
