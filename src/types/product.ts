// src/types/product.ts
import { Category } from '../config/brand';

export type { Category };

export interface Product {
  id: string;
  name: string;
  category: Category;
  price?: number;
  original_price?: number;
  images: string[];
  description: string;
  colors?: string[];
  video_links?: string[];
  product_code?: string;
  in_stock?: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ProductFormData {
  name: string;
  category: Category;
  description: string;
  colors?: string[];
  video_links?: string[];
  product_code?: string;
  images?: string[];
  in_stock?: boolean;
  is_active: boolean;
  is_featured: boolean;
}

export interface ProductFilterParams {
  category?: string;
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  sort?: 'newest' | 'name-asc' | 'name-desc';
}
