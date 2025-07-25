import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import SimpleToolTip from '../simple-tooltip';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  scrollRef?: boolean;
  helpText?: string;
  helpTextPosition?: 'top' | 'bottom';
  descriptionTooltip?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      scrollRef = false,
      helpText,
      helpTextPosition = 'bottom',
      descriptionTooltip,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || name || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        <div className="flex items-start gap-2">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${checkboxId}-error`
                : helpText
                ? `${checkboxId}-help`
                : undefined
            }
            className="mt-1 text-blue-600 focus:ring-blue-500"
            {...props}
          />
          <div className="flex flex-col">
            <SimpleToolTip tooltip={descriptionTooltip}>
              <label htmlFor={checkboxId} className="text-sm font-medium text-text flex items-center gap-1">
                {label}
                {descriptionTooltip && <BsFillInfoCircleFill className="text-gray-300" size={14} />}
              </label>
            </SimpleToolTip>

            {/* Help Text Top */}
            {helpText && helpTextPosition === 'top' && !error && (
              <p className="text-xs text-gray-500 mt-0.5">{helpText}</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${checkboxId}-error`}
            className="text-red-500 text-xs mt-1"
            role="alert"
            data-error-for={name || checkboxId}
            data-scroll-ref={scrollRef ? 'true' : undefined}
          >
            {error}
          </p>
        )}

        {/* Help Text Bottom */}
        {helpText && !error && helpTextPosition === 'bottom' && (
          <p id={`${checkboxId}-help`} className="text-xs text-gray-500 mt-1">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
