# BATHAE — Next.js storefront

## Deploying to Vercel

1. Import this repository in Vercel.
2. Set **Root Directory** to `Version2` (the Next.js app lives in the `Version2/` folder, not at the repository root).
3. Leave the Framework Preset as **Next.js**; build/install commands are already pinned in `vercel.json`
   (`npm install` → `npm run build`).
4. Deploy. The build succeeds **without** any environment variables.

### Optional: database

The site itself is fully static and needs no database. `DATABASE_URL` is only used by `GET /api/health`
(and any future database-backed route).

- Add `DATABASE_URL` in **Project → Settings → Environment Variables** and redeploy.
- Copy `.env.example` to `.env` for local development.
- When it is unset, `/api/health` returns `503` with `{"ok":false,"configured":false}` instead of
  crashing the build or the page.

> Note: the connection is created lazily on the first query. Never read `process.env.DATABASE_URL`
> and throw at module scope — `next build` imports every route, so that pattern fails the deployment
> when the variable is missing.

### Drizzle

```bash
npx drizzle-kit generate   # create migrations from src/db/schema.ts
npx drizzle-kit push       # push schema directly (uses DATABASE_URL)
```

## Store images

The image upload locations are included in the repository so the folders are easy to find on GitHub:

- `Version2/public/logo.png` — BATHAE logo
- `Version2/public/products/product1.png` — Matte Black product
- `Version2/public/products/product2.png` — Brushed Gold product
- `Version2/public/products/product3.png` — Polished Chrome product

See `public/README.md` and `public/products/README.md` for image recommendations. Until you add the PNGs, the storefront uses designed text/photography fallbacks rather than broken image icons.

### Add the images and upload them to GitHub

From the repository root, copy your files into these exact paths (adjust the source paths to where your files are saved):

```bash
mkdir -p Version2/public/products
cp /path/to/logo.png Version2/public/logo.png
cp /path/to/product1.png Version2/public/products/product1.png
cp /path/to/product2.png Version2/public/products/product2.png
cp /path/to/product3.png Version2/public/products/product3.png
git add Version2/public/logo.png Version2/public/products/*.png
git commit -m "Add storefront product photography and logo"
git push origin arena/01a0cf5d-version2
```

To upload through GitHub's website instead, open the repository and use **Add file → Upload files**. Upload `logo.png` in `Version2/public/` and the product PNGs in `Version2/public/products/`; use the existing README files to navigate to those folders. Commit the upload to `arena/01a0cf5d-version2` (the working branch for this project), not directly to `main`. Image files are part of the source tree and will be included automatically in the next Vercel deployment.

Before publishing, replace the sample email, phone number, WhatsApp number, social profile URLs, stock/prices, and policy copy in `src/lib/config.ts` and `src/lib/products.ts` with verified business information. Do not publish placeholder contact details or unverified warranty/material claims.

## Local development

```bash
cd Version2
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run lint
```
