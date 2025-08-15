import React from 'react';

interface InputProps {
  type?: 'text' | 'range' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  onKeyPress,
  placeholder,
  min,
  max,
  className = ''
}) => {
  const baseClasses = type === 'range' 
    ? "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
    : type === 'number'
    ? "bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    : "bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      min={min}
      max={max}
      className={`${baseClasses} ${className}`}
    />
  );
};

export default Input;