import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-warm-gray">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`block w-full rounded-md border text-sm transition-colors duration-150 placeholder:text-warm-gray/60 focus:outline-none focus:ring-1 ${
              leftIcon ? 'pl-9' : 'pl-3.5'
            } ${rightIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
              error
                ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500'
                : 'border-brand-border bg-white text-brand-dark focus:border-brand-brown focus:ring-brand-brown'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-warm-gray">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-warm-gray">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
