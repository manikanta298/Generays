# GeneRays reference content audit

Reference: https://dcampaign.com/  
Reviewed: 27 October 2026  
Design baseline: `5aaf38cab243ccfdb205e292d7f12288a5e84b2c` (existing main branch)

## Scope

Restore the existing GeneRays design entirely, then improve copy in existing content slots. Keep the same page structure, section order, service cards, styling, imagery, animation, loading screen, cursor, navigation, portfolio embeds, forms, testimonial behavior and payment integration. No new routes, sections, components or service offerings are introduced.

Reference material informs the topics and clarity of the new copy. All implemented wording is written for GeneRays rather than copied verbatim. DCampaign's statistics, credentials, offices, clients, testimonials, awards and performance claims are not GeneRays facts and have not been transferred.

This is a review of the reference's primary page families and relevant service pages, not an exhaustive crawl of every article and location URL.

## Page-level findings and implementation

| Existing GeneRays area | Reference content pattern | Content-only implementation |
| --- | --- | --- |
| Homepage hero | Explains the offer and business relevance early | Clarifies GeneRays' connected brand, website and marketing offer; retains the existing headline and buttons |
| Homepage services | Introduces capabilities in practical language | Rewrites the existing introduction around business priorities |
| Services catalogue | Explains what individual services cover | Updates the eleven existing service introductions without changing titles, card counts or included capabilities |
| Service detail pages | Explains scope and practical customer needs | Uses updated shared service introductions in the existing detail-page slots |
| About | Explains the agency's approach | Replaces abstract introductory claims with audience, positioning and project priorities |
| Process | Describes planning, review and delivery stages | Clarifies the existing Discover, Design, Build, Launch and Grow text; aligns homepage and process-page explanations |
| Contact | Invites a brief covering objectives and requirements | Clarifies the existing introduction, message placeholder and next-step descriptions; no field or submission changes |
| Final homepage call to action | Gives a clear reason to enquire | Replaces generic competitive claims with a request for audience, goals and project details |
| Portfolio | Supports credibility with project-specific information | Retained unchanged; fuller case studies require project facts from GeneRays |
| Testimonials | Provides customer proof | Retained unchanged; no reference quotes or invented testimonials added |

## Service mapping

| Existing GeneRays service | Relevant reference | Content focus |
| --- | --- | --- |
| Brand Foundation | [Brand strategy](https://dcampaign.com/services/brand-strategy) | Audience, positioning, voice and consistent identity |
| Logo Design | [Logo design](https://dcampaign.com/services/logo-designing) | Brand relevance and use across applications |
| Creative Studio | [Graphic design](https://dcampaign.com/services/graphic-designing) | Clear sales, campaign and packaging communication |
| Website Development | [Web development](https://dcampaign.com/services/web-development) | Audience, navigation, content and enquiry journey |
| E-Commerce Development | [Shopify development](https://dcampaign.com/services/shopify-development) | Product discovery, checkout and operating requirements; GeneRays' existing platforms retained |
| Web Applications | [App development](https://dcampaign.com/services/app-development) | Roles, workflows and reporting; no mobile-app offering inferred |
| Digital Marketing & Social Media | [Performance marketing](https://dcampaign.com/services/performance-marketing) | Audience, content, enquiries and measurement |
| Amazon & Marketplace Growth | [Marketplace management](https://dcampaign.com/services/marketplace-management) | Listings, product visuals and account operations |
| Business Communication | No equivalent: reference email marketing is a different service | Clarify GeneRays' existing business email setup; do not imply lifecycle email campaigns |
| Website Care — AMC | Web-development support themes; no direct equivalent verified | Clarify existing updates, backups, monitoring and fixes |
| WhatsApp Automation | [WhatsApp marketing](https://dcampaign.com/services/whatsapp-marketing) | Customer journeys, reminders and connected follow-up |

## Findings requiring GeneRays content before implementation

- Reference-only offers such as standalone SEO, AEO/GEO, AI agents, personal branding and lifecycle email marketing need confirmation before being listed as GeneRays services.
- Detailed case studies need the client's challenge, agreed scope, delivered work and permission to publish. Quantitative results need a measurement period and supporting evidence.
- Team biographies, credentials, office details, awards and partnership claims need GeneRays-specific information.
- Industry pages need relevant GeneRays experience. A reference location directory does not establish GeneRays offices or coverage.
- Blog, resource and FAQ pages would introduce new page or section structure. Record them as future content work, rather than inserting them into this design-preserving change.
- The existing “See Our Work” button points to Services. It is recorded for a separate functional fix; its destination is preserved in this content-only change.

## Verification

Compare the final diff against the design baseline, not just against the redesign commit. There must be no net CSS, asset, layout, JSX structure, class-name, interaction or integration change. Only copy and this audit document should differ. Existing service identifiers, titles, item lists and five process stages must remain intact.
