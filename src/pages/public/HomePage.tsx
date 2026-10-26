// src/pages/public/HomePage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Instagram, MessageCircle } from 'lucide-react';
import { Product } from '../../types/product';
import { fetchActiveProducts } from '../../lib/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Spinner } from '../../components/ui/Spinner';
import { BRAND_CONFIG, Category, getProductWhatsAppLink } from '../../config/brand';
import { CATEGORY_METADATA } from '../../config/constants';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function loadProducts() {
      try {
        const data = await fetchActiveProducts({
          category: selectedCategory || undefined,
          sort: sortOrder,
        });
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Could not load products:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, sortOrder]);

  const displayedProducts = useMemo(() => {
    return products.slice(0, 12);
  }, [products]);

  const scrollToProducts = () => {
    const el = document.getElementById('catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 3. Hero Banner: Clean full-width section with heading, subtext, and single 'Shop now' button */}
      <section className="bg-zinc-100 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D46A7E]">
              {BRAND_CONFIG.shortName} Jewellery Collection
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
              Handcrafted Artificial Jewellery for Everyday Sparkle
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
              Explore trendy necklaces, earrings, bangles, and bracelets. Pick your favourites and place an order directly on WhatsApp.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#D46A7E] hover:bg-[#BC5568] text-white text-sm font-semibold transition-colors min-h-[44px]"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shop by Category: Single row / mobile scrollable category tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
            Shop by Category
          </h2>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-[#D46A7E] hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Scrollable category tiles on mobile, grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {BRAND_CONFIG.categories.map((cat: Category) => {
            const meta = CATEGORY_METADATA[cat];
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(isSelected ? '' : cat);
                  scrollToProducts();
                }}
                className={`group flex flex-col items-center text-center p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[#D46A7E] bg-rose-50/50'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-zinc-100 mb-2 border border-zinc-200">
                  <img
                    src={meta.image}
                    alt={`${cat} category`}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-900">
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Product Grid Section */}
      <section id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Header + Filter chips + Sort controls */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                {selectedCategory ? `${selectedCategory} Collection` : 'Featured Pieces'}
              </h2>
              <p className="text-xs text-zinc-500">
                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-zinc-500">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'price-asc' | 'price-desc')}
                className="text-xs rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-800 focus:outline-none focus:ring-1 focus:ring-[#D46A7E]"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                !selectedCategory
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              All Pieces
            </button>
            {BRAND_CONFIG.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Spinner size="md" label="Loading jewellery pieces..." />
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-lg border border-dashed border-zinc-200 bg-white">
            <p className="text-sm font-medium text-zinc-800">No pieces found in this category.</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="mt-3 text-xs text-[#D46A7E] font-medium hover:underline"
            >
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id || product.product_code} product={product} />
            ))}
          </div>
        )}

        {/* 'View All' catalogue link if more products exist */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 text-xs font-medium transition-colors"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. About Strip: 2-3 sentences about the brand and a link to Instagram */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">
            About {BRAND_CONFIG.name}
          </h2>
          <p className="text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Welcome to {BRAND_CONFIG.name}. We craft and curate vibrant, lightweight artificial jewellery designed for everyday elegance and festive celebrations. Follow our journey and explore new arrivals directly on Instagram.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors min-h-[44px]"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {BRAND_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={getProductWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] text-white text-xs font-medium hover:bg-[#20bd5a] transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact anchor destination */}
      <div id="contact" className="sr-only">Contact Section</div>
    </div>
  );
};
