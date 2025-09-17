import React from 'react';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  error = null,
  className = ""
}) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm md:text-base font-medium text-gray-700">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white ${
        error ? 'border-red-500' : 'border-gray-200'
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default FormSelect;
