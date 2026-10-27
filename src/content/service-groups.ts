export const serviceGroups = [
  { id: "all", label: "All services" },
  { id: "brand", label: "Brand & creative" },
  { id: "digital", label: "Web & commerce" },
  { id: "growth", label: "Marketing & growth" },
  { id: "systems", label: "Systems & support" },
] as const;
export type ServiceGroup = (typeof serviceGroups)[number]["id"];
export const serviceGroupBySlug: Record<string, ServiceGroup> = {
  "brand-foundation": "brand",
  "logo-design": "brand",
  "creative-studio": "brand",
  "website-development": "digital",
  "ecommerce-development": "digital",
  "web-applications": "digital",
  "digital-marketing": "growth",
  "marketplace-growth": "growth",
  "business-communication": "systems",
  "website-care-amc": "systems",
  "whatsapp-automation": "systems",
};
