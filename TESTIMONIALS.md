# Customer testimonials and master admin

## Routes

| Route | Purpose |
| --- | --- |
| `/submit-testimonial` | Separate public customer submission form |
| `/admin` | Master admin login and testimonial dashboard |
| `/admin/testimonials` | Alias for the same protected dashboard |
| `/#testimonials` | Homepage strip containing approved testimonials only |

The header and homepage section link to the separate submission page. The submission form is not embedded in the homepage.

## Configuration

Configure these server-only Vercel variables for the target environment, then redeploy:

- `MONGODB_URI`: MongoDB connection string.
- `MONGODB_DB`: explicit database name, for example `generays`.
- `ADMIN_USERNAME`: master admin username.
- `ADMIN_PASSWORD`: a long, unique master admin password.

Never prefix these with `VITE_`. The optional browser variable `VITE_SITE_URL` can be set to `https://generays.vercel.app`. For local full-stack testing, use `vercel dev` and set `APP_ORIGIN` to its exact local origin, such as `http://localhost:3000`. Vite alone does not serve Vercel API functions.

No additional session secret is required. The configured admin password signs eight-hour session cookies. Login credentials are checked on the server. Cookies are HTTP-only, SameSite Strict, scoped to `/api/admin`, and Secure on Vercel/production. The browser stores no credentials in localStorage. Logout clears its session cookie; existing signed tokens expire within eight hours. Changing either configured admin credential invalidates existing tokens after redeployment. The admin APIs enforce authentication independently of the UI. Basic authentication remains supported for programmatic API clients; the dashboard uses session cookies and no browser Basic-auth prompt.

## Behavior

1. A customer enters their name, designation/company and quote at `/submit-testimonial`.
2. `POST /api/testimonials` validates the input and saves it in MongoDB with `status: "pending"`. A customer-supplied status or ID cannot grant approval.
3. An admin signs in at `/admin` using the configured credentials, reviews Pending entries, and approves, edits or deletes them. Deletion requires confirmation in the UI.
4. The homepage fetches only approved records. Its horizontal testimonial strip scrolls automatically, pauses on hover/focus, has pause/resume and manual scroll controls, and respects reduced-motion preferences.
5. Editing an approved testimonial returns it to pending until reapproved. Deleting removes it. Open homepage tabs refresh on focus and every 30 seconds; offline tabs cannot be remotely cleared.

Public fields: name up to 120 characters, designation up to 200, quote up to 2000. Fields must be nonempty after trimming. Text renders literally; HTML is not executed. The customer form retains content on failure and clears it only after successful submission.

Existing hardcoded quotes are not automatically seeded or approved. Existing MongoDB records must have an explicit approved status to appear. The latest 50 approved records are displayed; the admin lists support 50 records per page.

## API

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/testimonials` | Approved-only public feed; caller cannot select pending |
| POST | `/api/testimonials` | Public JSON `{name, designation, quote}`, always pending |
| GET | `/api/admin/session` | Checks the HTTP-only session |
| POST | `/api/admin/session` | JSON `{username, password}`, issues session cookie |
| DELETE | `/api/admin/session` | Clears session cookie |
| GET | `/api/admin/testimonials?status=pending&page=1` | Pending moderation list |
| GET | `/api/admin/testimonials?status=approved&page=1` | Approved moderation list |
| POST | `/api/admin/testimonials` | Creates pending record |
| PATCH | `/api/admin/testimonials?id=<ObjectId>` | `{status:"approved"}` approves; content fields edit and reset pending |
| DELETE | `/api/admin/testimonials?id=<ObjectId>` | Deletes record |

API responses are non-cacheable. Mutations reject foreign browser origins. Public POST and login require JSON. Public endpoints reject update/delete methods. The public feed projects only ID, name, designation and quote; admin metadata stays in admin responses.

Create this index once in the selected MongoDB database:

```js
db.testimonials.createIndex({ status: 1, createdAt: -1, _id: -1 });
```

Document shape:

```js
{
  name: 'Client name',
  designation: 'Founder, Company',
  quote: 'Client feedback',
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date()
}
```

## Source structure

- `server/testimonials.ts`: database access, validation, public/admin handlers.
- `server/admin-session.ts`: session signing and verification.
- `api/testimonials.ts`, `api/admin/testimonials.ts`, `api/admin/session.ts`: Vercel endpoints.
- `src/pages/SubmitTestimonial.tsx`: separate submission page.
- `src/components/TestimonialSubmissionForm.tsx`: validated form and feedback states.
- `src/pages/Admin.tsx`: login/session/logout gate.
- `src/pages/AdminTestimonials.tsx`: approve, edit, delete and pagination.
- `src/components/home/TestimonialsSection.tsx`: homepage-only public data loading.
- `src/components/ScrollingTestimonials.tsx`: horizontal accessible scrolling strip.
- `tests/`: API, session and React DOM regression tests.

## Verification

Run `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

Local tests use an injected MongoDB collection double and JSDOM. They cover submission-to-pending, attempted public approval, validation, pending/approved isolation, moderation lifecycle, admin authentication, login/logout cookies, tampering/expiration checks, credential rotation, foreign origins, form success/error handling, login gating, separate form placement, scrolling controls, and stale response races. They do not prove live MongoDB writes or actual browser layout.

Production acceptance still requires deployment of this branch, then:

1. Submit a uniquely identifiable test entry at `/submit-testimonial`.
2. Confirm it is absent from the public feed and present in the admin Pending list.
3. Log in at `/admin`, approve it and check homepage appearance after refresh.
4. Edit it; confirm it returns to pending and disappears from public results. Reapprove if desired.
5. Delete the test record using the dashboard and confirm removal after refresh.
6. Check logout, wrong credentials, session expiry and keyboard/mobile/reduced-motion behavior.
7. Verify MongoDB persistence and index usage in the configured database.

Public database reads were previously verified against production. No production customer submissions or admin writes have been made by this implementation workflow. Production credentials were not read or exposed. There is no CAPTCHA or distributed request rate limiter in this code; configure appropriate platform controls for the deployment.
