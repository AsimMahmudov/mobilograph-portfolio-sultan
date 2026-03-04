// src/components/ui/Input.tsx
import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      disabled = false,
      className = "",
      ...rest  
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-[45px] px-4 py-4 rounded-[8px]   border-none  outline-none transition-all duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"
          } ${className}`}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;