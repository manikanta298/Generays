import { lazy, Suspense } from "react";
import { ArrowRight, BarChart3, Facebook, Instagram, Linkedin, Palette, Play, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const orbitIcons = [
  { Icon: Instagram, position: "top-left", label: "Social content" },
  { Icon: BarChart3, position: "top-right", label: "Performance analytics" },
  { Icon: Palette, position: "mid-left", label: "Brand design" },
  { Icon: Target, position: "mid-right", label: "Targeted growth" },
  { Icon: Linkedin, position: "bottom-left", label: "LinkedIn marketing" },
  { Icon: Facebook, position: "bottom-right", label: "Facebook marketing" },
];

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__inner">
        <h1 id="home-hero-title" className="home-hero__wordmark home-hero__anim home-hero__anim--1">
          GENERAYS
        </h1>

        <div className="home-hero__stage">
          <div className="home-hero__orbit-ring" aria-hidden="true" />

          <Suspense fallback={<div className="home-hero__robot-fallback" aria-hidden="true" />}>
            <Spline scene={SPLINE_SCENE} className="home-hero__robot" />
          </Suspense>

          {orbitIcons.map(({ Icon, position, label }, index) => (
            <div
              key={position}
              className={`home-hero__orb home-hero__orb--${position} home-hero__anim home-hero__anim--${index + 2}`}
              aria-label={label}
            >
              <Icon aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="home-hero__actions home-hero__anim home-hero__anim--8">
          <Link to="/services" className="home-hero__primary">
            <span className="home-hero__primary-icon">
              <Play aria-hidden="true" />
            </span>
            View Our Work
          </Link>
          <Link to="/contact" className="home-hero__secondary">
            Build My Brand <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <p className="home-hero__description home-hero__anim home-hero__anim--9">
          <strong>Redefine Digital Experience</strong>, we build digital experiences that inspire trust, drive engagement and deliver measurable growth.
        </p>
      </div>
    </section>
  );
}
