import { SectionHeading } from "@/components/page-hero";
import { galleryImages } from "@/content/gallery";
import CircularGallery from "@/components/CircularGallery";

export function GallerySection() {
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
            scrollSpeed={4.8}
            scrollEase={0.06}
            autoRotateSpeed={0.132}
            fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap"
            font="600 26px Space Grotesk"
          />
        </div>

        <p className="mt-1 text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Auto-rotating · Drag or scroll to explore
        </p>
      </div>
    </section>
  );
}
