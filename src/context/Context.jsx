import React, { createContext, useContext, useState } from 'react';

export const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    productType: 'Ready to Wear',
    chooseType: '',
    dressType: '',
    materialType: '',
    designType: '',
    price: '',
    selectedSizes: ['XS'],
    selectedColors: [],
    units: {
      S: 22,
      M: 22,
      L: 22
    },
    images: []
  });

  const updateProductData = (data) => {
    setProductData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <ProductContext.Provider value={{ productData, updateProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

