import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
  interval = 5000,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[active];

  const goToPrevious = () => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  return (
    <>
      {/* Mobile carousel — square image cards with bottom navigation */}
      <div className="mx-auto w-full max-w-md px-5 sm:max-w-lg sm:px-6 md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: "translateX(-" + active * 100 + "%)" }}
          >
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="w-full shrink-0"
                aria-label={"Testimonial from " + item.name}
              >
                <div className="aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="block h-full w-full object-cover object-center"
                    loading={item === testimonial ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                <div className="pt-7">
                  <p className="font-display text-xl font-bold leading-tight text-primary sm:text-2xl">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-primary/60 sm:text-base">
                    {item.designation}
                  </p>
                  <blockquote className="mt-7 text-lg leading-relaxed text-primary/65 sm:text-xl">
                    “{item.quote}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-start gap-4 pb-1">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary shadow-sm transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary shadow-sm transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Tablet + desktop — existing two-column presentation preserved */}
      <div className="mx-auto hidden w-full max-w-6xl items-center gap-10 md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="relative mx-auto h-[360px] w-full max-w-[300px] sm:h-[400px] sm:max-w-[340px] md:h-[440px] md:max-w-[360px] lg:h-[480px] lg:max-w-[390px]">
          {testimonials.map((item, index) => {
            const offset = (index - active + testimonials.length) % testimonials.length;
            const isActive = index === active;
            const cardClass = isActive
              ? "z-20 opacity-100"
              : offset === 1
                ? "z-10 translate-x-3 translate-y-3 scale-[0.96] opacity-40"
                : "pointer-events-none translate-x-6 translate-y-6 scale-[0.92] opacity-0";

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={"Show testimonial from " + item.name}
                className={"absolute inset-0 h-full w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " + cardClass}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="block h-full w-full object-cover object-center"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Client testimonials
          </p>
          <blockquote className="mt-5 text-2xl font-semibold leading-tight text-primary sm:text-3xl lg:text-4xl">
            “{testimonial.quote}”
          </blockquote>
          <div className="mt-8">
            <p className="font-display text-lg font-bold text-primary">
              {testimonial.name}
            </p>
            <p className="mt-1 text-sm text-primary/65">
              {testimonial.designation}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-label="Testimonial navigation">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={"View testimonial from " + item.name}
                aria-current={index === active ? "true" : undefined}
                className={
                  "h-1.5 rounded-full transition-all duration-300 " +
                  (index === active
                    ? "w-10 bg-accent"
                    : "w-5 bg-primary/20 hover:bg-primary/40")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
