import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = ''
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-800">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;