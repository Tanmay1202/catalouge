import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, COLOR_OPTIONS } from '../../config/constants';
import { Category } from '../../types/product';

export interface FilterState {
  category: string;
  search: string;
  color: string;
}

export interface ProductFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
}) => {
  const hasActiveFilters = Boolean(
    filters.category || filters.search || filters.color
  );

  return (
    <div className="space-y-4 mb-8">
      {/* Top filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-ivory/60 border border-brand-border/80">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by product name or code (e.g. AU-NK)..."
            className="w-full text-sm rounded-lg border border-brand-border bg-white pl-10 pr-9 py-2.5 text-brand-dark placeholder:text-warm-gray/60 focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-brand-dark"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category & Color Dropdowns + Count */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={filters.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="w-full sm:w-auto text-sm rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
              aria-label="Filter by Category"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat: Category) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Color Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={filters.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="w-full sm:w-auto text-sm rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
              aria-label="Filter by Color"
            >
              <option value="">All Finishes / Colors</option>
              {COLOR_OPTIONS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-gray hover:text-brand-brown px-3 py-2.5 rounded-lg border border-dashed border-brand-border bg-white hover:bg-cream transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Quick Tags */}
      <div className="flex items-center justify-between text-xs text-warm-gray px-1">
        <p className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Showing <span className="font-semibold text-brand-dark">{totalCount}</span> {totalCount === 1 ? 'piece' : 'pieces'}
        </p>

        {/* Quick category pills for fast clicking on tablet/desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => onChange({ category: '' })}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              !filters.category
                ? 'bg-brand-brown text-white font-medium'
                : 'bg-ivory text-brand-dark hover:bg-ivory/80'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ category: filters.category === cat ? '' : cat })}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filters.category === cat
                  ? 'bg-brand-brown text-white font-medium'
                  : 'bg-ivory text-brand-dark hover:bg-ivory/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
