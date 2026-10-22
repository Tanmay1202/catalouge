import { Product } from '../types/product';

export const INITIAL_MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    product_code: 'AU-NK-012',
    name: 'Floral Grace Necklace',
    category: 'Necklaces',
    description: 'Elegant floral necklace with stone detailing. Perfect for festive occasions and everyday wear.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'prod-002',
    product_code: 'AU-RG-021',
    name: 'Solitaire Bloom Ring',
    category: 'Rings',
    description: 'A sparkling solitaire stone nestled in a delicate prong setting with micro-pavé accents.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'prod-003',
    product_code: 'AU-BR-008',
    name: 'Pearl Charm Bracelet',
    category: 'Bracelets',
    description: 'Delicate chain bracelet adorned with lustrous simulated pearls and zircon crystal charms.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    images: [
      'https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'prod-004',
    product_code: 'AU-BN-014',
    name: 'Classic Stone Bangles',
    category: 'Bangles',
    description: 'Stacked contemporary bangles studded with brilliant cut crystals for everyday luxury.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'prod-005',
    product_code: 'AU-ER-003',
    name: 'Teardrop Crystal Earrings',
    category: 'Earrings',
    description: 'Timeless drop earrings featuring cascading floral crystals with a polished metallic finish.',
    colors: ['Gold', 'Silver'],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: false,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'prod-006',
    product_code: 'AU-NK-005',
    name: 'Aurelle Heritage Choker',
    category: 'Necklaces',
    description: 'Regal choker necklace featuring traditional motifs with refined modern craftsmanship.',
    colors: ['Gold', 'Antique'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];
