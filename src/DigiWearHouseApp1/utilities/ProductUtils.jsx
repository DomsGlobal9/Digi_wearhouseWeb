import React from "react";

export const productUtils = {
  isSareeProduct: (productData) => {
    const dressType = productData?.dressType?.toLowerCase() || '';
    return dressType.includes('saree') || dressType.includes('sari');
  },

  getSareeImages: (productData) => {
    if (!productData.sareeParts) return [];
    
    const sareeImages = [];
    
    if (productData.generatedSareeImage) {
      sareeImages.push({
        url: productData.generatedSareeImage,
        type: 'generated',
        name: 'complete_saree',
        label: 'Complete Saree'
      });
    }

    Object.entries(productData.sareeParts).forEach(([partName, partData]) => {
      if (partData.preview || partData.url) {
        sareeImages.push({
          url: partData.preview || partData.url,
          type: 'part',
          name: partName,
          label: partName.charAt(0).toUpperCase() + partName.slice(1)
        });
      }
    });
    
    return sareeImages;
  },

  getDisplayImages: (productData) => {
    if (productUtils.isSareeProduct(productData)) {
      return productUtils.getSareeImages(productData);
    }
    return productData.imageUrls?.map((url, index) => ({
      url,
      type: 'regular',
      name: `image_${index}`,
      label: `Image ${index + 1}`
    })) || [];
  },

  calculateTotalUnits: (units, selectedSizes, selectedColors) => {
    if (!units || !selectedSizes || !selectedColors || selectedColors.length === 0) return 0;
    let total = 0;
    selectedColors.forEach((color) => {
      if (units[color]) {
        selectedSizes.forEach((size) => {
          if (units[color][size]) {
            total += parseInt(units[color][size]) || 0;
          }
        });
      }
    });
    return total;
  },

  getColorDisplayName: (colorCode) => {
    if (colorCode.includes('_')) {
      const [baseName] = colorCode.split('_');
      return baseName.charAt(0).toUpperCase() + baseName.slice(1) + ' Shade';
    }
    return colorCode.charAt(0).toUpperCase() + colorCode.slice(1);
  }
};

export const getColorConfig = (colorCode) => {
  const colorMap = {
    red: { name: "Red", bg: "bg-red-500" },
    pink: { name: "Pink", bg: "bg-pink-500" },
    blue: { name: "Blue", bg: "bg-blue-500" },
    green: { name: "Green", bg: "bg-green-500" },
    orange: { name: "Orange", bg: "bg-orange-500" },
    purple: { name: "Purple", bg: "bg-purple-500" },
    black: { name: "Black", bg: "bg-black" },
  };
  
  const baseColor = colorCode.split('_')[0].toLowerCase();
  return colorMap[baseColor] || {
    name: productUtils.getColorDisplayName(colorCode),
    bg: "bg-gray-500",
  };
};

export const STATIC_MODEL_IMAGE = "https://res.cloudinary.com/doiezptnn/image/upload/v1754996630/qgxzm85zvkchgssliiww.png";
