import { Product, ProductFormData, ProductFilterParams } from '../types/product';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { INITIAL_MOCK_PRODUCTS } from './mock-data';

// Local storage key for in-memory / dev fallback persistence
const MOCK_STORAGE_KEY = 'aurelle_mock_products_v1';

function getLocalMockProducts(): Product[] {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read mock products from storage:', err);
  }
  return [...INITIAL_MOCK_PRODUCTS];
}

function saveLocalMockProducts(products: Product[]): void {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.warn('Could not persist mock products to storage:', err);
  }
}

/**
 * Fetch active products for public catalogue browsing
 */
export async function fetchActiveProducts(filters?: {
  category?: string;
  search?: string;
  color?: string;
}): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      const term = filters.search.trim();
      query = query.or(`name.ilike.%${term}%,product_code.ilike.%${term}%`);
    }

    if (filters?.color) {
      query = query.contains('colors', [filters.color]);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching active products from Supabase:', error);
      throw error;
    }
    return (data as Product[]) ?? [];
  }

  // Fallback to local mock data
  let list = getLocalMockProducts().filter((p) => p.is_active);

  if (filters?.category) {
    list = list.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q)
    );
  }

  if (filters?.color) {
    list = list.filter((p) => p.colors.includes(filters.color!));
  }

  return list;
}

/**
 * Fetch featured products for the homepage
 */
export async function fetchFeaturedProducts(limit = 4): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products from Supabase:', error);
      throw error;
    }
    return (data as Product[]) ?? [];
  }

  const list = getLocalMockProducts()
    .filter((p) => p.is_active && p.is_featured)
    .slice(0, limit);

  return list.length > 0 ? list : getLocalMockProducts().slice(0, limit);
}

/**
 * Fetch a single product by unique product code
 */
export async function fetchProductByCode(code: string): Promise<Product | null> {
  const cleanCode = decodeURIComponent(code).trim();

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('product_code', cleanCode)
      .maybeSingle();

    if (error) {
      console.error('Error fetching product by code:', error);
      throw error;
    }
    return data as Product | null;
  }

  const found = getLocalMockProducts().find(
    (p) => p.product_code.toLowerCase() === cleanCode.toLowerCase()
  );
  return found || null;
}

/**
 * Fetch all products for the admin dashboard (both active and inactive)
 */
export async function fetchAllAdminProducts(filters?: ProductFilterParams): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (filters?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      const term = filters.search.trim();
      query = query.or(`name.ilike.%${term}%,product_code.ilike.%${term}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching admin products:', error);
      throw error;
    }
    return (data as Product[]) ?? [];
  }

  let list = getLocalMockProducts();

  if (filters?.status === 'active') {
    list = list.filter((p) => p.is_active);
  } else if (filters?.status === 'inactive') {
    list = list.filter((p) => !p.is_active);
  }

  if (filters?.category) {
    list = list.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q)
    );
  }

  return list;
}

/**
 * Check if a product code is already taken
 */
export async function checkProductCodeExists(
  code: string,
  excludeId?: string
): Promise<boolean> {
  const cleanCode = code.trim();

  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('products')
      .select('id')
      .eq('product_code', cleanCode);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error checking product code exists:', error);
      return false;
    }
    return (data && data.length > 0) || false;
  }

  const list = getLocalMockProducts();
  return list.some(
    (p) =>
      p.product_code.toLowerCase() === cleanCode.toLowerCase() &&
      (!excludeId || p.id !== excludeId)
  );
}

/**
 * Create a new product in the database
 */
export async function createProduct(formData: ProductFormData): Promise<Product> {
  const newProduct: Product = {
    id: isSupabaseConfigured ? undefined as unknown as string : `prod-${Date.now()}`,
    product_code: formData.product_code.trim(),
    name: formData.name.trim(),
    category: formData.category,
    description: formData.description.trim(),
    colors: formData.colors,
    images: formData.images || [],
    is_active: formData.is_active,
    is_featured: formData.is_featured,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .insert({
        product_code: newProduct.product_code,
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        colors: newProduct.colors,
        images: newProduct.images,
        is_active: newProduct.is_active,
        is_featured: newProduct.is_featured,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating product in Supabase:', error);
      throw error;
    }
    return data as Product;
  }

  const list = getLocalMockProducts();
  list.unshift(newProduct);
  saveLocalMockProducts(list);
  return newProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  formData: Partial<ProductFormData>
): Promise<Product> {
  if (isSupabaseConfigured && supabase) {
    const updatePayload: Record<string, unknown> = {};
    if (formData.product_code !== undefined) updatePayload.product_code = formData.product_code.trim();
    if (formData.name !== undefined) updatePayload.name = formData.name.trim();
    if (formData.category !== undefined) updatePayload.category = formData.category;
    if (formData.description !== undefined) updatePayload.description = formData.description.trim();
    if (formData.colors !== undefined) updatePayload.colors = formData.colors;
    if (formData.images !== undefined) updatePayload.images = formData.images;
    if (formData.is_active !== undefined) updatePayload.is_active = formData.is_active;
    if (formData.is_featured !== undefined) updatePayload.is_featured = formData.is_featured;

    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating product in Supabase:', error);
      throw error;
    }
    return data as Product;
  }

  const list = getLocalMockProducts();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error('Product not found');
  }

  const updated: Product = {
    ...list[index],
    ...formData,
    updated_at: new Date().toISOString(),
  };

  list[index] = updated;
  saveLocalMockProducts(list);
  return updated;
}

/**
 * Delete a product by internal ID
 */
export async function deleteProduct(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Error deleting product from Supabase:', error);
      throw error;
    }
    return;
  }

  const list = getLocalMockProducts().filter((p) => p.id !== id);
  saveLocalMockProducts(list);
}
