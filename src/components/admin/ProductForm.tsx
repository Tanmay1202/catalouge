// src/components/admin/ProductForm.tsx
import React, { useState } from 'react';
import { Product, ProductFormData, Category } from '../../types/product';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ImageUploader } from './ImageUploader';
import { checkProductCodeExists } from '../../lib/products';
import { useCategories } from '../../lib/categories';
import { useColors } from '../../lib/colors';
import { Plus, X, Check } from 'lucide-react';

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

  const { categories, addCategory: createCategory } = useCategories();
  const { colors: allAvailableColors, addColor: createGlobalColor } = useColors();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [customColorInput, setCustomColorInput] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    product_code: initialProduct?.product_code || '',
    name: initialProduct?.name || '',
    category: initialProduct?.category || 'Necklaces',
    description: initialProduct?.description || '',
    colors: initialProduct?.colors || ['Gold Tone'],
    images: initialProduct?.images || [],
    in_stock: initialProduct?.in_stock !== undefined ? initialProduct.in_stock : true,
    is_active: initialProduct ? initialProduct.is_active : true,
    is_featured: initialProduct ? initialProduct.is_featured : false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingCode, setIsCheckingCode] = useState(false);

  // Handle on-the-fly category creation
  const handleCreateCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    createCategory(trimmed);
    setFormData((prev) => ({ ...prev, category: trimmed }));
    setNewCategoryInput('');
    setIsAddingCategory(false);
  };

  // Toggle color inclusion in product
  const handleToggleColor = (colorName: string) => {
    setFormData((prev) => {
      const current = prev.colors || [];
      const exists = current.includes(colorName);
      const updated = exists
        ? current.filter((c) => c !== colorName)
        : [...current, colorName];
      return { ...prev, colors: updated };
    });
  };

  // Remove a selected color
  const handleRemoveColor = (colorName: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: (prev.colors || []).filter((c) => c !== colorName),
    }));
  };

  // Add a new custom color
  const handleAddNewCustomColor = () => {
    const trimmed = customColorInput.trim();
    if (!trimmed) return;
    createGlobalColor(trimmed);
    setFormData((prev) => {
      const current = prev.colors || [];
      return current.includes(trimmed)
        ? prev
        : { ...prev, colors: [...current, trimmed] };
    });
    setCustomColorInput('');
  };

  const validate = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {/* Category Field with Inline Creation */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-xs font-medium text-[#C47A53] hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>{isAddingCategory ? 'Select existing' : 'New Category'}</span>
                </button>
              </div>

              {isAddingCategory ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Anklets, Mangalsutra"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateCategory();
                      }
                    }}
                    autoFocus
                    className="w-full text-xs rounded-md border border-[#EBDCD2] px-2.5 py-2 text-[#2B1A15] focus:outline-none focus:ring-1 focus:ring-[#C47A53]"
                  />
                  <Button type="button" size="sm" onClick={handleCreateCategory}>
                    Add
                  </Button>
                </div>
              ) : (
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              )}
            </div>

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

          {/* Available Colors & Finishes */}
          <div className="p-4 rounded-lg border border-[#EBDCD2] bg-white space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Available Colors / Finishes
              </label>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Select the finishes available for this piece or add a custom color.
              </p>
            </div>

            {/* Currently Selected Color Tags */}
            {formData.colors && formData.colors.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-md bg-[#FAF6F2] border border-[#EBDCD2]">
                <span className="text-[11px] font-medium text-zinc-500 mr-1">Selected:</span>
                {formData.colors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-[#2B1A15] border border-[#EBDCD2] shadow-2xs"
                  >
                    <span>{c}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(c)}
                      className="text-zinc-400 hover:text-red-600 transition-colors"
                      aria-label={`Remove color ${c}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Color Presets Pill Toggles */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-zinc-500 block">
                Quick select color options:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {allAvailableColors.map((color) => {
                  const isSelected = formData.colors?.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => handleToggleColor(color.name)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-[#F7ECE4] border-[#C47A53] text-[#2B1A15] font-semibold'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                      }`}
                    >
                      {color.hex && (
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                      )}
                      <span>{color.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#C47A53]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Color Input */}
            <div className="flex items-center gap-2 pt-1 border-t border-zinc-100">
              <input
                type="text"
                placeholder="Add custom color (e.g. Mint Green, Meenakari White)..."
                value={customColorInput}
                onChange={(e) => setCustomColorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddNewCustomColor();
                  }
                }}
                className="flex-1 text-xs rounded-md border border-[#EBDCD2] px-2.5 py-1.5 text-[#2B1A15] placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#C47A53]"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddNewCustomColor}
                className="shrink-0"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Color</span>
              </Button>
            </div>
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
              className="w-full text-xs sm:text-sm rounded-md border border-[#EBDCD2] bg-white p-2.5 text-[#2B1A15] focus:outline-none focus:ring-1 focus:ring-[#C47A53]"
            />
          </div>

          {/* Visibility Controls */}
          <div className="p-3.5 rounded-lg border border-[#EBDCD2] bg-[#FAF6F2] space-y-3">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded text-[#C47A53] focus:ring-[#C47A53] border-[#EBDCD2]"
              />
              <label htmlFor="is_active" className="text-xs font-medium text-[#2B1A15]">
                Active in public catalogue
              </label>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#C47A53] focus:ring-[#C47A53] border-[#EBDCD2]"
              />
              <label htmlFor="is_featured" className="text-xs font-medium text-[#2B1A15]">
                Featured on homepage
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Images (Desktop preview alongside info) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#EBDCD2] space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[#2B1A15]">Product Photography</h3>
              <p className="text-xs text-[#7D6B63] mt-0.5">
                Upload clear jewellery photos. The first image will be used as the primary display image.
              </p>
            </div>

            <ImageUploader
              images={formData.images || []}
              onChange={(images) => setFormData({ ...formData, images })}
            />
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EBDCD2]">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
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
