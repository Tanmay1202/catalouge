# Vercel Deployment Guide for AURELLE Catalogue

This project is pre-configured and optimized for deployment on [Vercel](https://vercel.com).

---

## 1. Prerequisites Checklist

- A [Vercel account](https://vercel.com/signup).
- A [GitHub account](https://github.com) (or GitLab / Bitbucket).
- (Optional, if using live data) Your Supabase project URL and public `anon` key from `docs/supabase-setup.md`.

---

## 2. Deploying via Vercel Dashboard (Recommended)

### Step 2.1: Push Repository to GitHub

Create a new repository on GitHub (e.g. `aurelle-catalogue`), then in your local terminal:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/aurelle-catalogue.git
git branch -M main
git push -u origin main
```

### Step 2.2: Import Project in Vercel

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Select your GitHub account and click **Import** next to `aurelle-catalogue`.
4. Vercel will automatically detect the **Vite** framework preset:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (or `tsc -b && vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 2.3: Add Environment Variables

In the **Environment Variables** section on Vercel, add:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://xyz.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase public anon key |
| `VITE_WHATSAPP_NUMBER` | `919876543210` | Business WhatsApp number (country code + number without `+`) |

*(Note: If you leave these blank on initial deploy, the app will safely run in demo mock mode so the storefront is immediately browsable without errors).*

### Step 2.4: Click Deploy

Click **Deploy**. In under 1 minute, your site will be live at `https://aurelle-catalogue.vercel.app`.

---

## 3. Deploying via Vercel CLI (Alternative)

If you prefer deploying directly from your terminal:

```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy preview
npx vercel

# 3. Deploy to production
npx vercel --prod
```

When prompted:
- Set up and deploy: **Y**
- Link to existing project: **N** (or select if created)
- Project name: `aurelle-catalogue`
- Directory located: `./`

---

## 4. Post-Deployment Supabase Configuration

If using Supabase Authentication for admin access:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication** → **URL Configuration**.
3. In **Site URL**, enter your production domain (e.g., `https://aurelle-catalogue.vercel.app`).
4. In **Redirect URLs**, add:
   - `https://aurelle-catalogue.vercel.app/**`
   - `http://localhost:5173/**` (for local development)
   - `https://*.vercel.app/**` (for preview deployments)
5. Click **Save**.

---

## 5. Custom Domain Setup (Optional)

1. In Vercel Project Settings → **Domains**.
2. Enter your custom domain (e.g., `catalogue.aurelle.com` or `aurellejewels.com`).
3. Follow Vercel's DNS instructions to add the CNAME or A record in your DNS registrar (GoDaddy, Namecheap, Cloudflare, etc.).
4. Add your custom domain to Supabase Auth **Redirect URLs**.

---

## 6. Pre-Configured Optimizations in this Repository

- **[`vercel.json`](file:///D:/catalouge/vercel.json)**:
  - Configures client-side SPA routing rewrites (`/(.*)` → `/index.html`) so direct navigation to `/products/AU-NK-012` or `/admin/login` works without 404s.
  - Implements immutable 1-year asset caching for hashed JS/CSS bundles.
  - Adds recommended HTTP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, etc.).
- **Vite Chunk Splitting ([`vite.config.ts`](file:///D:/catalouge/vite.config.ts))**:
  - Automatically isolates `vendor`, `supabase`, and `icons` chunks to prevent large bundle warnings and ensure fast initial page loads.
