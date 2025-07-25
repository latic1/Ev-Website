import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import SimpleToolTip from './simple-tooltip';
import { cn } from '@/lib/utils';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  helpText?: string;
  helpTextPosition?: 'top' | 'bottom';
  scrollRef?: boolean;
  descriptionTooltip?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      helpText,
      helpTextPosition = 'bottom',
      scrollRef = false,
      descriptionTooltip,
      required,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const selectId = id || name || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        {/* Label and tooltip */}
        {label && (
          <div className="flex items-center justify-between mb-1">
            <SimpleToolTip tooltip={descriptionTooltip}>
              <div className="flex items-center gap-1">
                <label htmlFor={selectId} className="text-sm font-medium text-text">
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                {descriptionTooltip && (
                  <BsFillInfoCircleFill className="text-gray-300" size={14} />
                )}
              </div>
            </SimpleToolTip>

            {/* Top help text */}
            {helpText && helpTextPosition === 'top' && !error && (
              <span className="text-xs text-gray-500">{helpText}</span>
            )}
          </div>
        )}

        {/* Select element */}
        <select
          ref={ref}
          id={selectId}
          name={name}
          className={cn(
            'w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm transition-all outline-none',
            error ? 'border-red-500' : 'border-gray-300'
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Error message */}
        {error && (
          <p
            id={`${selectId}-error`}
            className="text-red-500 text-xs mt-1"
            role="alert"
            data-error-for={name || selectId}
            data-scroll-ref={scrollRef ? 'true' : undefined}
          >
            {error}
          </p>
        )}

        {/* Bottom help text */}
        {helpText && helpTextPosition === 'bottom' && !error && (
          <p id={`${selectId}-help`} className="text-xs text-gray-500 mt-1">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
