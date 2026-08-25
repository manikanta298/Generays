import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import {
  Boxes,
  Compass,
  Gauge,
  LayoutTemplate,
  Mail,
  MessagesSquare,
  Palette,
  PenTool,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";

import brandFoundation from "@/assets/svc-brand-foundation.jpg";
import logoDesign from "@/assets/svc-logo-design.jpg";
import creativeStudio from "@/assets/svc-creative-studio.jpg";
import websiteDevelopment from "@/assets/svc-website-development.jpg";
import ecommerceDevelopment from "@/assets/svc-ecommerce-development.jpg";
import webApplications from "@/assets/svc-web-applications.jpg";
import digitalMarketing from "@/assets/svc-digital-marketing.jpg";
import marketplaceGrowth from "@/assets/svc-marketplace-growth.jpg";
import businessCommunication from "@/assets/svc-business-communication.jpg";
import websiteCareAmc from "@/assets/svc-website-care-amc.jpg";
import whatsappAutomation from "@/assets/svc-whatsapp-automation.jpg";

export { default as heroBlueprint } from "@/assets/hero-blueprint.jpg";
export { default as aboutImage } from "@/assets/section-about.jpg";
export { default as processImage } from "@/assets/section-process.jpg";
export { default as contactImage } from "@/assets/section-contact.jpg";

/** Accent utility classes — colours resolve from design tokens, never hardcoded hex. */
export type AccentClass =
  | "text-neon-cyan"
  | "text-neon-violet"
  | "text-neon-pink"
  | "text-neon-amber"
  | "text-neon-green"
  | "text-neon-blue";

export type ServiceMedia = {
  image: StaticImageData;
  icon: LucideIcon;
  accent: AccentClass;
  alt: string;
};

export const serviceMedia: Record<string, ServiceMedia> = {
  "brand-foundation": {
    image: brandFoundation,
    icon: Compass,
    accent: "text-neon-violet",
    alt: "Holographic brand identity blueprint glowing on a neon grid",
  },
  "logo-design": {
    image: logoDesign,
    icon: PenTool,
    accent: "text-neon-pink",
    alt: "Neon geometric logo mark forming from light",
  },
  "creative-studio": {
    image: creativeStudio,
    icon: Palette,
    accent: "text-neon-amber",
    alt: "Floating neon wireframe print and packaging pieces",
  },
  "website-development": {
    image: websiteDevelopment,
    icon: LayoutTemplate,
    accent: "text-neon-cyan",
    alt: "Glowing wireframe browser windows floating in blue space",
  },
  "ecommerce-development": {
    image: ecommerceDevelopment,
    icon: ShoppingCart,
    accent: "text-neon-green",
    alt: "Neon shopping cart and product boxes on a digital grid",
  },
  "web-applications": {
    image: webApplications,
    icon: Boxes,
    accent: "text-neon-blue",
    alt: "Holographic application panels glowing in a dark blue room",
  },
  "digital-marketing": {
    image: digitalMarketing,
    icon: TrendingUp,
    accent: "text-neon-pink",
    alt: "Neon growth chart rising above a connected network of nodes",
  },
  "marketplace-growth": {
    image: marketplaceGrowth,
    icon: Store,
    accent: "text-neon-amber",
    alt: "Glowing product displays on a neon marketplace grid",
  },
  "business-communication": {
    image: businessCommunication,
    icon: Mail,
    accent: "text-neon-violet",
    alt: "Neon email envelopes travelling along light trails",
  },
  "website-care-amc": {
    image: websiteCareAmc,
    icon: Gauge,
    accent: "text-neon-cyan",
    alt: "Neon shield with a monitoring pulse waveform",
  },
  "whatsapp-automation": {
    image: whatsappAutomation,
    icon: MessagesSquare,
    accent: "text-neon-green",
    alt: "Neon chat bubbles connected by automation light streams",
  },
};

export const fallbackMedia: ServiceMedia = {
  image: brandFoundation,
  icon: Sparkles,
  accent: "text-neon-cyan",
  alt: "Futuristic neon blueprint grid",
};

export function getServiceMedia(slug: string): ServiceMedia {
  return serviceMedia[slug] ?? fallbackMedia;
}

export const accentCycle: AccentClass[] = [
  "text-neon-cyan",
  "text-neon-violet",
  "text-neon-pink",
  "text-neon-amber",
  "text-neon-green",
  "text-neon-blue",
];
