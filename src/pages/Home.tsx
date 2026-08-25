import { Link } from "react-router-dom";
import { ArrowRight, Check, Rocket, Search, Sparkles, Code2, Megaphone, Cloud, Database, Smartphone, Cpu, Palette } from "lucide-react";
import { ecosystem, framework, promises, services, technologies, transformation, whyGeneRays } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import { IconChip, ServiceCard } from "@/components/futuristic";
import LogoLoop from "@/components/LogoLoop";
import { galleryImages } from "@/content/gallery";
import CircularGallery from "@/components/CircularGallery";


export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="blueprint-grid fade-mask-b pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
          <div>
            <p className="eyebrow rise-in">Brand Engineering Company</p>
            <h1 className="rise-in mt-6 text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
              Stop looking like every other business.
              <span className="mt-3 block text-primary">Become the brand everyone remembers.</span>
            </h1>
            <p className="rise-in mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Most businesses sell products. The unforgettable ones build brands. At GeneRays we engineer your entire digital identity — from your very first logo to the last customer click.
            </p>
            <div className="rise-in mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Build My Brand <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-sm border border-primary/30 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft">
                View Our Work
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="blueprint-grid-fine relative h-full rounded-sm border border-primary/20 p-7">
              <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-accent" />
              <div className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent" />
              <p className="eyebrow">Blueprint</p>
              <ol className="mt-6 space-y-4">
                {ecosystem.map((node, i) => (
                  <li key={node} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/30 font-display text-[11px] font-semibold text-primary">{i + 1}</span>
                    <span className="font-display text-sm font-semibold text-foreground">{node}</span>
                    <span className="h-px flex-1 bg-border" />
                  </li>
                ))}
              </ol>
              <p className="mt-7 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Plan first. Then build identity, digital presence, marketing and growth around it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Core positioning" title="We don't sell services. We build business ecosystems." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
            {[
              ["A logo without identity", "is decoration."],
              ["A website without strategy", "is a brochure."],
              ["Social media without consistency", "is noise."],
              ["Advertising without branding", "is expense."],
            ].map(([lead, tail]) => (
              <div key={lead} className="group bg-background p-7 transition-all duration-300 hover:bg-primary-soft">
                <div className="mb-5 inline-flex rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-primary"><Sparkles className="h-5 w-5" aria-hidden /></div>
                <p className="font-display text-base font-semibold text-foreground">{lead}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{tail}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">At GeneRays, every service connects together to create one powerful business ecosystem.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
            {ecosystem.map((node, i) => (
              <span key={node} className="flex items-center gap-3">
                <span className="rounded-sm border border-primary/25 bg-background px-3.5 py-2 font-display text-sm font-semibold text-primary">{node}</span>
                {i < ecosystem.length - 1 ? <ArrowRight className="h-4 w-4 text-muted-foreground" /> : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Brand engineering framework" title="Five stages. One blueprint." subtitle="Nothing gets built before the plan is right. Each stage feeds the next." />
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {framework.map((stage, i) => {
              const icons = [Search, Palette, Code2, Rocket, Megaphone];
              const StageIcon = icons[i] ?? Sparkles;
              const accents = ["text-neon-cyan", "text-neon-violet", "text-neon-blue", "text-neon-amber", "text-neon-green"];
              return (
                <div key={stage.step} className="glow-ring lift-hover rounded-xl border border-border bg-background p-7">
                  <IconChip icon={StageIcon} accent={accents[i] ?? "text-neon-cyan"} size="sm" />
                  <span className="mt-5 block font-display text-3xl font-bold text-primary/25">{stage.step}</span>
                  <h3 className="mt-4 font-display text-base font-bold uppercase tracking-wide text-foreground">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Services architecture" title="Everything your brand needs. Under one roof." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="Technology expertise" title="We choose technology around the business — not the other way around." subtitle="A flexible stack spanning product engineering, cloud, commerce, data and automation." />
          <div className="mt-12 rounded-2xl border border-border bg-primary-soft/40 py-8 shadow-[var(--shadow-glow)]">
            <LogoLoop
              logos={[
                { node: <Code2 />, title: "React" },
                { node: <Cpu />, title: "Next-generation web" },
                { node: <Cloud />, title: "Cloud platforms" },
                { node: <Database />, title: "Data systems" },
                { node: <Smartphone />, title: "Mobile experiences" },
                { node: <Rocket />, title: "Growth infrastructure" },
              ]}
              speed={55}
              direction="left"
              logoHeight={34}
              gap={58}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--primary-soft)"
              ariaLabel="GeneRays technology expertise"
              className="tech-logo-loop"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {technologies.map((tech) => <span key={tech} className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground">{tech}</span>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent">Why GeneRays</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">We don&apos;t believe in templates. We believe in originality.</h2>
            <ul className="mt-8 space-y-3.5">
              {whyGeneRays.map((point) => <li key={point} className="flex gap-3 text-sm text-primary-foreground/85"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{point}</li>)}
            </ul>
          </div>
          <div className="border-t border-primary-foreground/15 pt-10 md:border-l md:border-t-0 md:pl-14 md:pt-0">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-highlight">Our promise</p>
            <ul className="mt-8 space-y-5">{promises.map((item) => <li key={item} className="font-display text-lg font-semibold">{item}</li>)}</ul>
            <p className="mt-10 text-sm text-primary-foreground/70">Success isn&apos;t delivering files. Success is building businesses.</p>
          </div>
        </div>
      </section>

      


        {/* Transformation story */}
      
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Transformation story" title="Before GeneRays. After GeneRays." />
          <div className="mt-12 overflow-hidden rounded-sm border border-border">
            <div className="grid grid-cols-2 bg-muted">
              <div className="border-r border-border px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before</div>
              <div className="px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-primary">After</div>
            </div>
            {transformation.map((row) => (
              <div key={row.before} className="grid grid-cols-2 border-t border-border">
                <div className="border-r border-border px-6 py-4 text-sm text-muted-foreground">{row.before}</div>
                <div className="px-6 py-4 text-sm font-medium text-foreground">{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Visual gallery" title="Ideas, systems and experiences in motion." subtitle="Explore a curated visual layer of GeneRays work. Drag, scroll, or use the arrow keys to move through the gallery." />
          <div className="mt-10 overflow-hidden rounded-2xl border border-primary-foreground/10 ">
            <div className="h-[520px] w-full md:h-[620px]">
              <CircularGallery
                items={galleryImages.map((item) => ({ image: item.src, text: item.text }))}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollSpeed={1.8}
                scrollEase={0.06}
                fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
                font="bold 28px Orbitron"
              />
            </div>
          </div>
          <p className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-primary-foreground/60">Drag or scroll to explore</p>
        </div>
      </section>

      {/* Final call */}
      
      <section className="relative overflow-hidden">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-28">
          <p className="eyebrow">Final call</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-5xl">Your business already exists. Now it&apos;s time to build a brand.</h2>
          <p className="mt-6 text-base text-muted-foreground">Thousands of businesses compete every day. Only a handful become unforgettable. Let&apos;s create the one people remember.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Start Your Brand Journey <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center rounded-sm border border-primary/30 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft">Schedule a Free Brand Consultation</Link>
          </div>
        </div>
      </section>
      
    
    </>
  );
}
