import { useEffect, useState } from "react";

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

  return (
    <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <div className="relative mx-auto h-[320px] w-full max-w-[280px] sm:h-[380px] sm:max-w-[330px]">
        {testimonials.map((item, index) => {
          const offset = (index - active + testimonials.length) % testimonials.length;
          const isActive = index === active;
          const cardClass = isActive
            ? "z-20 opacity-100"
            : offset === 1
              ? "z-10 translate-x-4 translate-y-4 scale-[0.96] opacity-40"
              : "pointer-events-none translate-x-8 translate-y-8 scale-[0.92] opacity-0";

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={"Show testimonial from " + item.name}
              className={"absolute inset-0 h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " + cardClass}
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-full w-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </button>
          );
        })}
      </div>

      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Client testimonials
        </p>
        <blockquote className="mt-5 text-2xl font-semibold leading-tight text-primary-foreground sm:text-3xl lg:text-4xl">
          “{testimonial.quote}”
        </blockquote>
        <div className="mt-8">
          <p className="font-display text-lg font-bold text-primary-foreground">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/65">
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
                  : "w-5 bg-primary-foreground/25 hover:bg-primary-foreground/45")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
