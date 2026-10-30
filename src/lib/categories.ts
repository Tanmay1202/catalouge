// src/lib/categories.ts
import { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const STORAGE_KEY = 'ziba_custom_categories';

export const DEFAULT_CATEGORIES: string[] = Array.from(BRAND_CONFIG.categories);

/**
 * Retrieve custom categories stored locally
 */
export function getStoredCategories(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist custom categories to localStorage and dispatch update event
 */
export function saveStoredCategories(categories: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ziba_categories_updated'));
    }
  } catch (err) {
    console.warn('Failed to save categories to localStorage:', err);
  }
}

/**
 * Add a new category
 */
export function addCategory(name: string): string[] {
  const trimmed = name.trim();
  if (!trimmed) return getAllCategories();

  const currentCustom = getStoredCategories();
  const allExisting = [...DEFAULT_CATEGORIES, ...currentCustom];
  const exists = allExisting.some((c) => c.toLowerCase() === trimmed.toLowerCase());

  if (!exists) {
    // Capitalize first letter of each word nicely
    const formatted = trimmed
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
      .join(' ');

    const updated = [...currentCustom, formatted];
    saveStoredCategories(updated);
  }

  return getAllCategories();
}

/**
 * Delete a custom category
 */
export function removeCustomCategory(name: string): string[] {
  const currentCustom = getStoredCategories();
  const updated = currentCustom.filter(
    (c) => c.toLowerCase() !== name.toLowerCase()
  );
  saveStoredCategories(updated);
  return getAllCategories();
}

/**
 * Get all categories (defaults + stored custom + optional product list)
 */
export function getAllCategories(fromProducts: string[] = []): string[] {
  const custom = getStoredCategories();
  const combined = new Set<string>();

  DEFAULT_CATEGORIES.forEach((c) => combined.add(c));
  custom.forEach((c) => combined.add(c));
  fromProducts.filter(Boolean).forEach((c) => combined.add(c));

  return Array.from(combined);
}

/**
 * Fetch distinct categories from Supabase (if configured)
 */
export async function fetchCategoriesFromBackend(): Promise<string[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (!error && data) {
        const productCategories = data.map((p) => p.category as string).filter(Boolean);
        return getAllCategories(productCategories);
      }
    } catch (err) {
      console.warn('Could not fetch categories from Supabase:', err);
    }
  }
  return getAllCategories();
}

/**
 * React hook to access and update categories reactively
 */
export function useCategories(initialProductCategories: string[] = []) {
  const [categories, setCategories] = useState<string[]>(() =>
    getAllCategories(initialProductCategories)
  );

  useEffect(() => {
    let mounted = true;

    async function load() {
      const fetched = await fetchCategoriesFromBackend();
      if (mounted) {
        setCategories(fetched);
      }
    }

    load();

    const handleUpdate = () => {
      setCategories(getAllCategories(initialProductCategories));
    };

    window.addEventListener('ziba_categories_updated', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('ziba_categories_updated', handleUpdate);
    };
  }, []);

  const handleAddCategory = (name: string) => {
    const updated = addCategory(name);
    setCategories(updated);
    return updated;
  };

  const handleRemoveCategory = (name: string) => {
    const updated = removeCustomCategory(name);
    setCategories(updated);
    return updated;
  };

  return {
    categories,
    addCategory: handleAddCategory,
    removeCategory: handleRemoveCategory,
  };
}
