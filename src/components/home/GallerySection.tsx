import { SectionHeading } from "@/components/page-hero";
import { galleryImages } from "@/content/gallery";

const carouselItems = [...galleryImages, ...galleryImages];

export function GallerySection() {
  return (
    <section className="bg-background" aria-labelledby="visual-gallery-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div id="visual-gallery-title">
          <SectionHeading
            eyebrow="Featured Work"
            title="Ideas, systems and experiences."
            subtitle="A glimpse into the brands, campaigns, and experiences we've helped bring to life."
          />
        </div>

        <div
          className="gallery-carousel mt-6"
          aria-label="Featured GeneRays client work"
        >
          <div className="gallery-carousel__track">
            {carouselItems.map((item, index) => (
              <figure className="gallery-carousel__tile" key={item.src + "-" + index}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="eager"
                  decoding="async"
                  width={900}
                  height={700}
                />
                {item.text && <figcaption>{item.text}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
