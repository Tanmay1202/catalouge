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

## Design Tokens (Matching Logo Palette)
- Background: `#FAF6F2` (soft warm ivory page), `#FFFFFF` (card)
- Text: deep warm espresso `#2B1A15`, warm taupe `#7D6B63`
- Accent: warm copper/rose-gold `#C47A53`, peach watercolor tint `#F7ECE4`
- Borders: `#EBDCD2` (soft copper-sand)
- Font: Sans-serif (`Inter`) for body/UI text; stylized serif (`Playfair Display`) for the brand wordmark alongside the logo

## Verification After Changes
Always run: `npx tsc -b && npm run build`
