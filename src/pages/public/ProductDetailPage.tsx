import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchProductByCode } from '../../lib/products';
import { ProductImageGallery } from '../../components/product/ProductImageGallery';
import { ColorDots } from '../../components/product/ColorDots';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { MessageCircle, ArrowLeft, Shield, Sparkles, Truck, Check } from 'lucide-react';
import { getWhatsAppLink } from '../../config/constants';

export const ProductDetailPage: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function load() {
      if (!productCode) {
        setIsLoading(false);
        return;
      }

      try {
        const found = await fetchProductByCode(productCode);
        if (isMounted) {
          setProduct(found);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
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
  }, [productCode]);

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Spinner size="lg" label="Loading piece details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">404 — Product Not Found</p>
        <h1 className="font-serif text-3xl font-medium text-brand-dark">
          We could not locate this piece
        </h1>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          The requested product code <span className="font-mono font-semibold">{productCode}</span> may have been removed or deactivated.
        </p>
        <div className="pt-4">
          <Link to="/products">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppEnquiry = () => {
    window.open(
      getWhatsAppLink(product.product_code, product.name),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-warm-gray mb-8">
        <Link to="/" className="hover:text-brand-dark">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-dark">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information & Enquire Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-brand-border/80 pb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Item Code: {product.product_code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-ivory border border-brand-border text-xs text-brand-brown font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
              About This Piece
            </h2>
            <p className="text-sm text-brand-dark/90 leading-relaxed whitespace-pre-line">
              {product.description || 'Artisan handcrafted artificial jewellery made with precision detailing and premium lustrous finish.'}
            </p>
          </div>

          {/* Available Colors with Swatches */}
          <div className="space-y-2.5 pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Available Metal Finishes & Colors
            </h2>
            <ColorDots colors={product.colors} showLabels={true} />
          </div>

          {/* Enquiry Action CTA */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Enquire on WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-warm-gray">
              Click to open WhatsApp with the product code <span className="font-mono font-semibold">{product.product_code}</span> prefilled.
            </p>
          </div>

          {/* Value Badges Accordion / Card */}
          <div className="p-4 rounded-xl bg-ivory border border-brand-border/80 space-y-3 text-xs text-brand-dark/80">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-brown flex-shrink-0" />
              <span>Anti-tarnish protective polish for long-lasting brilliance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-brand-brown flex-shrink-0" />
              <span>Skin-friendly artificial alloys and stone prong settings</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-brand-brown flex-shrink-0" />
              <span>Direct order enquiry with personalized dispatch tracking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-brand-brown flex-shrink-0" />
              <span>Matching set customization available upon enquiry</span>
            </div>
          </div>

          {/* Return link */}
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-medium text-warm-gray hover:text-brand-brown transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all jewellery pieces</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
