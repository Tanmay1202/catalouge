// src/lib/mock-data.ts
// Handcrafted artificial jewellery catalogue items for Ziba by Nidhi
// TODO(client): Replace placeholder items and Unsplash photos with real product inventory and photos.

import { Product } from '../types/product';

export const INITIAL_MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    product_code: 'ZB-NK-01',
    name: 'Floral Kundan & Pearl Choker Set',
    category: 'Necklaces',
    description: 'Handcrafted floral motif choker with faux pearls and sparkling artificial stones. Comes with matching earrings.',
    colors: ['Gold Tone', 'Silver Tone'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: 'prod-002',
    product_code: 'ZB-ER-02',
    name: 'Teardrop Crystal Chandbali Earrings',
    category: 'Earrings',
    description: 'Delicate artificial crystal chandbali earrings featuring tiered drops and lightweight festive finish.',
    colors: ['Gold Tone', 'Rose Gold Tone'],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'prod-003',
    product_code: 'ZB-RG-03',
    name: 'Solitaire Bloom Adjustable Ring',
    category: 'Rings',
    description: 'Minimal everyday artificial stone ring with an adjustable band for easy, comfortable wear.',
    colors: ['Gold Tone', 'Silver Tone', 'Rose Gold Tone'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'prod-004',
    product_code: 'ZB-BR-04',
    name: 'Faux Pearl Charm Link Bracelet',
    category: 'Bracelets',
    description: 'Chic artificial pearl charm bracelet on an adjustable metallic link chain. Perfect for daily styling.',
    colors: ['Gold Tone', 'Silver Tone'],
    images: [
      'https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'prod-005',
    product_code: 'ZB-BN-05',
    name: 'Classic Studded Kada Bangles (Set of 2)',
    category: 'Bangles',
    description: 'Set of two artificial stone-studded openable kada bangles with smooth inner lining for everyday luxury look.',
    colors: ['Gold Tone', 'Antique Finish'],
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'prod-006',
    product_code: 'ZB-NK-06',
    name: 'Delicate Layered Pendant Chain',
    category: 'Necklaces',
    description: 'Modern double-layer artificial chain necklace featuring dainty geometric charms.',
    colors: ['Gold Tone', 'Rose Gold Tone'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: false,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'prod-007',
    product_code: 'ZB-ER-07',
    name: 'Oxidised Silver-Tone Floral Studs',
    category: 'Earrings',
    description: 'Handcrafted bohemian style oxidised studs for everyday ethnic wear.',
    colors: ['Oxidised'],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-008',
    product_code: 'ZB-RG-08',
    name: 'Stacked Pavé Band Set',
    category: 'Rings',
    description: 'Set of three artificial stone-studded stackable bands in polished finish.',
    colors: ['Gold Tone', 'Silver Tone'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    in_stock: true,
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
  }
];
