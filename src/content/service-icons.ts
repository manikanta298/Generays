import {
  Blocks,
  Gauge,
  Layers3,
  MailCheck,
  MessageCircle,
  Palette,
  PanelsTopLeft,
  PenTool,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "brand-foundation": Layers3,
  "logo-design": PenTool,
  "creative-studio": Palette,
  "website-development": PanelsTopLeft,
  "ecommerce-development": ShoppingBag,
  "web-applications": Blocks,
  "digital-marketing": TrendingUp,
  "search-engine-optimization": SearchCheck,
  "marketplace-growth": Store,
  "business-communication": MailCheck,
  "website-care-amc": ShieldCheck,
  "whatsapp-automation": MessageCircle,
};

export function getServiceIcon(slug: string) {
  return serviceIcons[slug] ?? Sparkles;
}
