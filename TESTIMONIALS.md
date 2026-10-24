# Testimonial moderation

This patch fits this repository's React/Vite + Vercel Functions architecture. It does not require a separate Express server. MongoDB is accessed only by server functions.

## Structure

- `server/testimonials.ts`: MongoDB connection reuse, field validation, Basic admin authentication and shared handlers.
- `api/testimonials.ts`: approved-only public GET feed and pending-only customer POST submissions.
- `api/admin/testimonials.ts`: authenticated moderation and pending entry creation.
- `src/pages/AdminTestimonials.tsx`: admin UI at `/admin/testimonials`.
- `src/components/home/TestimonialsSection.tsx`: sole public renderer, mounted on Home at `#testimonials`.
- `src/services/testimonials.ts`: request helper and browser types.
- `tests/testimonials.test.ts`: API behavior tests using an injected database double.

## Configure and run

1. Run `npm ci`.
2. Configure `MONGODB_URI`, `MONGODB_DB`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` in Vercel server environment variables, then redeploy. Never prefix these with `VITE_`. Basic auth must be used over HTTPS. If an existing session auth system is used, replace `isAdmin` with verified server-side session and admin-role checks; do not trust a browser role or arbitrary header.
3. For local full-stack testing, use Vercel CLI `vercel dev` with matching environment variables; Vite alone does not serve API functions. Set `APP_ORIGIN` to the exact local origin, such as `http://localhost:3000`. Production same-host HTTPS origins are accepted automatically.
4. Visit `/admin/testimonials`. The API challenges for Basic credentials. Add entries, review pending, approve, edit or delete.
5. Create this index once in the selected MongoDB database:

```js
db.testimonials.createIndex({ status: 1, createdAt: -1, _id: -1 });
```

Document shape:

```js
{
  name: 'Client name',
  designation: 'Founder, Company',
  quote: 'Client feedback',
  status: 'pending', // or 'approved'
  createdAt: new Date(),
  updatedAt: new Date()
}
```

Existing documents without an explicit approved status are not published. Review legacy records before assigning a status. The previous two hardcoded homepage quotes were removed; add them through the dashboard if desired. There is no automatic seed or automatic approval.

## API

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/testimonials` | Latest 50 approved entries, public fields only |
| POST | `/api/testimonials` | Public JSON `{name, designation, quote}`; status forced pending |
| GET | `/api/admin/testimonials?status=pending&page=1` | 50 pending entries per page (default status) |
| GET | `/api/admin/testimonials?status=approved&page=1` | Approved moderation list |
| POST | `/api/admin/testimonials` | Body `{name, designation, quote}`; status forced pending |
| PATCH | `/api/admin/testimonials?id=<ObjectId>` | Body `{status:"approved"}` approves |
| PATCH | `/api/admin/testimonials?id=<ObjectId>` | Body `{name, designation, quote}` edits and resets pending |
| DELETE | `/api/admin/testimonials?id=<ObjectId>` | Permanently deletes after UI confirmation |

All admin methods require authentication. Text lengths: name 120, designation 200, quote 2000; whitespace-only content is rejected. MongoDB operators cannot be supplied as field values. React renders quotes as text rather than HTML. API responses use `Cache-Control: no-store`. Existing homepage tabs refresh on focus and every 30 seconds, so a delete/edit can remain visible in an already-open tab until its next refresh. Offline tabs cannot be remotely cleared.

Only the homepage Testimonials section imports the public feed renderer. The admin page necessarily shows records for management. No API can prevent someone who receives public testimonials from copying them elsewhere; the placement guarantee concerns this application's components.

## QA results and remaining checks

Automated commands: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.

API tests cover authentication, pending creation despite a supplied approved status, pending vs approved filtering, approval, edit returning pending, deletion, missing IDs, invalid fields/status/page, cross-origin mutation rejection, public response projection and generic database failures. They use an injected database double, not a live MongoDB server.

Two existing TypeScript issues were corrected: the portfolio lightbox tuple type and unused gallery props not supported by CircularGallery. The lint configuration now recognizes Node globals in the existing JavaScript API.

Production acceptance checks (not performed without deployed credentials/database):

- Anonymous admin GET/POST/PATCH/DELETE return 401; wrong credentials fail.
- Add a uniquely named pending entry; confirm MongoDB persistence and absence from public GET and all public pages.
- Approve; confirm the entry appears inside `#testimonials` only on Home, including after a reload/new tab.
- Check About, Process, Services, service details, Portfolio, Contact and 404 pages for absence of testimonial content.
- Edit an approved entry; confirm it becomes pending and disappears from public GET. Reapprove and verify the edit.
- Delete; confirm MongoDB removal and disappearance after refresh in existing public tabs.
- Test keyboard navigation, loading, empty states, retry after API failure and mobile layout at 375px and desktop 1440px.
- Test pagination with 51+ pending entries, long quotes and HTML-like text (displayed literally).
- Verify production Vercel routes execute the API functions rather than SPA rewrites and confirm the MongoDB index with explain.

