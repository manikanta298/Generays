# GeneRays — Next.js App Router

Production-oriented migration of the GeneRays TanStack Start frontend to Next.js App Router.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- `next/image`
- `next/font/google`
- OGL / WebGL CircularGallery
- Razorpay Node SDK
- Zod

## Structure

```text
src/
├── app/
│   ├── api/razorpay/order/route.ts
│   ├── api/razorpay/verify/route.ts
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── process/page.tsx
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── content/
├── services/
├── assets/
└── styles.css
```

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production verification

```bash
npm run typecheck
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`.

`RAZORPAY_KEY_SECRET` is server-only and must never be prefixed with `NEXT_PUBLIC_`.

## Razorpay

The checkout component creates an order through:

`POST /api/razorpay/order`

and verifies the returned payment signature through:

`POST /api/razorpay/verify`

The implementation does not persist orders or leads yet. Database/Supabase integration is intentionally left behind service boundaries for a later phase.
