import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  MessageCircle,
  Palette,
  Play,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office.png";
import logoMark from "@/assets/generays-logo-mark.svg";
import { SplineScene } from "@/components/SplineScene";
import "./HomeHero.css";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const heroStats = [
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

const serviceStack = ["Strategy", "Design", "Development", "Growth"];

type HeroIcon = {
  icon: LucideIcon;
  label: string;
  x: string;
  y: string;
};

const heroIcons: HeroIcon[] = [
  { icon: Instagram, label: "Social media", x: "17%", y: "31%" },
  { icon: Linkedin, label: "Professional network", x: "30%", y: "72%" },
  { icon: Globe2, label: "Digital presence", x: "50%", y: "17%" },
  { icon: BarChart3, label: "Growth analytics", x: "72%", y: "29%" },
  { icon: MessageCircle, label: "Customer engagement", x: "82%", y: "66%" },
  { icon: Palette, label: "Brand design", x: "18%", y: "64%" },
  { icon: Facebook, label: "Social marketing", x: "68%", y: "78%" },
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
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    const radius = Math.max(170, Math.min(290, rect.width * 0.19));

    stage.style.setProperty("--spotlight-x", `${xPercent}%`);
    stage.style.setProperty("--spotlight-y", `${yPercent}%`);
    stage.style.setProperty("--spotlight-opacity", "1");

    heroIcons.forEach((item, index) => {
      const icon = iconRefs.current[index];
      if (!icon) return;

      const iconX = (parseFloat(item.x) / 100) * rect.width;
      const iconY = (parseFloat(item.y) / 100) * rect.height;
      const distance = Math.hypot(x - iconX, y - iconY);
      const reveal = clamp(1 - distance / radius, 0, 1);
      icon.style.setProperty("--reveal", reveal.toFixed(3));
    });
  }, []);

  const hideSpotlight = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.style.setProperty("--spotlight-opacity", "0");
    iconRefs.current.forEach((icon) => icon?.style.setProperty("--reveal", "0.2"));
  }, []);

  const wordmark = "GENERAYS";

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Plus className="home-hero__mark home-hero__mark--plus" aria-hidden="true" />
      <span className="home-hero__mark home-hero__mark--copyright" aria-hidden="true">
        &copy;
      </span>

      <div className="home-hero__inner">
        <div
          ref={stageRef}
          className="home-hero__stage"
          onPointerMove={updateSpotlight}
          onPointerLeave={hideSpotlight}
          aria-label="GeneRays interactive 3D brand experience"
        >
          <img
            className="home-hero__stage-image"
            src={heroOffice}
            alt=""
            aria-hidden="true"
          />

          <div className="home-hero__spotlight" aria-hidden="true" />

          <div className="home-hero__brand" aria-label="GeneRays">
            <img src={logoMark} alt="" aria-hidden="true" />
            <span>GeneRays</span>
          </div>

          <h2 className="home-hero__wordmark" aria-hidden="true">
            {wordmark.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="home-hero__wordmark-letter"
                style={{ "--letter-index": index } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </h2>

          <div className="home-hero__spline" aria-hidden="true">
            <SplineScene scene={SPLINE_SCENE} className="home-hero__spline-canvas" />
          </div>

          <div className="home-hero__icons" aria-hidden="true">
            {heroIcons.map(({ icon: Icon, label, x, y }, index) => (
              <span
                key={label}
                ref={(element) => {
                  iconRefs.current[index] = element;
                }}
                className="home-hero__icon"
                style={{ "--icon-x": x, "--icon-y": y } as CSSProperties}
                title={label}
              >
                <Icon />
              </span>
            ))}
          </div>

          <div className="home-hero__panel" aria-label="GeneRays engagement stages">
            <ul>
              {serviceStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/services" className="home-hero__showreel">
              <span className="home-hero__showreel-icon">
                <Play aria-hidden="true" />
              </span>
              View Our Work
            </Link>
          </div>
        </div>

        <div className="home-hero__bottom">
          <div className="home-hero__copy">
            <h1 id="home-hero-title" className="home-hero__title">
              Ideas<span>.</span> Identity<span>.</span> Impact<span>.</span>
            </h1>
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
