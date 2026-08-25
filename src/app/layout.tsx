import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "@/styles.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import SplashCursor from "@/components/SplashCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

const DEFAULT_SITE_URL = "https://generays.com";

function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new URL(DEFAULT_SITE_URL);
  try {
    return new URL(raw);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "GeneRays — Brand Engineering, Web Development & Digital Growth",
    template: "%s | GeneRays",
  },
  description:
    "GeneRays engineers complete brand ecosystems: identity, logo, websites, e-commerce, apps, marketing and automation.",
  applicationName: "GeneRays",
  authors: [{ name: "GeneRays" }],
  creator: "GeneRays",
  publisher: "GeneRays",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GeneRays",
    title: "GeneRays — Brand Engineering, Web Development & Digital Growth",
    description:
      "Building brands, engineering growth and creating digital impact through connected identity, technology and marketing.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "GeneRays — Brand Engineering & Digital Growth",
    description:
      "Identity, websites, commerce, applications, marketing and automation built from one blueprint.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlex.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          <SplashCursor />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
