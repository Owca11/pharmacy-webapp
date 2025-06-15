import React from "react";

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
  // Size styles
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

  // Base styles
  const baseStyles: React.CSSProperties = {
    borderRadius: "8px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    border: "none",
    width: fullWidth ? "100%" : "auto",
    ...sizeStyles[size],
  };

  // Variant styles
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

  // Combine all styles
  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      style={buttonStyles}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
