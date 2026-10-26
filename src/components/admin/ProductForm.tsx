// src/components/admin/ProductForm.tsx
import React, { useState } from 'react';
import { Product, ProductFormData, Category } from '../../types/product';
import { BRAND_CONFIG } from '../../config/brand';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ImageUploader } from './ImageUploader';
import { checkProductCodeExists } from '../../lib/products';

export interface ProductFormProps {
  initialProduct?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const isEdit = Boolean(initialProduct);

  const [formData, setFormData] = useState<ProductFormData>({
    product_code: initialProduct?.product_code || '',
    name: initialProduct?.name || '',
    category: initialProduct?.category || 'Necklaces',
    price: initialProduct?.price || 0,
    original_price: initialProduct?.original_price || undefined,
    description: initialProduct?.description || '',
    colors: initialProduct?.colors || ['Gold Tone'],
    images: initialProduct?.images || [],
    in_stock: initialProduct?.in_stock !== undefined ? initialProduct.in_stock : true,
    is_active: initialProduct ? initialProduct.is_active : true,
    is_featured: initialProduct ? initialProduct.is_featured : false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingCode, setIsCheckingCode] = useState(false);

  const validate = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (formData.price <= 0 || isNaN(formData.price)) {
      newErrors.price = 'Please enter a valid price in ₹ (e.g. 899)';
    }

    if (formData.product_code?.trim()) {
      setIsCheckingCode(true);
      try {
        const exists = await checkProductCodeExists(
          formData.product_code.trim(),
          initialProduct?.id
        );
        if (exists) {
          newErrors.product_code = 'This item code is already used by another piece.';
        }
      } catch (err) {
        console.warn('Could not verify uniqueness:', err);
      } finally {
        setIsCheckingCode(false);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-7 space-y-4">
          <Input
            label="Product Name"
            placeholder="e.g. Floral Kundan & Pearl Choker Set"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Selling Price (₹)"
              type="number"
              placeholder="e.g. 1299"
              value={formData.price || ''}
              onChange={(e) => {
                setFormData({ ...formData, price: Number(e.target.value) });
                if (errors.price) setErrors({ ...errors, price: '' });
              }}
              error={errors.price}
              required
            />

            <Input
              label="Original MRP (₹, optional)"
              type="number"
              placeholder="e.g. 1599"
              value={formData.original_price || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  original_price: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              helperText="Shows as struck-through discount price if set"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            >
              {BRAND_CONFIG.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>

            <Input
              label="Item Code (optional)"
              placeholder="e.g. ZB-NK-01"
              value={formData.product_code || ''}
              onChange={(e) => {
                setFormData({ ...formData, product_code: e.target.value.toUpperCase() });
                if (errors.product_code) setErrors({ ...errors, product_code: '' });
              }}
              error={errors.product_code}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description of stone work, length, occasion..."
              className="w-full text-xs sm:text-sm rounded-md border border-zinc-200 bg-white p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#D46A7E]"
            />
          </div>

          {/* Visibility Controls */}
          <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50 space-y-3">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded text-[#D46A7E] focus:ring-[#D46A7E] border-zinc-300"
              />
              <label htmlFor="is_active" className="text-xs font-medium text-zinc-800">
                Active in public catalogue
              </label>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#D46A7E] focus:ring-[#D46A7E] border-zinc-300"
              />
              <label htmlFor="is_featured" className="text-xs font-medium text-zinc-800">
                Featured on homepage
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Photography */}
        <div className="lg:col-span-5">
          <ImageUploader
            images={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            productPrefix={formData.product_code || 'item'}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting || isCheckingCode}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting || isCheckingCode}
        >
          {isEdit ? 'Save Changes' : 'Create Piece'}
        </Button>
      </div>
    </form>
  );
};
