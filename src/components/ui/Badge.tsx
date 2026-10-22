import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'inactive' | 'featured' | 'neutral' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const styles = {
    active: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    inactive: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    featured: 'bg-amber-50 text-amber-900 border-amber-200/80',
    neutral: 'bg-ivory text-brand-dark border-brand-border',
    gold: 'bg-brand-gold/15 text-brand-brown border-brand-gold/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
    >
      {variant === 'active' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
      {variant === 'inactive' && (
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
      )}
      {children}
    </span>
  );
};
