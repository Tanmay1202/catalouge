import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';
import { Product } from '../../types/product';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  product: Product | null;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isDeleting = false,
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" maxWidth="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-950 text-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Permanent Action</p>
            <p className="text-xs text-red-900/80 mt-0.5">
              Are you sure you want to delete this product? It will be removed from your catalogue and this cannot be undone.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1 text-xs">
          {product.product_code && (
            <p className="font-mono text-zinc-500">
              Code: <span className="font-semibold text-zinc-900">{product.product_code}</span>
            </p>
          )}
          <p className="text-sm font-semibold text-zinc-900">{product.name}</p>
          <p className="text-zinc-500">Category: {product.category}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={isDeleting}
            onClick={onConfirm}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};
