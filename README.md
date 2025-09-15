# Marketplace App (Next.js + Prisma)

A full‑stack e‑commerce app built with Next.js App Router, Prisma (PostgreSQL), NextAuth, and Stripe. It includes a public catalog, cart, checkout with payments, user area, and an admin panel for products, categories, users, and orders.

## Tech Stack
- Next.js 15 (App Router, Edge middleware)
- React 19, TypeScript
- Prisma ORM + PostgreSQL
- NextAuth (Credentials, Google, Apple)
- Stripe payments
- Tailwind CSS (v4) + Radix UI + Shadcn-inspired components
- UploadThing for images

## Monorepo layout
- `app/`: routes (public, auth, profile, admin, api)
- `components/`: UI and custom components
- `lib/`: shared libraries (`auth`, `prisma`, `utils`)
- `prisma/`: Prisma schema, migrations, seed
- `public/`: static assets
- `src/utils/`: UploadThing client utils

## Getting Started
1) Install
```bash
npm install
```

2) Environment variables: create `.env` with
```bash
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-strong-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

3) Generate and migrate DB
```bash
npx prisma generate
npx prisma migrate deploy
# Optionally seed
npm run prisma:seed  # see "Seeding" below
```

4) Run dev server
```bash
npm run dev
```
Open http://localhost:3000

## Scripts
- `dev`: start Next dev
- `build`: Next build
- `start`: Next start
- `lint`: Next lint
- `postinstall`: prisma generate
- `prisma:seed`: run `prisma/seed.ts` via tsx (configured in package.json `prisma.seed`)

## Data Model (Prisma)
Main models:
- `User` (role, email/password or OAuth, isBlocked, sessions)
- `Category` (name, imageUrl)
- `Product` (name, description, imageUrl, stock, categoryId, variants)
- `ProductVariant` (price, stock, color, size, imageUrl, productId)
- `CartItem` (userId, productId, variantId?, quantity)
- `Order` (userId, status, totalPrice, items[], address?)
- `OrderItem` (orderId, variantId, quantity, price)
- `OrderAddress` (shipping and contact fields)
- `Session` (NextAuth sessions)

See `prisma/schema.prisma` for full definitions.

## Authentication & Authorization
- NextAuth configured in `app/api/auth/[...nextauth]/route.ts`.
- Providers: Credentials, Google, Apple.
- Sessions use JWT strategy. JWT includes user `id`, `role`, and `isBlocked` snapshot.
- Middleware in `middleware.ts` protects routes and enforces roles:
  - Protected paths: `/admin`, `/profile`, `/checkout`, `/orders`, `/basket` require auth.
  - Admin check: `token.role === "ADMIN"` for `/admin/*`.
  - Blocked users are redirected to `/blocked` (checked via `/api/internal/is-blocked`).

Type augmentation: `app/types/next-auth.d.ts` adds `id`, `role`, and `isBlocked` to `session.user`.

## Payments (Stripe)
- Backend: `app/api/create-payment-intent/route.ts` creates PaymentIntents.
- Frontend: `components/custom/OrderGoods.tsx` and `SubTotalAside.tsx` load Stripe, get `clientSecret`, and call `stripe.confirmPayment` with a return URL to `/checkout/success?orderId=...`.

## Features and Flows
- Catalog
  - `GET /api/products` returns products with variants and a computed minimal price.
  - `GET /api/products/by-category/[id]` filters by category.
  - `GET /api/products/search` searches products.
  - Product page at `app/product/[id]` shows variants via `GET /api/variants?productId=...`.

- Cart
  - API under `app/api/cart/*` manages add/update/delete.
  - UI: `app/cart/page.tsx` computes subtotal, shipping rules, and starts checkout.

- Checkout
  - `POST /api/order/init` validates items, freezes prices from variants, creates `Order` and `OrderItem`s, and returns `orderId`.
  - `POST /api/order/address` saves shipping/contact address for the order.
  - Stripe intent is created on the client via `/api/create-payment-intent`, then user confirms payment and is redirected to success page.

- Orders
  - User orders page under `app/profile/orders`.

- Admin Panel (`/admin`)
  - Guards via middleware and server checks (`assertAdmin()` with `getServerSession`).
  - Endpoints:
    - `POST /api/admin/products` create product with variants.
    - `GET /api/admin/products` list products with variants.
    - `GET/PUT/DELETE /api/admin/products/[id]` fetch/update/delete product and variants.
    - `POST /api/admin/add-categories` create categories.
    - `GET /api/admin/users` list users; `GET /api/admin/orders` list orders.
  - Pages:
    - `app/admin/add-product` product creation UI (variants: color, size, price, stock, imageUrl).
    - `app/admin/products/[id]` edit product.
    - `app/admin/categories`, `app/admin/users`, `app/admin/orders` overviews.

## API Overview (selected)
Public:
- `GET /api/products` – list products with variants and min price
- `GET /api/products/by-category/[id]` – list by category
- `GET /api/products/search?q=` – search
- `GET /api/categories/all` – categories
- `GET /api/variants?productId=` – variants of a product

Auth:
- `POST /api/auth/[...nextauth]` – NextAuth routes

Cart:
- `POST /api/cart/addCartProd` – add item
- `POST /api/cart/updateQuantity` – change qty
- `DELETE /api/cart/deleteCartProd/[id]` – remove item
- `GET /api/cart` – current cart items

Orders:
- `POST /api/order/init` – create order from cart items
- `POST /api/order/address` – save shipping/contact address
- `GET /api/order/getOrders` – user orders

Payments:
- `POST /api/create-payment-intent` – create Stripe PaymentIntent

Admin:
- `GET /api/admin/products` / `POST /api/admin/products`
- `GET/PUT/DELETE /api/admin/products/[id]`
- `POST /api/admin/add-categories`
- `GET /api/admin/users`
- `GET /api/admin/orders`

Internal:
- `GET /api/internal/is-blocked?id=` – check if user is blocked

## File Highlights
- `middleware.ts`: auth guard, admin check, blocked redirect
- `lib/auth.ts`: NextAuth server options for `getServerSession`
- `lib/prisma.ts`: Prisma client singleton
- `components/custom/SessionProvider.tsx`: wraps app with NextAuth provider
- `components/ui/*`: design system components

## Seeding
`package.json` sets `"prisma.seed": "tsx prisma/seed.ts"`. Create or edit `prisma/seed.ts`, then run:
```bash
npx prisma db seed
```

## Environment & Security Notes
- Use a strong `NEXTAUTH_SECRET`.
- Set OAuth credentials for Google/Apple or remove providers.
- Set Stripe keys for payments; use test keys in dev.
- Never commit `.env`.

## Deployment
- Run database migrations during deploy: `prisma migrate deploy`.
- Set all env vars in your hosting platform.
- `next start` serves the built app.

## Troubleshooting
- Auth redirects to `/login` for protected pages: ensure cookies and `NEXTAUTH_URL/SECRET` are set.
- Blocked user loop: check `/api/internal/is-blocked` and JWT callback that refreshes `isBlocked`.
- Missing variants or prices: ensure `ProductVariant` rows exist and admin create flow sends `variants` array.
- Stripe "Payment method not available": verify `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` and that `Elements` is mounted.
