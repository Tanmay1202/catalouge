import React from 'react';
import { Product } from '../../types/product';
import { ColorDots } from '../product/ColorDots';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import { Spinner } from '../ui/Spinner';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onClearFilters?: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onClearFilters,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-brand-border p-12 flex justify-center items-center">
        <Spinner size="lg" label="Loading product catalogue..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-brand-border p-6">
        <EmptyState
          title="No products in catalogue"
          description="No products match your current search or filter criteria."
          actionLabel={onClearFilters ? 'Reset Filters' : undefined}
          onAction={onClearFilters}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-brand-dark">
          {/* Table Header */}
          <thead className="bg-[#FAF8F5] border-b border-brand-border text-xs uppercase font-semibold text-warm-gray tracking-wider">
            <tr>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Image</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Product ID</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Name</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Category</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Colors</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Status</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-brand-border/60">
            {products.map((product) => {
              const thumbnail =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=300&auto=format&fit=crop';

              return (
                <tr
                  key={product.id || product.product_code}
                  className="hover:bg-ivory/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <td className="py-3 px-4 sm:px-6">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-brand-border bg-ivory flex-shrink-0">
                      <img
                        src={thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=300&auto=format&fit=crop';
                        }}
                      />
                    </div>
                  </td>

                  {/* Product Code */}
                  <td className="py-3 px-4 sm:px-6 font-mono font-medium text-xs text-brand-dark">
                    {product.product_code}
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4 sm:px-6">
                    <p className="font-medium text-brand-dark max-w-[220px] truncate">
                      {product.name}
                    </p>
                    {product.is_featured && (
                      <span className="inline-block text-[10px] uppercase font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded mt-0.5">
                        Featured on homepage
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 sm:px-6 text-warm-gray text-xs">
                    {product.category}
                  </td>

                  {/* Colors */}
                  <td className="py-3 px-4 sm:px-6">
                    <ColorDots colors={product.colors} size="sm" />
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 sm:px-6">
                    <Badge variant={product.is_active ? 'active' : 'inactive'}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>

                  {/* Actions (matching mockup) */}
                  <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      {/* View public link */}
                      <Link
                        to={`/products/${encodeURIComponent(product.product_code)}`}
                        target="_blank"
                        className="text-warm-gray hover:text-brand-dark p-1"
                        title="View on store"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {/* Edit button */}
                      <button
                        onClick={() => onEdit(product)}
                        className="text-xs font-semibold text-brand-dark hover:text-brand-brown hover:underline inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => onDelete(product)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
