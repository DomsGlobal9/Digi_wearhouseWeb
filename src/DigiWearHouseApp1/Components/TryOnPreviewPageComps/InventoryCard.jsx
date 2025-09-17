import React from 'react';
import { productUtils, getColorConfig } from '../../utilities/ProductUtils';

export const InventoryCard = ({ productData }) => {
  const isSaree = productUtils.isSareeProduct(productData);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-gray-700 font-medium mb-4">Inventory by color</h3>
      <div className="space-y-3">
        {productData.selectedColors?.length > 0 ? (
          productData.selectedColors.map((colorCode) => {
            const color = getColorConfig(colorCode);
            const unitCount = isSaree ? 
              (productData.units && productData.units[colorCode] ? 
                Object.values(productData.units[colorCode]).reduce((sum, qty) => sum + (parseInt(qty) || 0), 0) : 
                1
              ) :
              (productData.units[colorCode] ? 
                Object.values(productData.units[colorCode]).reduce((sum, qty) => sum + (parseInt(qty) || 0), 0) : 
                0
              );
              
            return (
              <div key={colorCode} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${color.bg} mr-3`}></div>
                  <span className="text-sm text-gray-700">{color.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {unitCount} {isSaree ? 'sets' : 'pcs'}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
              <span className="text-sm text-gray-700">No colors selected</span>
            </div>
            <span className="text-sm text-gray-500">0 {isSaree ? 'sets' : 'pcs'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
