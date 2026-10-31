# Logo palette, enquiry popup and reference interactions

## Scope and design boundary

The existing page sections, typography, spacing, breakpoints, header/footer, homepage composition and portfolio grid are retained. The approved changes are logo-derived colors, icon-only service cards, a side enquiry popup, catalogue filters and portfolio detail navigation. The reference's orange palette and unrelated clients, performance figures and service claims are not adopted.

References reviewed:
- https://dcampaign.com/services — service categories and individual service links.
- https://dcampaign.com/case-studies — industry filters and individual project detail links.

## Brand color

`public/Generays.png` contains a solid blue RGB(0, 43, 142), hex `#002B8E`. This is the color source; the older SVG mark used a different blue and is aligned with the supplied logo. Primary, cyan/blue accent tokens, bright blue utility classes and custom blue color declarations now use this logo color. Existing light backgrounds and shadows remain subtle tints; neutral text and semantic feedback colors remain readable. Original raster illustrations are retained, except service-card photos, which are replaced by service-specific Lucide icons.

## Enquiry flow

The right-side “Get an estimate” icon opens a three-step dialog on all public pages:
1. Name, email, optional phone and company.
2. Service, optional website and preferred timeline, and project brief.
3. Review and explicit Send enquiry action.

Back retains the entered details. A failed send retains the brief and offers retry. Success appears only after the API confirms SMTP acceptance. Escape, close and backdrop dismiss the popup; focus and page scrolling are restored. Keyboard focus stays inside an open dialog. The header's existing mobile navigation menu retains its navigation behavior.

`POST /api/contact` supports both the popup and the existing Contact page. Input is validated on the server. The recipient is always the configured `CONTACT_TO`, never a client-supplied address. Website and timeline are included in the email. The handler rejects unsupported methods, invalid content, foreign browser origins and malformed fields. Missing SMTP settings or SMTP failure produce an error rather than a false success.

Required server-only deployment variables remain:
- `SMTP_HOST`
- `SMTP_PORT` (defaults to 587; 465 uses TLS)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_TO`

For local full-stack testing, set `APP_ORIGIN` to the local server origin. Vite alone does not execute Vercel API functions. No credentials are committed or exposed to the browser. No test email is sent to production by this workflow. SMTP acceptance is not a guarantee of final inbox delivery.

## Services and portfolio

The service grid retains its existing card geometry and service URLs. All eleven cards use relevant icons with no background photos. The Services page adds category filters; the homepage still shows all services.

The portfolio retains all eight projects, live previews and external website links. Industry filters and `/portfolio/:slug` pages provide reference-style discovery and detail navigation. Detail pages use existing GeneRays project descriptions and categories; no unverified results or deliverables are invented. Live-preview dialogs include a direct-link fallback for sites that block embedding.

## Verification

Automated checks cover form validation, back navigation, review payload, success and retry, focus trapping/restoration, service filters and icon-only cards, portfolio filters and links, and server-side email validation/failure states. Original admin and testimonial tests remain in place.

Browser visual QA and actual SMTP delivery require an accessible preview and configured email service. The managed preview daemon is unavailable in this workspace. Existing Vercel deployment protection is preserved; no public share link is created.
