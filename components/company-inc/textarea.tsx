import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import classNames from "classnames";
import SimpleToolTip from "../simple-tooltip";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helpText?: string;
  helpTextPosition?: "top" | "bottom";
  scrollRef?: boolean;
  descriptionTooltip?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helpText,
      helpTextPosition = "bottom",
      scrollRef = false,
      descriptionTooltip,
      required,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        {/* Label + Tooltip */}
        {label && (
          <div className="flex items-center justify-between mb-1">
            <SimpleToolTip tooltip={descriptionTooltip}>
              <div className="flex items-center gap-1">
                <label htmlFor={textareaId} className="text-sm font-medium text-text">
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                {descriptionTooltip && <BsFillInfoCircleFill className="text-gray-300" size={14} />}
              </div>
            </SimpleToolTip>

            {/* Top help text or feedback */}
            {helpText && helpTextPosition === "top" && !error && (
              <span className="text-xs text-gray-500">{helpText}</span>
            )}
          </div>
        )}

        {/* Textarea Field */}
        <textarea
          id={textareaId}
          name={name}
          ref={ref}
          className={classNames(
            "w-full px-3 py-2 border rounded-md bg-white/0 outline-none transition-all text-sm",
            error ? "border-red-500" : "border-gray-300"
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helpText
              ? `${textareaId}-help`
              : undefined
          }
          {...props}
        />

        {/* Error */}
        {error && (
          <p
            id={`${textareaId}-error`}
            role="alert"
            data-error-for={name || textareaId}
            data-scroll-ref={scrollRef ? "true" : undefined}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Bottom help text */}
        {helpText && !error && helpTextPosition === "bottom" && (
          <p id={`${textareaId}-help`} className="mt-1 text-xs text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
