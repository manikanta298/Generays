import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { websiteProjects } from "@/content/projects";
import { services } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EnquiryPopup } from "@/components/EnquiryPopup";
import SplashCursor from "@/components/SplashCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ProcessPage from "@/pages/Process";
import ServicesPage from "@/pages/Services";
import ServiceDetailPage from "@/pages/ServiceDetail";
import PortfolioPage from "@/pages/Portfolio";
import ProjectDetailPage from "@/pages/ProjectDetail";
import ContactPage from "@/pages/Contact";
import NotFoundPage from "@/pages/NotFound";
import ErrorPage from "@/pages/Error";

import AdminPage from "@/pages/Admin";
import SubmitTestimonial from "@/pages/SubmitTestimonial";

function RouteSeo() {
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string,string> = {
      "/": "GeneRays — Brand Engineering, Web Development & Digital Growth",
      "/about": "About GeneRays — A Brand Engineering Company",
      "/process": "Our Brand Engineering Process — GeneRays",
      "/services": "Services — Brand, Web, Commerce, Marketing & Automation",
      "/portfolio": "Portfolio — Selected GeneRays Work",
      "/admin": "Master Admin — GeneRays",
      "/submit-testimonial": "Share Your Experience — GeneRays",
      "/contact": "Contact GeneRays — Start Your Brand Journey",
    };
    const project = websiteProjects.find(item => location.pathname === `/portfolio/${item.slug}`);
    const service = services.find(item => location.pathname === `/services/${item.slug}`);
    document.title = project ? `${project.title} — GeneRays Portfolio` : service ? `${service.title} — GeneRays` : titles[location.pathname] ?? "GeneRays — Brand Engineering";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const canonical = document.querySelector('link[rel="canonical"]') ?? document.createElement("link");
    canonical.setAttribute("rel","canonical");
    canonical.setAttribute("href", `${window.location.origin}${location.pathname}`);
    document.head.appendChild(canonical);
  }, [location.pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <SplashCursor />
      <SiteHeader />
      <main className="min-h-[70vh]">
        <RouteSeo />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/testimonials" element={<AdminPage />} />
          <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      {!location.pathname.startsWith("/admin") && <EnquiryPopup />}
    </div>
  );
}
