-- ==============================================================================
-- 001_create_products.sql
-- Products table schema with constraints, indexes, and auto-updating timestamp
-- ==============================================================================

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code    TEXT NOT NULL,
  name            TEXT NOT NULL,
  category        TEXT NOT NULL,
  price           NUMERIC DEFAULT NULL,
  original_price  NUMERIC DEFAULT NULL,
  description     TEXT NOT NULL DEFAULT '',
  colors          TEXT[] NOT NULL DEFAULT '{}',
  images          TEXT[] NOT NULL DEFAULT '{}',
  in_stock        BOOLEAN NOT NULL DEFAULT true,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enforce unique business product code
ALTER TABLE public.products 
  DROP CONSTRAINT IF EXISTS uq_products_product_code;

ALTER TABLE public.products 
  ADD CONSTRAINT uq_products_product_code UNIQUE (product_code);

-- Drop category constraint if present (allows custom categories from admin panel)
ALTER TABLE public.products 
  DROP CONSTRAINT IF EXISTS chk_products_category;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products (is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_product_code ON public.products (product_code);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
