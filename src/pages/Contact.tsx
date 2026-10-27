import { PageHero } from "@/components/page-hero";
import { contactImage } from "@/content/media";
import ContactPageContent from "@/components/contact-form";


export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start your brand journey"
        title="Let's create the brand people remember."
        subtitle="Share your goals, current challenges and timeline. A free consultation helps us discuss priorities, scope and the right starting point."
        image={contactImage}
        imageAlt="Futuristic GeneRays communication and contact visualization"
      />
      <ContactPageContent />
    </>
  );
}
