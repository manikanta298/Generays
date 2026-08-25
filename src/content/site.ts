export type Service = {
  slug: string;
  letter: string;
  title: string;
  tagline: string;
  intro: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "brand-foundation",
    letter: "A",
    title: "Brand Foundation",
    tagline: "Every memorable brand starts with identity.",
    intro:
      "We define who you are before we design how you look. Strategy, positioning and voice come first, so every asset built later carries the same intent.",
    items: [
      "Brand Identity",
      "Brand Strategy",
      "Brand Positioning",
      "Colour Psychology",
      "Typography",
      "Brand Guidelines",
      "Brand Voice",
    ],
  },
  {
    slug: "logo-design",
    letter: "B",
    title: "Logo Design",
    tagline: "Your logo is the signature people remember.",
    intro:
      "Every logo begins with a blank page — never a template. We craft marks that stay recognisable at any size, in any medium.",
    items: [
      "Minimal Logos",
      "Lettermark Logos",
      "Wordmark Logos",
      "Mascot Logos",
      "Emblems",
      "Combination Logos",
      "3D Logos",
      "Luxury Logos",
      "Corporate Logos",
      "Modern Logos",
      "Handcrafted Logos",
      "Custom Logos",
    ],
  },
  {
    slug: "creative-studio",
    letter: "C",
    title: "Creative Studio",
    tagline: "Because first impressions happen in seconds.",
    intro:
      "Print, packaging and campaign creative built on one consistent visual system — so your brand looks the same everywhere it appears.",
    items: [
      "Corporate Profiles",
      "Company Brochures",
      "Product Catalogues",
      "Flyers",
      "Visiting Cards",
      "Letterheads",
      "Presentation Decks",
      "Social Media Creatives",
      "Restaurant Menus",
      "Book Covers",
      "Certificates",
      "Invitations",
      "Standees",
      "Banners",
      "Hoardings",
      "Digital Ads",
      "Event Branding",
      "Packaging Design",
      "Label Design",
      "Box Design",
      "Product Packaging",
      "Retail Packaging",
      "Luxury Packaging",
      "E-commerce Packaging",
      "Amazon-ready Packaging",
    ],
  },
  {
    slug: "website-development",
    letter: "D",
    title: "Website Development",
    tagline: "Your website is your best salesperson.",
    intro:
      "Fast, responsive, search-ready websites engineered around how your customers actually decide — not around a theme demo.",
    items: [
      "Corporate Websites",
      "Business Websites",
      "Educational Institution Websites",
      "Government Websites",
      "Portfolio Websites",
      "NGO Websites",
      "Hospital Websites",
      "Hotel Websites",
      "Restaurant Websites",
      "Membership Websites",
      "Booking Websites",
      "Real Estate Websites",
      "Custom CMS",
      "Landing Pages",
    ],
  },
  {
    slug: "ecommerce-development",
    letter: "E",
    title: "E-Commerce Development",
    tagline: "Turn digital attention into transactions.",
    intro:
      "Storefronts, marketplaces and B2B portals built to sell — with the payments, inventory and order plumbing handled properly.",
    items: [
      "WordPress / WooCommerce",
      "Magento",
      "Shopify",
      "Laravel Commerce",
      "PHP Commerce",
      "Marketplace Solutions",
      "B2B Portals",
      "B2C Stores",
      "Multi-vendor Platforms",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Management",
    ],
  },
  {
    slug: "web-applications",
    letter: "F",
    title: "Web Applications",
    tagline: "If your business runs on a process, we can build the system behind it.",
    intro:
      "Custom software that replaces spreadsheets and manual follow-ups with dashboards, workflows and reporting your team will actually use.",
    items: [
      "Custom Web Applications",
      "ERP Solutions",
      "CRM Solutions",
      "Inventory Management",
      "Billing Software",
      "Hospital Software",
      "Restaurant POS",
      "Appointment Systems",
      "School Management",
      "Online Portals",
      "Customer Dashboards",
      "Admin Panels",
      "Cloud Applications",
    ],
  },
  {
    slug: "digital-marketing",
    letter: "G",
    title: "Digital Marketing & Social Media",
    tagline: "Visibility is earned. Growth is engineered.",
    intro:
      "Organic and paid programmes run against numbers, not vibes — content, campaigns and remarketing tied to leads and revenue.",
    items: [
      "Facebook",
      "Instagram",
      "LinkedIn",
      "X (Twitter)",
      "Pinterest",
      "Snapchat",
      "WhatsApp",
      "Google Business Profile",
      "YouTube",
      "Organic Growth",
      "Paid Advertising",
      "Content Strategy",
      "Campaign Management",
      "Reels Marketing",
      "Performance Marketing",
      "Lead Generation",
      "Remarketing",
      "Conversion Campaigns",
      "Influencer Campaigns",
      "Analytics",
    ],
  },
  {
    slug: "marketplace-growth",
    letter: "H",
    title: "Amazon & Marketplace Growth",
    tagline: "Don't just list a product. Build a storefront that sells it.",
    intro:
      "Listings, imagery and A+ content optimised for the way marketplace shoppers search, compare and buy.",
    items: [
      "Amazon Seller Registration / Onboarding",
      "Product Listing",
      "A+ Content",
      "Keyword Research",
      "Product Images",
      "Amazon Brand Store Setup",
      "Store Optimization",
      "Account Support",
    ],
  },
  {
    slug: "business-communication",
    letter: "I",
    title: "Business Communication",
    tagline: "A serious business deserves a serious digital address.",
    intro:
      "Professional email on your own domain, configured securely and migrated without downtime or lost mail.",
    items: [
      "Professional / Corporate Email Setup",
      "Google Workspace",
      "Microsoft 365",
      "Corporate Email Migration",
      "Email Configuration",
      "Email Security",
      "Website Email Integration",
    ],
  },
  {
    slug: "website-care-amc",
    letter: "J",
    title: "Website Care — AMC",
    tagline: "Launch day is not the finish line.",
    intro:
      "Annual maintenance that keeps your site fast, patched, backed up and monitored — so problems get fixed before customers notice.",
    items: [
      "Website AMC",
      "Performance Monitoring",
      "Security Updates",
      "Plugin Management",
      "Version Upgrades",
      "Backups",
      "Bug Fixes",
      "Speed Optimization",
      "Technical Support",
    ],
  },
  {
    slug: "whatsapp-automation",
    letter: "K",
    title: "Customer Engagement — WhatsApp Automation",
    tagline: "Turn conversations into systems.",
    intro:
      "WhatsApp Business API journeys that qualify leads, confirm orders and remind customers — automatically, at scale.",
    items: [
      "WhatsApp Business API",
      "Automated Messaging",
      "Broadcast Campaigns",
      "Lead Automation",
      "Chatbots",
      "Customer Notifications",
      "Appointment Reminders",
      "Order Updates",
      "CRM Integration",
    ],
  },
];

