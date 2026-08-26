import { SectionHeading } from "@/components/page-hero";
import { galleryImages } from "@/content/gallery";
import CircularGallery from "@/components/CircularGallery";

export function GallerySection() {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading eyebrow="Visual gallery" title="Ideas, systems and experiences in motion." subtitle="Explore a curated visual layer of GeneRays work. Drag, scroll, or use the arrow keys to move through the gallery." />
        <div className="mt-10 overflow-hidden rounded-2xl border border-primary-foreground/10">
          <div className="h-[520px] w-full md:h-[620px]">
            <CircularGallery
              items={galleryImages.map((item) => ({ image: item.src, text: item.text }))}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={1.8}
              scrollEase={0.06}
              fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
              font="bold 28px Orbitron"
            />
          </div>
        </div>
        <p className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-primary-foreground/60">Drag or scroll to explore</p>
      </div>
    </section>
  );
}
