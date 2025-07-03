import React from "react";

/**
 * Props for the Input component.
 */
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  label?: string;
  required?: boolean;
}

/**
 * Reusable Input component for form fields.
 * @param {InputProps} props - The props for the input.
 * @returns {React.FC<InputProps>} The Input component.
 */
const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  label,
  required = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-pink-700 text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-300 focus:border-transparent transition-all ${className}`}
      />
    </div>
  );
};

export default Input;
