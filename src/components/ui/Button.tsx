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
        'bg-[#C47A53] text-white hover:bg-[#AC643F] focus:ring-[#C47A53] active:scale-[0.99] shadow-xs',
      secondary:
        'bg-white text-[#2B1A15] hover:bg-[#F7ECE4] border border-[#EBDCD2] focus:ring-[#C47A53]',
      outline:
        'bg-transparent text-[#C47A53] hover:bg-[#F7ECE4] border border-[#C47A53] focus:ring-[#C47A53]',
      ghost:
        'bg-transparent text-[#2B1A15] hover:bg-[#F7ECE4] focus:ring-[#C47A53]',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-xs',
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
