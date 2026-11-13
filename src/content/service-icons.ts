import {
  Layers,
  PenTool,
  Clapperboard,
  Monitor,
  ShoppingCart,
  PanelsTopLeft,
  Megaphone,
  Store,
  Mail,
  ShieldCheck,
  MessageCircle,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "brand-foundation": Layers,
  "logo-design": PenTool,
  "creative-studio": Clapperboard,
  "website-development": Monitor,
  "ecommerce-development": ShoppingCart,
  "web-applications": PanelsTopLeft,
  "digital-marketing": Megaphone,
  "search-engine-optimization": SearchCheck,
  "marketplace-growth": Store,
  "business-communication": Mail,
  "website-care-amc": ShieldCheck,
  "whatsapp-automation": MessageCircle,
};

export function getServiceIcon(slug: string) {
  return serviceIcons[slug] ?? Sparkles;
}
