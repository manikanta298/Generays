import { BRAND_ICONS } from "@/data/brand-icons";

type BrandIconProps = {
  slug: keyof typeof BRAND_ICONS;
  size?: number;
};

/** Renders a brand mark from our local Simple Icons data subset. */
export function BrandIcon({ slug, size = 22 }: BrandIconProps) {
  const icon = BRAND_ICONS[slug];
  if (!icon) return null;

  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill={`#${icon.hex}`} aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  );
}
