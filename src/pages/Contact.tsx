import { PageHero } from "@/components/page-hero";
import ContactPageContent from "@/components/contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start your brand journey"
        title="Let's create the brand people remember."
        subtitle="Tell us where your business is today. We'll come back with a clear blueprint of what to build first."
      />
      <ContactPageContent />
    </>
  );
}
