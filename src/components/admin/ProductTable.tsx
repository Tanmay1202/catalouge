// src/components/admin/ProductTable.tsx
import React from 'react';
import { Product } from '../../types/product';
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
      <div className="bg-white rounded-lg border border-zinc-200 p-12 flex justify-center items-center">
        <Spinner size="md" label="Loading catalogue..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-6">
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filters."
          actionLabel={onClearFilters ? 'Reset Filters' : undefined}
          onAction={onClearFilters}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-900">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-semibold text-zinc-500">
            <tr>
              <th scope="col" className="py-3 px-4">Photo</th>
              <th scope="col" className="py-3 px-4">Name</th>
              <th scope="col" className="py-3 px-4">Category</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {products.map((product) => {
              const thumbnail =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=300&auto=format&fit=crop';

              return (
                <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded overflow-hidden border border-zinc-200 bg-zinc-100 flex-shrink-0">
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

                  {/* Name & Code */}
                  <td className="py-3 px-4">
                    <p className="font-medium text-zinc-900">{product.name}</p>
                    {product.product_code && (
                      <span className="text-[11px] font-mono text-zinc-400">
                        {product.product_code}
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-zinc-500 text-xs">
                    {product.category}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <Badge variant={product.is_active ? 'active' : 'inactive'}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      <Link
                        to={`/products/${encodeURIComponent(product.id || product.product_code || '')}`}
                        target="_blank"
                        className="text-zinc-400 hover:text-zinc-700 p-1"
                        title="View on store"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => onEdit(product)}
                        className="text-xs font-semibold text-[#2B1A15] hover:text-[#C47A53] inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
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
