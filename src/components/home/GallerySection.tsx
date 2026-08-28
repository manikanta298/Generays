import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/page-hero";
import { galleryImages } from "@/content/gallery";
import CircularGallery from "@/components/CircularGallery";

type SelectedGalleryImage = {
  image: string;
  text: string;
};

export function GallerySection() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedGalleryImage | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="bg-background" aria-labelledby="visual-gallery-title">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div id="visual-gallery-title">
          <SectionHeading
            eyebrow="Visual gallery"
            title="Ideas, systems and experiences in motion."
            subtitle="Explore a curated visual layer of GeneRays work. The gallery moves automatically, or you can drag, scroll, or use the arrow keys to take control."
          />
        </div>

        <div className="mt-8 h-[500px] w-full md:mt-10 md:h-[620px]">
          <CircularGallery
            items={galleryImages.map((item) => ({ image: item.src, text: item.text }))}
            bend={3}
            textColor="oklch(0.19 0.01 265)"
            borderRadius={0.04}
            scrollSpeed={1.8}
            scrollEase={0.06}
            autoRotateSpeed={0.035}
            onSelect={setSelectedImage}
            fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap"
            font={isMobile ? "600 20px Space Grotesk" : "600 26px Space Grotesk"}
          />
        </div>

        <p className="mt-1 text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Auto-rotating · Drag or scroll to explore · Click an image for details
        </p>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.text} image details`}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/70"
              aria-label="Close image details"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black/10 p-3 sm:p-5">
              <img
                src={selectedImage.image}
                alt={selectedImage.text}
                className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>

            <div className="border-t border-border/60 px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold tracking-wide text-foreground sm:text-base">
                {selectedImage.text}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Gallery image details
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
