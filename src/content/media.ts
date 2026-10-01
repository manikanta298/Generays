import type { LucideIcon } from "lucide-react";
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

import brandFoundation from "@/assets/01_Brand_Foundation.png";
import logoDesign from "@/assets/02_Logo_Design.png";
import creativeStudio from "@/assets/03_Creative_Studio.png";
import websiteDevelopment from "@/assets/04_Website_Development.png";
import ecommerceDevelopment from "@/assets/05_Ecommerce_Development.png";
import webApplications from "@/assets/06_Web_Applications.png";
import digitalMarketing from "@/assets/07_Digital_Marketing_Social_Media.png";
import marketplaceGrowth from "@/assets/08_Amazon_Marketplace_Growth.png";
import businessCommunication from "@/assets/09_Business_Communication.png";
import websiteCareAmc from "@/assets/10_Website_Care_AMC.png";
import whatsappAutomation from "@/assets/11_Customer_Engagement_WhatsApp_Automation.png";

export { default as heroBlueprint } from "@/assets/12_Services_Architecture_Overview.png";
export { default as aboutImage } from "@/assets/about-header.png";
export { default as processImage } from "@/assets/process-header.png";
export { default as servicesHeaderImage } from "@/assets/services-header.png";
export { default as contactImage } from "@/assets/09_Business_Communication.png";

/** Accent utility classes — colours resolve from design tokens, never hardcoded hex. */
export type AccentClass =
  | "text-neon-cyan"
  | "text-neon-violet"
  | "text-neon-pink"
  | "text-neon-amber"
  | "text-neon-green"
  | "text-neon-blue";

export type ServiceMedia = {
  image: string;
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
