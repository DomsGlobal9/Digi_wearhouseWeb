import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/Context';
import AddProductForm from './AddProductForm';
import EmptyProductsState from './EmptyProductsState';

const UploadProducts = () => {
  const { productData } = useApp(); 
  const location = useLocation();
  
  const [showAddForm, setShowAddForm] = useState(() => {
    return location.state?.inAddFlow === true || 
           (productData && Object.keys(productData).length > 0);
  });
  
  const [hasProducts] = useState(false);

  const handleAddProduct = () => setShowAddForm(true);
  const handleBackToProducts = () => setShowAddForm(false);

  if (showAddForm) {
    return <AddProductForm onBack={handleBackToProducts} />;
  }

  if (!hasProducts) {
    return <EmptyProductsState onAddProduct={handleAddProduct} />;
  }

  return <div>Products List View</div>;
};

export default UploadProducts;