export const framework = [
  {
    step: "01",
    title: "Discover",
    body: "Every successful brand begins with understanding. We learn your business, audience, competitors and goals before creating anything.",
  },
  {
    step: "02",
    title: "Design",
    body: "We create the personality your business deserves. Not just beautiful. Recognizable.",
  },
  {
    step: "03",
    title: "Build",
    body: "Websites, applications, automation and digital infrastructure — everything works together.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Marketing begins only after your foundation is strong. Now your business is ready to scale.",
  },
  {
    step: "05",
    title: "Grow",
    body: "We continuously optimize your brand through data, creativity, campaigns and technology.",
  },
];

export const ecosystem = [
  "Brand Blueprint",
  "Identity",
  "Website",
  "Marketing",
  "Automation",
  "Growth",
];

export const technologies = [
  "PHP",
  "HTML5",
  "CSS3",
  "Laravel",
  "WordPress",
  "Magento",
  "Joomla",
  "Shopify",
  "JavaScript",
  "Bootstrap",
  "MySQL",
  "REST APIs",
  "Responsive Web Development",
];

export const whyGeneRays = [
  "Every logo begins with a blank page.",
  "Every website starts with strategy.",
  "Every campaign is backed by data.",
  "Every design has purpose.",
  "Every brand receives focused attention.",
  "We build connected systems instead of isolated deliverables.",
];

export const promises = [
  "We won't sell you what you don't need.",
  "We won't copy another brand.",
  "We won't disappear after delivery.",
  "We won't stop after launch.",
];

export const transformation: Array<{ before: string; after: string }> = [
  { before: "Random logo", after: "Recognizable brand" },
  { before: "Average website", after: "Professional identity" },
  { before: "Inactive social media", after: "Powerful website" },
  { before: "No brand identity", after: "Consistent design" },
  { before: "No consistency", after: "Lead generation" },
  { before: "No strategy", after: "Customer trust" },
  { before: "Marketing confusion", after: "Business growth" },
  { before: "Invisible online", after: "Digital authority" },
];
