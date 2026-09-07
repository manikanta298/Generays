import { SectionHeading } from "@/components/page-hero";
import { galleryImages } from "@/content/gallery";

export function GallerySection() {
  return (
    <section className="bg-background" aria-labelledby="visual-gallery-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div id="visual-gallery-title">
          <SectionHeading
            eyebrow="Visual gallery"
            title="Ideas, systems and experiences."
            subtitle="Explore selected GeneRays work. Images are loaded directly as static assets with no carousel, WebGL renderer, auto-rotation, or loading animation."
          />
        </div>

        <div className="gallery-grid mt-6" aria-label="GeneRays project gallery">
          {galleryImages.map((item, index) => (
            <figure
              key={item.src}
              className={`gallery-tile ${index === 0 ? "gallery-tile--feature" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                width={900}
                height={700}
              />
              {item.text && <figcaption>{item.text}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
