import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  type: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  error,
  placeholder,
  type,
  className,
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