## Continued QA — 24 October 2026

All 11 automated tests pass. TypeScript, ESLint, the production build and `git diff --check` pass.

Additional coverage includes every admin method with missing/wrong/malformed credentials, stable page-two pagination, switching edit targets, starting a blank add form, approval requests and list refresh, API error/retry recovery, literal HTML rendering, carousel list shrinkage, and out-of-order public responses.

Two additional defects were fixed:

- Switching between Edit buttons reused uncontrolled input values from the first entry. The edit form now remounts when the target changes, preventing accidental overwriting of a different testimonial with stale content.
- Overlapping public refreshes could restore stale content after a newer refresh removed it. Only the latest request may update the section.

UI tests use React Testing Library and JSDOM. They verify DOM behavior; they do not establish actual browser layout, mobile rendering, or live MongoDB correctness.

A read-only cloud browser check loaded the deployed homepage successfully. Its existing carousel still showed the original two testimonials. This confirms public site accessibility in that browser, not deployment of the new moderation code.

The workspace has no configured `MONGODB_URI`, `MONGODB_DB`, `ADMIN_USERNAME`, or `ADMIN_PASSWORD`. Live persistence, index/explain verification, deployed admin route/authentication and production moderation remain blocked on those settings and deployment. Configure secrets in the deployment environment rather than sharing them in chat.

No production deployment, production database mutation, or complete live browser QA is claimed.

## Apply the deliverable

The complete patch targets repository base commit `d8443d92f55d338503c9257af50c1e62bdcd566b`. It includes the initial implementation and continued QA fixes. Apply it once on a clean checkout of that base:

```sh
git apply --check /path/to/generays-testimonials.patch
git apply /path/to/generays-testimonials.patch
npm ci
npm test
npm run typecheck
npm run lint
npm run build
```

If the initial patch is already applied, use the updated source files from the ZIP or compare the diff; do not reapply the complete patch over it. The ZIP contains changed source files at repository-relative paths and this guide, not a complete replacement repository.


## Customer submission form

`src/components/TestimonialSubmissionForm.tsx` is mounted inside the existing homepage Testimonials section. Customers provide a name, designation/company and quote. The form sends JSON to `POST /api/testimonials`; the server validates the same length limits as the admin flow and always stores pending status. It never accepts approval from a customer. The existing admin pending list receives these submissions.

The public POST accepts JSON only and rejects foreign browser origins. No admin credentials are required or exposed. Success clears the form and explains moderation; errors retain entered text. The public display remains approved-only.

Continued local QA: 14 tests pass, including customer submission, injected approved status, invalid fields, forbidden public mutations, success reset and failure retention. This addition is provided on the `feat/customer-testimonial-submission` branch; production deployment and live submission QA are separate steps. Public submission is not yet tested against production MongoDB. There is no CAPTCHA or distributed rate limiter in this implementation.
