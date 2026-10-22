import React, { useState } from 'react';
import { Product, ProductFormData, Category } from '../../types/product';
import { CATEGORIES } from '../../config/constants';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ColorSelector } from './ColorSelector';
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
    description: initialProduct?.description || '',
    colors: initialProduct?.colors || ['Gold'],
    images: initialProduct?.images || [],
    is_active: initialProduct ? initialProduct.is_active : true,
    is_featured: initialProduct ? initialProduct.is_featured : false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingCode, setIsCheckingCode] = useState(false);

  const validate = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (!formData.product_code.trim()) {
      newErrors.product_code = 'Product ID code is required (e.g. AU-NK-012)';
    } else {
      // Check code uniqueness
      setIsCheckingCode(true);
      try {
        const exists = await checkProductCodeExists(
          formData.product_code.trim(),
          initialProduct?.id
        );
        if (exists) {
          newErrors.product_code = 'This Product ID is already in use by another product.';
        }
      } catch (err) {
        console.warn('Could not verify uniqueness:', err);
      } finally {
        setIsCheckingCode(false);
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please choose a category';
    }

    if (!formData.colors || formData.colors.length === 0) {
      newErrors.colors = 'Select at least one available finish/colour';
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Details */}
        <div className="lg:col-span-7 space-y-5">
          {/* Product ID */}
          <Input
            label="Product ID"
            placeholder="e.g. AU-NK-012"
            value={formData.product_code}
            onChange={(e) => {
              setFormData({ ...formData, product_code: e.target.value.toUpperCase() });
              if (errors.product_code) setErrors({ ...errors, product_code: '' });
            }}
            error={errors.product_code}
            helperText="Unique catalogue identifier. Recommended format: AU-[CATEGORY]-[NUMBER]"
          />

          {/* Product Name */}
          <Input
            label="Product Name"
            placeholder="e.g. Floral Grace Necklace"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          {/* Category */}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value as Category });
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            error={errors.category}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detail on craftsmanship, stone setting, length, styling tips, etc."
              className="block w-full rounded-md border border-brand-border bg-white p-3 text-sm text-brand-dark placeholder:text-warm-gray/60 focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
            />
          </div>

          {/* Available Colors */}
          <ColorSelector
            selectedColors={formData.colors}
            onChange={(colors) => {
              setFormData({ ...formData, colors });
              if (errors.colors) setErrors({ ...errors, colors: '' });
            }}
            error={errors.colors}
          />

          {/* Visibility and Featured Options */}
          <div className="p-4 rounded-xl bg-ivory/50 border border-brand-border/80 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Catalogue Visibility Settings
            </h4>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded text-brand-brown focus:ring-brand-gold border-brand-border cursor-pointer"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-brand-dark cursor-pointer">
                Active in public catalogue
                <span className="block text-xs text-warm-gray font-normal">
                  When unchecked, this product will be hidden from all public visitors.
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded text-brand-brown focus:ring-brand-gold border-brand-border cursor-pointer"
              />
              <label htmlFor="is_featured" className="text-sm font-medium text-brand-dark cursor-pointer">
                Featured piece on homepage
                <span className="block text-xs text-warm-gray font-normal">
                  Promote this product in the homepage curated showcase section.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Product Images (matches mockup layout) */}
        <div className="lg:col-span-5 space-y-4">
          <ImageUploader
            images={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            productPrefix={formData.product_code || 'temp'}
          />
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="pt-6 border-t border-brand-border flex items-center justify-end gap-3">
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
          {isEdit ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};
