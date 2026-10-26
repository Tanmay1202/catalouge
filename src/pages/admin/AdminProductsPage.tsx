import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchAllAdminProducts, deleteProduct } from '../../lib/products';
import { ProductTable } from '../../components/admin/ProductTable';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { CATEGORIES } from '../../config/constants';
import { Plus, Search, Package, Grid, X } from 'lucide-react';

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

  const navigate = useNavigate();
  const { success, error } = useToast();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllAdminProducts({
        search: search || undefined,
        category: category || undefined,
        status: status !== 'all' ? status : undefined,
      });
      setProducts(data);
    } catch (err) {
      console.error('Failed to load admin products:', err);
      error('Failed to retrieve product catalogue. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  }, [search, category, status, error]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEdit = (product: Product) => {
    navigate(`/admin/products/${encodeURIComponent(product.id)}/edit`);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      await deleteProduct(productToDelete.id);
      success(`Product "${productToDelete.name}" (${productToDelete.product_code}) removed.`);
      setProductToDelete(null);
      await loadProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not delete product';
      error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('all');
  };

  // Metrics calculation
  const totalProductsCount = products.length;
  const categoriesCount = CATEGORIES.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage jewellery pieces, prices, and catalogue visibility
          </p>
        </div>

        {/* Header Right: Stats Cards & Add Button (matching mockup) */}
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

          {/* "+ Add product" CTA button (matching mockup) */}
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

      {/* Search and Filters Toolbar (matching mockup) */}
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
            {CATEGORIES.map((c) => (
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
              onClick={handleClearFilters}
              className="text-xs text-warm-gray hover:text-brand-brown px-2 py-1 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Product Table */}
      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onClearFilters={handleClearFilters}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
