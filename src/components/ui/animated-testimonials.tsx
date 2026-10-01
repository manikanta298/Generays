import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
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
      {/* Mobile carousel — text-only testimonials */}
      <div className="mx-auto w-full max-w-md px-5 sm:max-w-lg sm:px-6 md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: "translate3d(-" + active * 100 + "%, 0, 0)" }}
          >
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="flex aspect-square w-full shrink-0 flex-col px-1 text-slate-900"
                aria-label={"Testimonial from " + item.name}
              >
                <div className="flex min-h-0 flex-1 flex-col justify-center px-2 pt-2 text-center sm:px-4 sm:pt-4">
                  <p className="font-display text-lg font-bold leading-tight text-slate-950 sm:text-xl">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                    {item.designation}
                  </p>
                  <blockquote className="mt-2 line-clamp-3 min-h-0 flex-1 overflow-hidden text-sm leading-5 text-slate-700 sm:text-base sm:leading-6">
                    “{item.quote}”
                  </blockquote>

                  <div
                    className="mt-2 flex shrink-0 items-center justify-between border-t border-slate-200 pt-2"
                    aria-label="Mobile testimonial navigation"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous testimonial"
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next testimonial"
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(testimonials.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet + desktop — image and testimonial content share the section surface */}
      <div className="mx-auto hidden w-full max-w-5xl px-5 sm:px-6 md:block lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="min-w-0 py-2 md:py-4">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Client testimonials
            </p>
            <blockquote className="mt-5 text-2xl font-semibold leading-tight text-primary sm:text-3xl lg:text-4xl">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-7">
              <p className="font-display text-lg font-bold text-primary">
                {testimonial.name}
              </p>
              <p className="mt-1 text-sm text-primary/65">
                {testimonial.designation}
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-md items-center justify-between border-t border-slate-200 pt-4" aria-label="Testimonial navigation">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-primary transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-primary transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/50">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
