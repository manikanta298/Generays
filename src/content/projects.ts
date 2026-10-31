export const websiteProjects = [
  {
    title: "JATAS Ayurveda",
    category: "Ayurveda & Wellness Website",
    description: "A premium wellness-focused website for JATAS Ayurveda.",
    url: "https://jatasayurveda.com/",
    industry: "Wellness",
    slug: "jatas-ayurveda",
  },
  {
    title: "RR Properties",
    category: "Real Estate Website",
    description:
      "A polished digital presence for RR Properties and its real-estate offering.",
    url: "https://rrproperties.co.in/",
    industry: "Real Estate",
    slug: "rr-properties",
  },
  {
    title: "ZENAIZ",
    category: "Engineering Internship Platform",
    description: "An engineering-focused digital experience for ZENAIZ.",
    url: "https://www.zenaiz.com/",
    industry: "Education",
    slug: "zenaiz",
  },
  {
    title: "Anish Dental",
    category: "Healthcare Website",
    description:
      "A dental-care website designed to present services and patient information clearly.",
    url: "https://anish-dental-five.vercel.app/",
    industry: "Healthcare",
    slug: "anish-dental",
  },
  {
    title: "Beauty Parlour",
    category: "Beauty & Salon Website",
    description: "A modern beauty-parlour website experience.",
    url: "https://beauty-parlour-website-ruby.vercel.app/",
    industry: "Beauty",
    slug: "beauty-parlour",
  },
  {
    title: "GL Sports",
    category: "Sports Website",
    description: "A dedicated sports-focused web experience.",
    url: "https://gl-sports.vercel.app/",
    industry: "Sports",
    slug: "gl-sports",
  },
  {
    title: "Eliphas Shipping Services",
    category: "Shipping & Logistics Website",
    description: "A business website for shipping and logistics services.",
    url: "https://eliphas-shipping-services.vercel.app/",
    industry: "Business Services",
    slug: "eliphas-shipping-services",
  },
  {
    title: "Edu-Tech",
    category: "Education Platform",
    description:
      "An education-focused digital experience for learning and technology.",
    url: "https://edu-tech123-uzav.vercel.app/",
    industry: "Education",
    slug: "edu-tech",
  },
];

export type WebsiteProject = (typeof websiteProjects)[number];
export const projectIndustries = [
  "All",
  ...new Set(websiteProjects.map((project) => project.industry)),
];
