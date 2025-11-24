import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Specific requirements: Gold Default -> Dark Gold Hover -> Black Active
  const variants = {
    primary: "bg-lux-gold text-lux-black hover:bg-lux-goldDark hover:scale-[1.02] active:bg-lux-black active:text-white active:scale-95 shadow-sm",
    secondary: "bg-lux-black text-white hover:bg-lux-dark hover:scale-[1.02] active:bg-white active:text-lux-black active:border active:border-lux-black active:scale-95",
    outline: "border border-lux-black text-lux-black hover:bg-lux-black hover:text-white hover:scale-[1.02] active:bg-lux-gold active:text-lux-black active:border-lux-gold active:scale-95",
    ghost: "text-lux-black hover:bg-lux-offWhite hover:text-lux-goldDark active:scale-95"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;