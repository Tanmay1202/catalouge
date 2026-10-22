import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  label,
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-brand-border border-t-brand-gold animate-spin`}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <p className="text-xs text-warm-gray tracking-wide">{label}</p>}
    </div>
  );
};
