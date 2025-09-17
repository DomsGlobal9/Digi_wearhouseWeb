import React from 'react';
import { Link } from 'react-router-dom';

const SizeSelector = ({ sizes, selectedSizes, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <label className="text-sm md:text-base font-medium text-gray-700">
        Select Sizes
      </label>
      <Link to="/size-chart">
        <button className="text-blue-500 text-sm hover:text-blue-600">
          Size chart ?
        </button>
      </Link>
    </div>
    
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => {
            if (selectedSizes.includes(size)) {
              onChange(selectedSizes.filter((s) => s !== size));
            } else {
              onChange([...selectedSizes, size]);
            }
          }}
          className={`w-12 h-12 rounded-lg font-medium transition-colors ${
            selectedSizes.includes(size)
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
    
    <p className="text-xs text-gray-500">You can select multiple sizes</p>
  </div>
);

export default SizeSelector;
