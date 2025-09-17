import React from 'react';
import { productUtils } from '../../utilities/ProductUtils';

export const StatsCard = ({ productData }) => {
  const isSaree = productUtils.isSareeProduct(productData);
  const displayImages = productUtils.getDisplayImages(productData);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {isSaree ? 
          displayImages.length : 
          productUtils.calculateTotalUnits(productData.units, productData.selectedSizes, productData.selectedColors)
        }
      </div>
      <div className="text-sm text-gray-500">
        {isSaree ? "Total Components" : "Total Units"}
      </div>
    </div>
  );
};
