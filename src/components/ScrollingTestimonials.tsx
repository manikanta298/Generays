import { useEffect, useRef, useState } from 'react';
import type { TestimonialRecord } from '@/services/testimonials';

export function ScrollingTestimonials({ testimonials }: { testimonials: TestimonialRecord[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const element = track.current;
    if (!element || paused || hovered || focused || testimonials.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      const last = element.scrollWidth - element.clientWidth;
      if (last <= 0) return;
      if (element.scrollLeft >= last - 1) element.scrollLeft = 0;
      else element.scrollLeft += 1;
    }, 30);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, testimonials.length]);
  if (!testimonials.length) return <p className="px-6 text-center text-slate-600">Client stories will appear here after approval.</p>;
  return <div className="mx-auto max-w-6xl px-5">
    <div className="mb-4 flex justify-end gap-3">
      <button aria-label="Scroll testimonials left" className="rounded border px-4 py-2" onClick={() => track.current?.scrollBy({ left: -360, behavior: 'smooth' })}>←</button>
      <button aria-pressed={paused} className="rounded border px-4 py-2" onClick={() => setPaused(value => !value)}>{paused ? 'Resume scrolling' : 'Pause scrolling'}</button>
      <button aria-label="Scroll testimonials right" className="rounded border px-4 py-2" onClick={() => track.current?.scrollBy({ left: 360, behavior: 'smooth' })}>→</button>
    </div>
    <div ref={track} role="region" aria-label="Client testimonials" tabIndex={0} className="flex gap-5 overflow-x-auto pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {testimonials.map(item => <article key={item._id} className="w-[min(85vw,360px)] shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-950">
        <blockquote className="whitespace-pre-wrap break-words leading-7">“{item.quote}”</blockquote>
        <p className="mt-5 break-words font-bold">{item.name}</p><p className="mt-1 break-words text-sm text-slate-600">{item.designation}</p>
      </article>)}
    </div>
  </div>;
}
