// src/pages/public/ProductsPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ArrowLeft } from 'lucide-react';
import { Product } from '../../types/product';
import { fetchActiveProducts } from '../../lib/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Spinner } from '../../components/ui/Spinner';
import { BRAND_CONFIG, Category } from '../../config/brand';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = (searchParams.get('sort') as 'newest' | 'price-asc' | 'price-desc') || 'newest';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function load() {
      try {
        const data = await fetchActiveProducts({
          category: categoryParam || undefined,
          search: searchParam || undefined,
          sort: sortParam,
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
  }, [categoryParam, searchParam, sortParam]);

  const updateParam = (key: string, val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set(key, val);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasFilters = Boolean(categoryParam || searchParam || sortParam !== 'newest');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Breadcrumb */}
      <div className="mb-6 space-y-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          {categoryParam ? `${categoryParam} Collection` : 'All Jewellery Pieces'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Browse handcrafted artificial jewellery by {BRAND_CONFIG.name}. Enquire directly on WhatsApp to order.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-md border border-zinc-200 bg-white pl-9 pr-8 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#D46A7E]"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateParam('search', '');
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-xs text-zinc-500">Sort by:</span>
            <select
              value={sortParam}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="text-xs rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-800 focus:outline-none focus:ring-1 focus:ring-[#D46A7E]"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => updateParam('category', '')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
              !categoryParam
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            All Categories
          </button>
          {BRAND_CONFIG.categories.map((cat: Category) => (
            <button
              key={cat}
              onClick={() => updateParam('category', categoryParam === cat ? '' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                categoryParam === cat
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#D46A7E] hover:underline px-2 py-1 font-medium whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="py-16 flex justify-center">
          <Spinner size="md" label="Loading catalogue..." />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-lg border border-dashed border-zinc-200 bg-white space-y-3">
          <p className="text-sm font-medium text-zinc-800">No jewellery pieces match your search or filter.</p>
          <button
            onClick={handleClearFilters}
            className="text-xs text-[#D46A7E] font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id || p.product_code} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
