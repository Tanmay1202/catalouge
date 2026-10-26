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
        className={`${sizes[size]} rounded-full border-[#EBDCD2] border-t-[#C47A53] animate-spin`}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <p className="text-xs text-[#7D6B63] tracking-wide">{label}</p>}
    </div>
  );
};
