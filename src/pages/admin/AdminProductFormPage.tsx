import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product, ProductFormData } from '../../types/product';
import { fetchAllAdminProducts, createProduct, updateProduct } from '../../lib/products';
import { ProductForm } from '../../components/admin/ProductForm';
import { Spinner } from '../../components/ui/Spinner';
import { useToast } from '../../components/ui/Toast';
import { ArrowLeft } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!id) return;
      setIsLoading(true);

      try {
        const all = await fetchAllAdminProducts();
        const match = all.find((p) => p.id === id);

        if (isMounted) {
          if (match) {
            setProduct(match);
          } else {
            error('Product not found with this identifier');
            navigate('/admin');
          }
        }
      } catch (err) {
        console.error('Error fetching product for edit:', err);
        error('Could not load product details');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (isEdit) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id, isEdit, navigate, error]);

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && product) {
        await updateProduct(product.id, formData);
        success(`Product "${formData.name}" successfully updated.`);
      } else {
        await createProduct(formData);
        success(`New product "${formData.name}" created.`);
      }
      navigate('/admin');
    } catch (err: unknown) {
      console.error('Failed to save product:', err);
      const msg = err instanceof Error ? err.message : 'Error saving product';
      error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-brand-border p-16 flex justify-center items-center">
        <Spinner size="lg" label="Loading product specifications..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-lg border border-brand-border bg-white text-warm-gray hover:text-brand-dark hover:bg-ivory transition-colors"
            title="Back to products list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
              {isEdit ? 'Edit Piece' : 'Add New Jewellery Piece'}
            </h1>
            <p className="text-xs text-zinc-500">
              {isEdit
                ? `Modifying item: ${product?.name}`
                : 'Configure catalogue details and upload photography'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-lg border border-zinc-200 p-6 sm:p-8">
        <ProductForm
          initialProduct={product}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
