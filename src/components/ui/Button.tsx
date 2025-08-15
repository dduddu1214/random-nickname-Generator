import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  icon: Icon, 
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm";
  const variantClasses = {
    primary: "bg-white/20 hover:bg-white/30 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;