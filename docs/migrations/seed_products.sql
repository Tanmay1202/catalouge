-- ==============================================================================
-- seed_products.sql
-- Seed initial sample catalogue items for Ziba by Nidhi (Enquiry-only catalogue)
-- ==============================================================================

INSERT INTO public.products (product_code, name, category, description, colors, images, is_active, is_featured)
VALUES
(
  'ZB-NK-01',
  'Floral Kundan & Pearl Choker Set',
  'Necklaces',
  'Handcrafted floral motif choker with faux pearls and sparkling artificial stones. Comes with matching earrings.',
  ARRAY['Gold Tone', 'Silver Tone'],
  ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'ZB-ER-02',
  'Teardrop Crystal Chandbali Earrings',
  'Earrings',
  'Delicate artificial crystal chandbali earrings featuring tiered drops and lightweight festive finish.',
  ARRAY['Gold Tone', 'Rose Gold Tone'],
  ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'ZB-RG-03',
  'Solitaire Bloom Adjustable Ring',
  'Rings',
  'Minimal everyday artificial stone ring with an adjustable band for easy, comfortable wear.',
  ARRAY['Gold Tone', 'Silver Tone'],
  ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'ZB-BR-04',
  'Faux Pearl Charm Link Bracelet',
  'Bracelets',
  'Chic artificial pearl charm bracelet on an adjustable metallic link chain. Perfect for daily styling.',
  ARRAY['Gold Tone', 'Silver Tone'],
  ARRAY['https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'ZB-BN-05',
  'Classic Studded Kada Bangles (Set of 2)',
  'Bangles',
  'Set of two artificial stone-studded openable kada bangles with smooth inner lining for everyday luxury look.',
  ARRAY['Gold Tone', 'Antique Finish'],
  ARRAY['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'],
  true,
  true
),
(
  'ZB-NK-06',
  'Delicate Layered Pendant Chain',
  'Necklaces',
  'Modern double-layer artificial chain necklace featuring dainty geometric charms.',
  ARRAY['Gold Tone', 'Rose Gold Tone'],
  ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'],
  true,
  false
),
(
  'ZB-ER-07',
  'Oxidised Silver-Tone Floral Studs',
  'Earrings',
  'Handcrafted bohemian style oxidised studs for everyday ethnic wear.',
  ARRAY['Oxidised'],
  ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'],
  true,
  false
),
(
  'ZB-RG-08',
  'Stacked Pavé Band Set',
  'Rings',
  'Set of three artificial stone-studded stackable bands in polished finish.',
  ARRAY['Gold Tone', 'Silver Tone'],
  ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'],
  true,
  false
);
