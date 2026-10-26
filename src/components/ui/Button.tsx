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
        'bg-[#D46A7E] text-white hover:bg-[#BC5568] focus:ring-[#D46A7E] active:scale-[0.99] shadow-xs',
      secondary:
        'bg-white text-zinc-800 hover:bg-zinc-50 border border-zinc-200 focus:ring-[#D46A7E]',
      outline:
        'bg-transparent text-[#D46A7E] hover:bg-rose-50/50 border border-[#D46A7E] focus:ring-[#D46A7E]',
      ghost:
        'bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400',
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
