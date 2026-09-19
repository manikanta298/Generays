import { SectionHeading } from "@/components/page-hero";
import { galleryImages, type GalleryImage } from "@/content/gallery";
import CircularGallery from "@/components/CircularGallery";
import { useEffect, useState } from "react";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <section className="bg-background" aria-labelledby="visual-gallery-title">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div id="visual-gallery-title">
            <SectionHeading
              eyebrow="Visual gallery"
              title="Ideas, systems and experiences in motion."
              subtitle="Explore a curated visual layer of GeneRays work. Click any image to open a detailed view."
            />
          </div>

          <div className="mt-4 h-[460px] w-full sm:h-[520px] md:mt-6 md:h-[620px]">
            <CircularGallery
              items={galleryImages.map((item) => ({ image: item.src, text: item.text }))}
              bend={3}
              textColor="oklch(0.19 0.01 265)"
              borderRadius={0.04}
              scrollSpeed={4.8}
              scrollEase={0.06}
              autoRotateSpeed={0.132}
              fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap"
              font="600 26px Space Grotesk"
              onSelect={(item) => {
                const image = galleryImages.find((galleryItem) => galleryItem.src === item.image);
                if (image) setSelectedImage(image);
              }}
            />
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex h-[100dvh] w-full items-center justify-center bg-slate-950/90 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.text}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
            <div className="flex min-h-0 flex-1 items-center justify-center bg-slate-950">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[70vh] w-full object-contain md:max-h-[82vh]"
              />
            </div>

            <div className="flex w-full shrink-0 flex-col justify-center p-6 sm:p-8 md:w-[320px]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                GeneRays Gallery
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-slate-900">
                {selectedImage.text}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {selectedImage.alt}
              </p>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="mt-6 inline-flex w-fit items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
