import React from 'react';

const BackButton = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors p-2 ${className}`}
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

export default BackButton;