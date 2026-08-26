import { Code2, Megaphone, Palette, Rocket, Search, Sparkles } from "lucide-react";
import { framework } from "@/content/site";
import { SectionHeading } from "@/components/page-hero";
import { IconChip } from "@/components/futuristic";

export function FrameworkSection() {
  const icons = [Search, Palette, Code2, Rocket, Megaphone];
  const accents = ["text-neon-cyan", "text-neon-violet", "text-neon-blue", "text-neon-amber", "text-neon-green"];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading eyebrow="Brand engineering framework" title="Five stages. One blueprint." subtitle="Nothing gets built before the plan is right. Each stage feeds the next." />
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {framework.map((stage, i) => {
            const StageIcon = icons[i] ?? Sparkles;
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
  );
}
