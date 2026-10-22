import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../ui/EmptyState';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onClearFilters?: () => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  emptyTitle = 'No jewellery found',
  emptyDescription = 'We could not find any pieces matching your current filters. Try resetting your search or category selection.',
  onClearFilters,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-brand-border/60 bg-white overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/4.5] bg-ivory" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-16 bg-ivory rounded" />
              <div className="h-5 w-3/4 bg-ivory rounded" />
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-ivory" />
                <div className="w-3.5 h-3.5 rounded-full bg-ivory" />
                <div className="w-3.5 h-3.5 rounded-full bg-ivory" />
              </div>
              <div className="h-9 w-full bg-ivory rounded-md mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onClearFilters ? 'Reset Filters' : undefined}
        onAction={onClearFilters}
        className="my-8"
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id || product.product_code} product={product} priority={index < 4} />
      ))}
    </div>
  );
};
