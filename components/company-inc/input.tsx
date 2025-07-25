import React, { forwardRef } from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { capitalizeFirstLetter, classNames } from "@/util";
import SimpleToolTip from '../simple-tooltip';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  scrollRef?: boolean;
  noLabel?: boolean;
  descriptionTooltip?: string;
  showFeedback?: boolean;
  helpTextPosition?: 'top' | 'bottom';
  meta?: {
    error?: string;
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      scrollRef = false,
      noLabel,
      descriptionTooltip,
      showFeedback,
      helpText,
      helpTextPosition = 'bottom',
      meta = {},
      ...props
    },
    ref
  ) => {
    const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4 w-full">
        {/* Label and Tooltip */}
        {!noLabel && (
          <div className="flex justify-between items-center mb-1">
            <SimpleToolTip tooltip={descriptionTooltip}>
              <div className="flex flex-row items-center gap-1">
                <label htmlFor={id} className="text-sm font-medium text-text">
                  {label}
                  {props.required && <span className="text-red-500"> *</span>}
                </label>
                {descriptionTooltip && (
                  <BsFillInfoCircleFill className="text-gray-300" size={14} />
                )}
              </div>
            </SimpleToolTip>

            {/* Top Help Text / Feedback */}
            {showFeedback && helpTextPosition === 'top' && (
              <div
                id={`${id}-feedback`}
                aria-live="polite"
                className={classNames(
                  'text-xs font-normal',
                  meta.error ? 'text-rose-500' : 'text-green-400'
                )}
              >
                {meta.error ? capitalizeFirstLetter(meta.error ?? '') : '✓'}
              </div>
            )}
          </div>
        )}

        {/* Input Field */}
        <input
          id={id}
          ref={ref}
          className={classNames(
            'w-full border rounded-md bg-white/0 p-3 text-sm transition-all outline-none',
            error ? 'border-red-500' : 'border-gray-200'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p
            id={`${id}-error`}
            className="text-red-500 text-xs mt-1"
            data-error-for={props.name || id}
            data-scroll-ref={scrollRef ? 'true' : undefined}
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Bottom Help Text */}
        {helpText && helpTextPosition === 'bottom' && (
          <div
            className="text-xs text-text-500 line-clamp-3 mt-1"
            id={`${id}-help`}
            tabIndex={-1}
          >
            {helpText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
