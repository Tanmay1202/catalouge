import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-md gap-2',
      lg: 'text-base px-6 py-3.5 rounded-md gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-brand-brown text-white hover:bg-brand-dark focus:ring-brand-gold active:scale-[0.99] shadow-sm',
      secondary:
        'bg-ivory text-brand-dark hover:bg-ivory/80 border border-brand-border focus:ring-brand-gold',
      outline:
        'bg-transparent text-brand-brown hover:bg-ivory/50 border border-brand-brown focus:ring-brand-gold',
      ghost:
        'bg-transparent text-brand-dark hover:bg-ivory/60 focus:ring-brand-gold',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
