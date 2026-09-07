import { useEffect } from "react";

const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "p",
  "li",
  "a",
  "button",
  "label",
  "small",
  "figcaption",
  ".eyebrow",
  ".service-bento__number",
  ".service-bento__kicker",
  ".service-bento__action",
  ".home-transform__micro-label",
  ".home-transform__badge",
  ".home-transform__column-label span",
].join(",");

export function useHomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>(".home-page");
    if (!home) return;

    const sections = Array.from(home.querySelectorAll<HTMLElement>("section"));
    const textElements = Array.from(home.querySelectorAll<HTMLElement>(TEXT_SELECTOR));

    sections.forEach((section, index) => {
      section.classList.add("home-reveal-section");
      section.style.setProperty("--home-reveal-index", String(Math.min(index, 8)));
    });

    textElements.forEach((element, index) => {
      element.classList.add("home-reveal-text");
      element.style.setProperty("--home-text-index", String(Math.min(index % 10, 9)));
    });

    if (typeof IntersectionObserver === "undefined") {
      sections.forEach((section) => section.classList.add("is-visible"));
      textElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    [...sections, ...textElements].forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
