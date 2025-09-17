import React from 'react';

export const PricingCard = ({ productData }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="text-3xl font-bold text-gray-900 mb-1">₹ {productData.price || "0"}</div>
    <div className="text-sm text-gray-500">Base Price</div>
  </div>
);
