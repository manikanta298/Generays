# GeneRays — React + Vite

This project is migrated from Next.js App Router to React + Vite + React Router.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run typecheck
npm run build
npm run preview
```

## Routing

React Router handles:

- `/`
- `/about`
- `/process`
- `/services`
- `/services/:slug`
- `/contact`

Vercel uses `vercel.json` to serve `index.html` for browser-side routes while leaving `/api/*` serverless functions available.

## Razorpay

The browser uses `/api/razorpay/order` and `/api/razorpay/verify`.

Server-only environment variables:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Public configuration:

```env
VITE_SITE_URL=
```

Never expose `RAZORPAY_KEY_SECRET` with a `VITE_` prefix.
