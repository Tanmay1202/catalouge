-- ==============================================================================
-- 002_rls_policies.sql
-- Row Level Security policies for products table
-- ==============================================================================

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current requester is an administrator
-- Administrator role is securely stored in auth.users.app_metadata (server-only)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Admin can view all products" ON public.products;
DROP POLICY IF EXISTS "Admin can insert products" ON public.products;
DROP POLICY IF EXISTS "Admin can update products" ON public.products;
DROP POLICY IF EXISTS "Admin can delete products" ON public.products;

-- 1. Public (anon + authenticated) can view active products
CREATE POLICY "Public can view active products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- 2. Admin can view ALL products (including inactive drafts)
CREATE POLICY "Admin can view all products"
  ON public.products FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. Admin can insert products
CREATE POLICY "Admin can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- 4. Admin can update products
CREATE POLICY "Admin can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Admin can delete products
CREATE POLICY "Admin can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.is_admin());
