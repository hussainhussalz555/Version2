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

## Local development

```bash
cd Version2
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run lint
```
