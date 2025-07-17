import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded text-white font-medium transition";
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700",
      outline: "border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
