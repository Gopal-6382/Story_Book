// src/components/InputField/InputField.tsx
import React, { useState, forwardRef, useId, useCallback, useEffect } from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import type { InputFieldProps } from '../../types';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = '',
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      showClearButton = false,
      loading = false,
      className = '',
      id: propId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const helpTextId = `${id}-help`;

    const [inputType, setInputType] = useState(type);
    const [internalValue, setInternalValue] = useState(value);
    const isPassword = type === 'password';
    const showToggle = isPassword && !disabled;
    const canClear = showClearButton && internalValue && !disabled;

    // Sync internal value with external value changes
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleClear = useCallback(() => {
      setInternalValue('');
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }, [onChange]);

    const togglePasswordVisibility = useCallback(() => {
      setInputType(prevType => prevType === 'password' ? 'text' : 'password');
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    }, [onChange]);

    const variantStyles = {
      filled: clsx(
        'bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500',
        invalid && 'bg-red-50 focus:bg-red-50 focus:ring-red-500',
        disabled && 'bg-gray-100'
      ),
      outlined: clsx(
        'bg-white border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
        invalid && 'border-red-500 focus:ring-red-500 focus:border-red-500',
        disabled && 'bg-gray-100'
      ),
      ghost: clsx(
        'bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-500 rounded-none',
        invalid && 'border-red-500 focus:border-red-500',
        disabled && 'border-gray-200'
      ),
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    const inputClasses = clsx(
      'w-full rounded-md transition-all duration-200 outline-none',
      'placeholder-gray-400 text-gray-900',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    return (
      <div className="relative inline-block w-full">
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'block text-sm font-medium mb-1.5 transition-colors',
              disabled ? 'text-gray-400' : 'text-gray-700',
              invalid && 'text-red-600'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            value={internalValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={inputClasses}
            aria-invalid={invalid}
            aria-describedby={helpTextId}
            aria-busy={loading}
            {...props}
          />
          
          {loading && (
            <div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-label="Loading"
            >
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
          
          {showToggle && !loading && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-0.5"
              disabled={disabled}
              aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
            >
              {inputType === 'password' ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
          
          {canClear && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-0.5"
              disabled={disabled}
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <p
            id={helpTextId}
            className={clsx(
              'mt-1.5 text-sm transition-colors',
              invalid ? 'text-red-600' : 'text-gray-500',
              disabled && 'opacity-60'
            )}
            aria-live={invalid ? "assertive" : "polite"}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;