import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchActiveProducts } from '../../lib/products';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductFilters, FilterState } from '../../components/product/ProductFilters';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL params
  const filters: FilterState = useMemo(() => ({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    color: searchParams.get('color') || '',
  }), [searchParams]);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize state and fetch
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function load() {
      try {
        const data = await fetchActiveProducts({
          category: filters.category || undefined,
          search: filters.search || undefined,
          color: filters.color || undefined,
        });

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load catalogue products:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [filters.category, filters.search, filters.color]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    const nextParams = new URLSearchParams(searchParams);

    if (updated.category !== undefined) {
      if (updated.category) {
        nextParams.set('category', updated.category);
      } else {
        nextParams.delete('category');
      }
    }

    if (updated.search !== undefined) {
      if (updated.search) {
        nextParams.set('search', updated.search);
      } else {
        nextParams.delete('search');
      }
    }

    if (updated.color !== undefined) {
      if (updated.color) {
        nextParams.set('color', updated.color);
      } else {
        nextParams.delete('color');
      }
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumb Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
          {filters.category ? `${filters.category} Collection` : 'All Jewellery Pieces'}
        </h1>
        <p className="text-sm text-warm-gray mt-2">
          Browse our complete catalogue of artificial jewellery. Enquire directly on WhatsApp with any product code.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalCount={products.length}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        onClearFilters={handleResetFilters}
      />
    </div>
  );
};
