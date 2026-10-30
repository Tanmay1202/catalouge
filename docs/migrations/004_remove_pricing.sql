-- ==============================================================================
-- 004_remove_pricing.sql
-- 1. Removes price constraints on public.products (enquiry-only catalogue)
-- 2. Removes category check constraint to allow custom categories created in admin
-- ==============================================================================

-- Make price and original_price columns optional / nullable
ALTER TABLE public.products ALTER COLUMN price DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN price DROP DEFAULT;

-- Remove hardcoded 5-category constraint so admin can create custom categories
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS chk_products_category;
