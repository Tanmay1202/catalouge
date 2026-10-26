# AGENTS.md — Ziba by Nidhi Catalogue

## Project Overview
Mobile-first catalogue website for **Ziba by Nidhi** (@ziba_by_nidhi_jewellery) — a handcrafted artificial/fashion jewellery brand. Provides straightforward product browsing with instant WhatsApp enquiry, and a minimal protected admin dashboard.

## Stack
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Routing: React Router v6
- Icons: Lucide React
- Backend: Supabase (PostgreSQL + Auth + Storage) — with local mock fallback
- Deployment: Vercel (frontend) + Supabase (backend services)

## Architecture Rules
- All brand configuration lives in `src/config/brand.ts`
- All data access goes through `src/lib/` functions — no direct Supabase calls scattered in components
- All authorization enforced server-side via Supabase RLS — frontend guards are UX only
- Only the anon key is used in browser code — never the service role key
- Product images stored in Supabase Storage bucket `product-images`

## Brand Positioning Rules
- **Category:** Handcrafted artificial jewellery / fashion jewellery.
- **DO NOT USE:** "Fine jewellery", "bespoke", "luxury", "solid gold", "sterling silver", "anti-tarnish", or "waterproof" (unless explicitly verified with the client).
- **Price Format:** Indian Rupee formatting (`₹1,299`).

## Design Tokens
- Background: `#FAFAFA` (page), `#FFFFFF` (card)
- Text: near-black `#18181B`, muted gray `#71717A`
- Accent: muted blush/rose `#D46A7E`
- Borders: `#E4E4E7`
- Font: Single sans-serif (`Inter`) for all text and logo

## Verification After Changes
Always run: `npx tsc -b && npm run build`
