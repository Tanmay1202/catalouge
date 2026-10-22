import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 rounded-xl border border-dashed border-brand-border bg-ivory/30 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-ivory flex items-center justify-center text-warm-gray mb-4">
        {icon || <PackageOpen className="w-7 h-7 stroke-[1.5]" />}
      </div>
      <h3 className="font-serif text-xl font-medium text-brand-dark mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-warm-gray max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
