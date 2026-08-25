import type { MetadataRoute } from "next";
import { services } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://generays.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/process", "/services", "/contact"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
