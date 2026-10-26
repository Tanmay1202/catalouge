// src/pages/public/HomePage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
      {/* 3. Hero Banner: Warm Peach & Copper Watercolor Wash vibe */}
      <section className="bg-gradient-to-b from-[#F7ECE4] via-[#FDF8F5] to-[#FAF6F2] border-b border-[#EBDCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C47A53] px-3 py-1 rounded-full bg-[#FAF6F2] border border-[#EBDCD2]">
              {BRAND_CONFIG.shortName} Jewellery Collection
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1A15] leading-tight">
              Handcrafted Artificial Jewellery for Everyday Sparkle
            </h1>
            <p className="text-xs sm:text-base text-[#7D6B63] max-w-lg mx-auto">
              Explore trendy necklaces, earrings, bangles, and bracelets. Pick your favourites and place an order directly on WhatsApp.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#C47A53] hover:bg-[#AC643F] text-white text-sm font-semibold transition-colors min-h-[44px] shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shop by Category: Responsive tiles (swipeable on mobile, grid on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2B1A15]">
            Shop by Category
          </h2>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-[#C47A53] hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Category tiles */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1">
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
                className={`group shrink-0 w-[105px] sm:w-auto flex flex-col items-center text-center p-3 sm:p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[#C47A53] bg-[#F7ECE4] shadow-xs ring-1 ring-[#C47A53]'
                    : 'border-[#EBDCD2] bg-white hover:border-[#C47A53] hover:shadow-xs'
                }`}
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#F7ECE4] mb-2 sm:mb-2.5 border border-[#EBDCD2] group-hover:border-[#C47A53] transition-colors">
                  <img
                    src={meta.image}
                    alt={`${cat} category`}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#2B1A15] whitespace-nowrap">
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
              <h2 className="text-lg sm:text-xl font-bold text-[#2B1A15]">
                {selectedCategory ? `${selectedCategory} Collection` : 'Featured Pieces'}
              </h2>
              <p className="text-xs text-[#7D6B63]">
                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#7D6B63]">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'price-asc' | 'price-desc')}
                className="text-xs rounded-md border border-[#EBDCD2] bg-white px-2.5 py-1.5 text-[#2B1A15] focus:outline-none focus:ring-1 focus:ring-[#C47A53]"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                !selectedCategory
                  ? 'bg-[#2B1A15] text-white shadow-2xs'
                  : 'bg-white text-[#2B1A15] border border-[#EBDCD2] hover:bg-[#F7ECE4]'
              }`}
            >
              All Pieces
            </button>
            {BRAND_CONFIG.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                  selectedCategory === cat
                    ? 'bg-[#2B1A15] text-white shadow-2xs'
                    : 'bg-white text-[#2B1A15] border border-[#EBDCD2] hover:bg-[#F7ECE4]'
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
          <div className="text-center py-12 px-4 rounded-lg border border-dashed border-[#EBDCD2] bg-white">
            <p className="text-sm font-medium text-[#2B1A15]">No pieces found in this category.</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="mt-3 text-xs text-[#C47A53] font-semibold hover:underline"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#EBDCD2] bg-white text-[#2B1A15] hover:bg-[#F7ECE4] hover:border-[#C47A53] text-xs font-medium transition-colors"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. About Strip: 2-3 sentences about the brand and a link to Instagram */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#EBDCD2] bg-white p-6 sm:p-8 text-center space-y-4 shadow-2xs">
          <h2 className="text-xl font-bold text-[#2B1A15]">
            About {BRAND_CONFIG.name}
          </h2>
          <p className="text-sm text-[#7D6B63] max-w-xl mx-auto leading-relaxed">
            Welcome to {BRAND_CONFIG.name}. We craft and curate vibrant, lightweight artificial jewellery designed for everyday elegance and festive celebrations. Follow our journey and explore new arrivals directly on Instagram.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#2B1A15] text-white text-xs font-medium hover:bg-[#3D261E] transition-colors min-h-[44px]"
            >
              <Instagram className="w-4 h-4 text-[#C47A53]" />
              <span>Follow {BRAND_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={getProductWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors min-h-[44px]"
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
