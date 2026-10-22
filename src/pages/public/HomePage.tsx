import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Product, Category } from '../../types/product';
import { fetchFeaturedProducts } from '../../lib/products';
import { ProductCard } from '../../components/product/ProductCard';
import { CATEGORY_METADATA, BRAND_TAGLINE, BRAND_SUBTITLE } from '../../config/constants';
import { Spinner } from '../../components/ui/Spinner';

export const HomePage: React.FC = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const data = await fetchFeaturedProducts(4);
        if (isMounted) {
          setFeatured(data);
        }
      } catch (err) {
        console.warn('Could not load featured products:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const categoryHighlights: Category[] = ['Necklaces', 'Earrings', 'Bracelets', 'Bangles'];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section (matches reference mockup) */}
      <section className="relative overflow-hidden bg-ivory/80 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] lg:min-h-[620px] items-center py-12 lg:py-0">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 z-10 py-6 lg:py-16 space-y-6">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown">
                Jewellery For Every You
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-brand-dark leading-[1.12]">
                {BRAND_TAGLINE}
              </h1>

              <p className="text-base sm:text-lg text-warm-gray max-w-lg leading-relaxed">
                {BRAND_SUBTITLE}
              </p>

              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-md border border-brand-brown text-brand-brown font-medium text-sm hover:bg-brand-brown hover:text-white transition-all duration-300 shadow-xs"
                >
                  <span>Explore the collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Value highlights matching mockup */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-brand-border/60">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-brown flex-shrink-0" />
                  <span className="text-xs font-medium text-brand-dark leading-tight">
                    Modern Designs
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-brown flex-shrink-0" />
                  <span className="text-xs font-medium text-brand-dark leading-tight">
                    Premium Finishes
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-brand-brown flex-shrink-0" />
                  <span className="text-xs font-medium text-brand-dark leading-tight">
                    Thoughtfully Curated
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative h-[360px] lg:h-full min-h-[420px] w-full mt-6 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full h-[90%] rounded-2xl overflow-hidden shadow-lg border border-brand-border">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop"
                  alt="AURELLE handcrafted gold jewellery collection"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category Section (matches reference mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark">
              Shop by category
            </h2>
            <p className="text-xs sm:text-sm text-warm-gray mt-1">
              Find the perfect companion piece for your styling needs
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-brand-brown hover:text-brand-dark inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 category cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryHighlights.map((cat) => {
            const meta = CATEGORY_METADATA[cat];
            return (
              <div
                key={cat}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
                className="group cursor-pointer rounded-xl overflow-hidden border border-brand-border/80 bg-white shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-ivory">
                  <img
                    src={meta.image}
                    alt={meta.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="p-4 flex items-center justify-between bg-white border-t border-brand-border/40">
                  <span className="font-serif text-base sm:text-lg font-medium text-brand-dark group-hover:text-brand-brown transition-colors">
                    {meta.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-warm-gray group-hover:text-brand-brown group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Pieces Section (matches reference mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark">
              Featured pieces
            </h2>
            <p className="text-xs sm:text-sm text-warm-gray mt-1">
              Our signature artificial jewellery pieces loved by our clientele
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-brand-brown hover:text-brand-dark inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Spinner size="lg" label="Curating featured pieces..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id || product.product_code} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Catalogue Invitation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-ivory border border-brand-border p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark">
              Looking for something tailored?
            </h3>
            <p className="text-sm text-warm-gray">
              We curate custom sets for weddings, celebrations, and boutique gifting. Send us an enquiry with your preferred design codes.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-brown text-white text-xs uppercase font-semibold tracking-wider hover:bg-brand-dark transition-colors shadow-xs"
              >
                Browse Full Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
