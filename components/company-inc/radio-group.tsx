import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import SimpleToolTip from './simple-tooltip';

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  scrollRef?: boolean;
  helpText?: string;
  helpTextPosition?: 'top' | 'bottom';
  descriptionTooltip?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  scrollRef = false,
  helpText,
  helpTextPosition = 'bottom',
  descriptionTooltip,
}) => {
  const groupId = `radio-${name}`;

  return (
    <div className="mb-4" role="radiogroup" aria-labelledby={`${groupId}-label`}>
      {/* Label and optional tooltip */}
      <div className="flex items-center justify-between mb-1">
        <SimpleToolTip tooltip={descriptionTooltip}>
          <div className="flex items-center gap-1">
            <label id={`${groupId}-label`} className="text-sm font-medium text-text">
              {label}
            </label>
            {descriptionTooltip && <BsFillInfoCircleFill className="text-gray-300" size={14} />}
          </div>
        </SimpleToolTip>

        {helpText && helpTextPosition === 'top' && !error && (
          <span className="text-xs text-gray-500">{helpText}</span>
        )}
      </div>

      {/* Radio options */}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <label key={option.value} htmlFor={optionId} className="flex items-center space-x-2">
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="text-blue-500 focus:ring-blue-500"
                aria-invalid={!!error}
                aria-describedby={error ? `${groupId}-error` : undefined}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <p
          id={`${groupId}-error`}
          className="text-red-500 text-xs mt-1"
          role="alert"
          data-error-for={name}
          data-scroll-ref={scrollRef ? 'true' : undefined}
        >
          {error}
        </p>
      )}

      {/* Bottom help text */}
      {helpText && !error && helpTextPosition === 'bottom' && (
        <p id={`${groupId}-help`} className="text-xs text-gray-500 mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};
