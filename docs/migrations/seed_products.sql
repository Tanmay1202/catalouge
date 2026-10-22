-- ==============================================================================
-- seed_products.sql
-- Seed initial sample catalogue items matching the AURELLE UI reference mockup
-- ==============================================================================

INSERT INTO public.products (product_code, name, category, description, colors, images, is_active, is_featured)
VALUES
(
  'AU-NK-012',
  'Floral Grace Necklace',
  'Necklaces',
  'Elegant floral necklace with stone detailing. Perfect for festive occasions and everyday wear.',
  ARRAY['Gold', 'Silver', 'Rose Gold'],
  ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'AU-RG-021',
  'Solitaire Bloom Ring',
  'Rings',
  'A sparkling solitaire stone nestled in a delicate prong setting with micro-pavé accents.',
  ARRAY['Gold', 'Silver', 'Rose Gold'],
  ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'AU-BR-008',
  'Pearl Charm Bracelet',
  'Bracelets',
  'Delicate chain bracelet adorned with lustrous simulated pearls and zircon crystal charms.',
  ARRAY['Gold', 'Silver', 'Rose Gold'],
  ARRAY['https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'AU-BN-014',
  'Classic Stone Bangles',
  'Bangles',
  'Stacked contemporary bangles studded with brilliant cut crystals for everyday luxury.',
  ARRAY['Gold', 'Silver', 'Rose Gold'],
  ARRAY['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'AU-ER-003',
  'Teardrop Crystal Earrings',
  'Earrings',
  'Timeless drop earrings featuring cascading floral crystals with a polished metallic finish.',
  ARRAY['Gold', 'Silver'],
  ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'],
  true,
  false
),
(
  'AU-NK-005',
  'Aurelle Heritage Choker',
  'Necklaces',
  'Regal choker necklace featuring traditional motifs with refined modern craftsmanship.',
  ARRAY['Gold', 'Antique'],
  ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'],
  true,
  false
)
ON CONFLICT (product_code) DO NOTHING;
