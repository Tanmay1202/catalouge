# AGENTS.md — AURELLE Jewellery Catalogue

## Project Overview
Production jewellery catalogue website for AURELLE artificial jewellery. Public product browsing with WhatsApp enquiry, and a minimal, protected admin dashboard for product management.

## Stack
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Routing: React Router v6
- Icons: Lucide React
- Backend: Supabase (PostgreSQL + Auth + Storage) — no separate API server
- Deployment: Vercel (frontend) + Supabase (backend services)

## Architecture Rules
- All data access goes through `src/lib/` functions — no direct Supabase calls scattered in components
- All authorization enforced server-side via Supabase RLS — frontend guards are UX only
- Only the anon key is used in browser code — never the service role key
- Product images stored in Supabase Storage bucket `product-images`
- Image paths stored in the `images` TEXT[] column, not as separate table rows

## Security Rules — DO NOT VIOLATE
1. Never disable Row Level Security on any table
2. Never use permissive RLS policies to work around bugs
3. Never expose the Supabase service role key in frontend code
4. Never assume authenticated === admin — always check `app_metadata.role === 'admin'`
5. Always validate file types and sizes before upload

## Data Model
- Single `products` table with UUID pk, unique `product_code`, TEXT[] for colors and images
- Categories: CHECK constraint, not a separate table (for now)
- Admin role: stored in Supabase Auth `app_metadata`

## Key Directories
- `src/config/` — Supabase client, brand constants, colour options
- `src/types/` — TypeScript type definitions
- `src/lib/` — Data access functions (products, storage, auth)
- `src/hooks/` — React hooks for data fetching and state
- `src/components/ui/` — Generic reusable UI primitives
- `src/components/layout/` — Header, Footer, AdminLayout
- `src/components/product/` — Public product display components
- `src/components/admin/` — Admin-specific components
- `src/pages/` — Page components (public/ and admin/)

## Categories (fixed for MVP)
Necklaces, Earrings, Bracelets, Rings, Bangles

## Design Tokens
- Background: cream `#FFFBF5`, ivory `#F5F0E8`
- Text: brand-dark `#2C2418`, warm-gray `#8A7D6B`
- Accent: brand-brown `#5C4A32`, brand-gold `#C9A96E`
- Borders: brand-border `#E8E0D4`
- Fonts: Playfair Display (serif headlines), Inter (sans body)

## Verification After Changes
Always run: `npm run build` and `npx tsc -b`
