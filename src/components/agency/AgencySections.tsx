import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { framework } from "@/content/site";
import { galleryImages } from "@/content/gallery";

export function SelectedWork() {
  return (
    <section
      className="gr-section gr-work"
      aria-labelledby="selected-work-heading"
    >
      <div className="gr-container">
        <div className="gr-section-head">
          <div>
            <p className="gr-eyebrow">Selected creative work</p>
            <h2 id="selected-work-heading">
              Good ideas.
              <br />
              <span>Made tangible.</span>
            </h2>
          </div>
          <div>
            <p>
              Brand campaigns and visual communication, built to help real
              businesses show up with confidence.
            </p>
            <Link className="gr-text-link" to="/portfolio">
              Explore our portfolio{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="gr-work-grid">
          {galleryImages.slice(0, 3).map((item, index) => (
            <Link
              to="/portfolio#creative-work"
              className="gr-work-card"
              key={item.src}
            >
              <div className="gr-work-image">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width="600"
                  height="600"
                />
              </div>
              <div className="gr-work-caption">
                <div>
                  <span>0{index + 1} / Campaign creative</span>
                  <h3>{item.text}</h3>
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProcessOverview() {
  return (
    <section
      className="gr-section gr-process"
      aria-labelledby="process-heading"
    >
      <div className="gr-container">
        <div className="gr-section-head">
          <div>
            <p className="gr-eyebrow">The brand engineering framework</p>
            <h2 id="process-heading">
              Five stages.
              <br />
              <span>One connected blueprint.</span>
            </h2>
          </div>
          <Link className="gr-text-link" to="/process">
            Discover our process <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <ol className="gr-process-grid">
          {framework.map((stage) => (
            <li key={stage.step}>
              <span className="gr-process-number">{stage.step}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
const faqs = [
  {
    question: "Can I start with just one service?",
    answer:
      "Yes. Choose a focused service, or connect several into a wider brand ecosystem. We start by understanding your priorities and recommending what to build first.",
  },
  {
    question: "What does brand engineering mean?",
    answer:
      "It means defining the strategic blueprint first, then connecting your identity, website, marketing and automation around it. Each part supports the same business goals.",
  },
  {
    question: "Can you help with an existing website or brand?",
    answer:
      "Yes. Our services cover brand positioning, website development, campaigns, applications and ongoing website care. Tell us what is working and where you need support.",
  },
  {
    question: "How do we agree on scope and pricing?",
    answer:
      "Start with a free brand consultation. We discuss your business, priorities and requirements, then map the scope and next steps before work begins.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Our Website Care — AMC service includes options for monitoring, updates, backups, fixes and technical support. We can discuss the maintenance your website needs.",
  },
];
export function FrequentlyAskedQuestions() {
  return (
    <section className="gr-section gr-faq" aria-labelledby="faq-heading">
      <div className="gr-container gr-faq-layout">
        <div>
          <p className="gr-eyebrow">A little more clarity</p>
          <h2 id="faq-heading">
            Good questions.
            <br />
            <span>Clear answers.</span>
          </h2>
          <p>
            Choosing a digital partner is a big step. Here’s a good place to
            start.
          </p>
          <Link className="gr-text-link" to="/contact">
            Let’s talk about your project{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <div>
          {faqs.map((item) => (
            <details key={item.question} className="gr-faq-item">
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AgencyCallToAction() {
  return (
    <section className="gr-cta" aria-labelledby="cta-heading">
      <div className="gr-container gr-cta-inner">
        <div>
          <p className="gr-eyebrow">Your next chapter starts here</p>
          <h2 id="cta-heading">
            Your business exists.
            <br />
            Let’s build the brand.
          </h2>
          <p>Strategy, creativity and technology. Working together for you.</p>
        </div>
        <div className="gr-cta-action">
          <Link className="gr-button gr-button-white" to="/contact">
            Start your brand journey{" "}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <span>
            <Check size={15} aria-hidden="true" /> Free initial brand
            consultation
          </span>
        </div>
      </div>
    </section>
  );
}
export function AboutIntro() {
  return (
    <section
      className="gr-section gr-about"
      aria-labelledby="about-intro-heading"
    >
      <div className="gr-container gr-about-layout">
        <div>
          <p className="gr-eyebrow">A brand engineering company</p>
          <h2 id="about-intro-heading">
            We see the
            <br />
            <span>whole picture.</span>
          </h2>
          <Link className="gr-text-link" to="/about">
            Get to know GeneRays <ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <div>
          <p className="gr-large-copy">
            A memorable brand is more than a logo. It’s everything your
            customers see, feel and experience.
          </p>
          <p>
            We connect your brand strategy, design, digital presence and
            marketing into one business ecosystem. Every website starts with
            strategy. Every campaign is backed by data. Every design has
            purpose.
          </p>
          <div className="gr-principles">
            <span>Strategy first</span>
            <span>Original by design</span>
            <span>Built to grow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
