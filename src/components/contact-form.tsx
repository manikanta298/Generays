import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/site";
import { RazorpayCheckout } from "@/components/razorpay-checkout";

export default function ContactPageContent() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const fieldClass = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
  const labelClass = "font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";

  return (
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            {sent ? (
              <div className="rounded-sm border border-primary/25 bg-primary-soft p-10">
                <Check className="h-8 w-8 text-primary" />
                <h2 className="mt-5 font-display text-2xl font-bold text-foreground">Thanks — your enquiry is noted.</h2>
                <p className="mt-3 text-sm text-muted-foreground">We&apos;ll review your details and reply with next steps for your brand blueprint.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Send another enquiry <ArrowRight className="h-4 w-4" /></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div><label className={labelClass} htmlFor="name">Your name</label><input id="name" name="name" required className={fieldClass} placeholder="Jane Doe" /></div>
                  <div><label className={labelClass} htmlFor="company">Company</label><input id="company" name="company" className={fieldClass} placeholder="Acme Pvt Ltd" /></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div><label className={labelClass} htmlFor="email">Email</label><input id="email" name="email" type="email" required className={fieldClass} placeholder="you@company.com" /></div>
                  <div><label className={labelClass} htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" className={fieldClass} placeholder="+91 00000 00000" /></div>
                </div>
                <div><label className={labelClass} htmlFor="service">What do you need?</label><select id="service" name="service" className={fieldClass} defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}<option value="not-sure">Not sure yet — advise me</option></select></div>
                <div><label className={labelClass} htmlFor="message">Tell us about your business</label><textarea id="message" name="message" rows={5} required className={fieldClass} placeholder="What you do, who you sell to, and what's not working today." /></div>
                <button type="submit" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Build My Brand <ArrowRight className="h-4 w-4" /></button>
              </form>
            )}
          </div>

          <aside className="space-y-8 border-t border-border pt-10 md:border-l md:border-t-0 md:pl-14 md:pt-0">
            <div><p className="eyebrow">What happens next</p><ol className="mt-5 space-y-4 text-sm text-muted-foreground"><li>1. We read your enquiry and study your market.</li><li>2. A free consultation call to map the gaps.</li><li>3. A written brand blueprint with priorities and scope.</li></ol></div>
            <div className="rounded-sm border border-border p-6"><p className="font-display text-base font-semibold text-foreground">We won&apos;t sell you what you don&apos;t need.</p><p className="mt-2 text-sm text-muted-foreground">If the answer is one landing page instead of a full rebuild, that&apos;s what we&apos;ll tell you.</p></div>
            <RazorpayCheckout />
          </aside>
        </div>
      </section>
  );
}
