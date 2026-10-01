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
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
      <article
        className="mx-auto max-w-4xl text-center"
        aria-label={"Testimonial from " + testimonial.name}
      >
        <blockquote className="text-base font-medium leading-7 text-slate-950 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
          “{testimonial.quote}”
        </blockquote>

        <div className="mt-4">
          <p className="font-display text-base font-bold text-slate-950 sm:text-lg">
            {testimonial.name}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700 sm:text-sm">
            {testimonial.designation}
          </p>
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-3"
          aria-label="Testimonial navigation"
        >
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <span className="min-w-[72px] text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
