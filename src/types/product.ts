export type Category = 'Necklaces' | 'Earrings' | 'Bracelets' | 'Rings' | 'Bangles';

export interface Product {
  id: string;
  product_code: string;
  name: string;
  category: Category;
  description: string;
  colors: string[];
  images: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  product_code: string;
  name: string;
  category: Category;
  description: string;
  colors: string[];
  images?: string[];
  is_active: boolean;
  is_featured: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ProductFilterParams {
  category?: string;
  search?: string;
  status?: 'all' | 'active' | 'inactive';
}
