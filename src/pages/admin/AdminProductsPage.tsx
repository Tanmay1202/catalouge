// src/pages/admin/AdminProductsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchAllAdminProducts, deleteProduct } from '../../lib/products';
import { ProductTable } from '../../components/admin/ProductTable';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { useCategories, DEFAULT_CATEGORIES } from '../../lib/categories';
import { Plus, Search, Package, Grid, X, Tag, Trash2 } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Deletion modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Category management modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const navigate = useNavigate();
  const { success, error } = useToast();

  const productCategories = products.map((p) => p.category).filter(Boolean);
  const { categories, addCategory, removeCategory } = useCategories(productCategories);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllAdminProducts({
        search: search || undefined,
        category: category || undefined,
        status: status !== 'all' ? status : undefined,
      });
      setProducts(data);
    } catch (err: unknown) {
      console.error('Failed to load products:', err);
      const msg = err instanceof Error ? err.message : 'Failed to load products';
      error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [search, category, status, error]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      success(`"${productToDelete.name}" was removed.`);
      setProductToDelete(null);
      await loadProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete product';
      error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    addCategory(trimmed);
    success(`Category "${trimmed}" added successfully!`);
    setNewCategoryName('');
  };

  const handleRemoveCategory = (catName: string) => {
    removeCategory(catName);
    success(`Category "${catName}" removed.`);
  };

  const totalProductsCount = products.length;
  const categoriesCount = categories.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage jewellery pieces and catalogue visibility
          </p>
        </div>

        {/* Header Right: Stats Cards & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Stat 1: Products count */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-brand-border shadow-xs">
            <div className="w-8 h-8 rounded-md bg-ivory flex items-center justify-center text-brand-brown">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-semibold leading-tight text-brand-dark">
                {totalProductsCount}
              </p>
              <p className="text-[11px] text-warm-gray leading-none">Products</p>
            </div>
          </div>

          {/* Stat 2: Categories count */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-brand-border shadow-xs">
            <div className="w-8 h-8 rounded-md bg-ivory flex items-center justify-center text-brand-brown">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-semibold leading-tight text-brand-dark">
                {categoriesCount}
              </p>
              <p className="text-[11px] text-warm-gray leading-none">Categories</p>
            </div>
          </div>

          {/* "Manage Categories" button */}
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
            variant="outline"
            leftIcon={<Tag className="w-4 h-4" />}
            className="shadow-xs"
          >
            Categories
          </Button>

          {/* "+ Add product" CTA button */}
          <Button
            onClick={() => navigate('/admin/products/new')}
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-xs"
          >
            Add product
          </Button>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by product ID or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-md border border-brand-border pl-9 pr-8 py-2 text-brand-dark placeholder:text-warm-gray/60 focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-warm-gray hover:text-brand-dark"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category & Status Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs rounded-md border border-brand-border bg-white px-3 py-2 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
          >
            <option value="">Category: All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="text-xs rounded-md border border-brand-border bg-white px-3 py-2 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown"
          >
            <option value="all">Status: All</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          {(search || category || status !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setStatus('all');
              }}
              className="text-xs text-brand-brown hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table View */}
      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={(p) => navigate(`/admin/products/${p.id}/edit`)}
        onDelete={handleDeleteClick}
        onClearFilters={() => {
          setSearch('');
          setCategory('');
          setStatus('all');
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(productToDelete)}
        product={productToDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setProductToDelete(null)}
      />

      {/* Category Management Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Manage Product Categories"
        maxWidth="md"
      >
        <div className="space-y-5">
          {/* Create new category form */}
          <form onSubmit={handleCreateCategory} className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Create New Category
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Anklets, Mangalsutra, Hairpins"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 text-xs rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#C47A53]"
              />
              <Button type="submit" variant="primary" size="sm">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
            <p className="text-[11px] text-zinc-400">
              New categories will be immediately available in product forms, navigation, and filters.
            </p>
          </form>

          {/* List of current categories */}
          <div className="border-t border-zinc-200 pt-4 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Current Categories ({categories.length})
            </label>
            <div className="divide-y divide-zinc-100 max-h-60 overflow-y-auto border border-zinc-200 rounded-lg bg-zinc-50/50">
              {categories.map((cat) => {
                const isDefault = DEFAULT_CATEGORIES.includes(cat);
                return (
                  <div
                    key={cat}
                    className="flex items-center justify-between px-3.5 py-2 text-xs hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-800">{cat}</span>
                      {isDefault && (
                        <span className="text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="text-zinc-400 hover:text-red-600 p-1 rounded transition-colors"
                        title={`Remove custom category "${cat}"`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCategoryModalOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
