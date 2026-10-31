import {
  Compass,
  PenTool,
  Palette,
  LayoutTemplate,
  ShoppingCart,
  Boxes,
  TrendingUp,
  Store,
  Mail,
  Gauge,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
export const serviceIcons: Record<string, LucideIcon> = {
  "brand-foundation": Compass,
  "logo-design": PenTool,
  "creative-studio": Palette,
  "website-development": LayoutTemplate,
  "ecommerce-development": ShoppingCart,
  "web-applications": Boxes,
  "digital-marketing": TrendingUp,
  "marketplace-growth": Store,
  "business-communication": Mail,
  "website-care-amc": Gauge,
  "whatsapp-automation": MessagesSquare,
};
export function getServiceIcon(slug: string) {
  return serviceIcons[slug] ?? Sparkles;
}
