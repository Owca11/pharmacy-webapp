import React from "react";

/**
 * Props for the Button component.
 */
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Reusable Button component.
 * @param {ButtonProps} props - The props for the button.
 * @returns {React.FC<ButtonProps>} The Button component.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  size = "md",
  fullWidth = false,
  disabled = false,
}) => {
  const sizeStyles = {
    sm: {
      padding: "8px 16px",
      fontSize: "0.875rem",
    },
    md: {
      padding: "12px 24px",
      fontSize: "1rem",
    },
    lg: {
      padding: "16px 32px",
      fontSize: "1.125rem",
    },
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: "8px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    border: "none",
    width: fullWidth ? "100%" : "auto",
    ...sizeStyles[size],
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? "#ffb6c1" : "#ff69b4",
      color: "white",
      boxShadow: disabled ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: disabled ? "#ffb6c1" : "#ff4785",
      },
    },
    secondary: {
      backgroundColor: disabled ? "#f3e8ff" : "#f3e8ff",
      color: "#831843",
      "&:hover": {
        backgroundColor: disabled ? "#f3e8ff" : "#e9d5ff",
      },
    },
    outline: {
      backgroundColor: "transparent",
      color: disabled ? "#f9a8d4" : "#ff69b4",
      border: "2px solid currentColor",
      "&:hover": {
        color: disabled ? "#f9a8d4" : "#ff4785",
      },
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <button
      style={combinedStyles}
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
