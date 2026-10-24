import { useEffect, useState } from 'react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { testimonialRequest, type TestimonialRecord } from '@/services/testimonials';

export function TestimonialsSection() {
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    let latestRequest = 0;
    const load = async () => {
      const request = ++latestRequest;
      try {
        const data = await testimonialRequest('/api/testimonials', { signal: controller.signal });
        if (!controller.signal.aborted && request === latestRequest) setItems(data.items);
      } catch {
        if (!controller.signal.aborted && request === latestRequest) setItems([]);
      }
    };
    void load();
    const timer = window.setInterval(load, 30000);
    window.addEventListener('focus', load);
    return () => { controller.abort(); window.clearInterval(timer); window.removeEventListener('focus', load); };
  }, []);
  return <section id="testimonials" aria-labelledby="client-testimonials-title" className="border-b border-slate-200 bg-white py-12">
    <h2 id="client-testimonials-title" className="mb-6 text-center text-3xl font-bold text-slate-950">Client Testimonials</h2>
    <AnimatedTestimonials testimonials={items} />
  </section>;
}
