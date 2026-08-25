import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import SplashCursor from "@/components/SplashCursor";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ProcessPage from "@/pages/Process";
import ServicesPage from "@/pages/Services";
import ServiceDetailPage from "@/pages/ServiceDetail";
import ContactPage from "@/pages/Contact";
import NotFoundPage from "@/pages/NotFound";
import ErrorPage from "@/pages/Error";

function RouteSeo() {
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string,string> = {
      "/": "GeneRays — Brand Engineering, Web Development & Digital Growth",
      "/about": "About GeneRays — A Brand Engineering Company",
      "/process": "Our Brand Engineering Process — GeneRays",
      "/services": "Services — Brand, Web, Commerce, Marketing & Automation",
      "/contact": "Contact GeneRays — Start Your Brand Journey",
    };
    document.title = titles[location.pathname] ?? "GeneRays — Brand Engineering";
    const canonical = document.querySelector('link[rel="canonical"]') ?? document.createElement("link");
    canonical.setAttribute("rel","canonical");
    canonical.setAttribute("href", `${window.location.origin}${location.pathname}`);
    document.head.appendChild(canonical);
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashCursor />
      <SiteHeader />
      <main className="min-h-[70vh]">
        <RouteSeo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
