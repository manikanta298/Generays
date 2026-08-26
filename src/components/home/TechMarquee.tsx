import { BrandIcon } from "@/components/home/BrandIcon";
import type { BRAND_ICONS } from "@/data/brand-icons";

type Slug = keyof typeof BRAND_ICONS;

const ROW_ONE: Slug[] = [
  "siSemrush",
  "siGoogle",
  "siGrammarly",
  "siUnsplash",
  "siHootsuite",
  "siBuffer",
  "siMeta",
  "siGoogleads",
];

const ROW_TWO: Slug[] = [
  "siTiktok",
  "siGoogleanalytics",
  "siHubspot",
  "siZoho",
  "siMailchimp",
  "siIntercom",
  "siMake",
  "siZapier",
];

const repeated = (slugs: Slug[], times = 4) => Array.from({ length: times }).flatMap(() => slugs);

function MarqueeRow({ slugs, direction }: { slugs: Slug[]; direction: "left" | "right" }) {
  return (
    <div className={`tech-marquee__track tech-marquee__track--${direction}`}>
      {repeated(slugs).map((slug, index) => (
        <div key={`${slug}-${index}`} className="tech-marquee__badge">
          <BrandIcon slug={slug} size={26} />
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="tech-marquee" aria-label="Marketing and growth tools GeneRays works with">
      <MarqueeRow slugs={ROW_ONE} direction="left" />
      <MarqueeRow slugs={ROW_TWO} direction="right" />
      <div className="tech-marquee__fade tech-marquee__fade--left" aria-hidden="true" />
      <div className="tech-marquee__fade tech-marquee__fade--right" aria-hidden="true" />
    </div>
  );
}
