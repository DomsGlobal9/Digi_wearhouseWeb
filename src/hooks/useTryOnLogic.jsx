import { useState } from 'react';
import { productUtils, STATIC_MODEL_IMAGE } from '../DigiWearHouseApp1/utilities/ProductUtils';

export const useTryOnLogic = () => {
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleTryOn = async (index, imageData, productData) => {
    setSelectedImageIndex(index);
    
    let garmentImageUrl;
    
    if (imageData) {
      if (productUtils.isSareeProduct(productData) && imageData.type !== 'generated') {
        console.log("Try-on only available for complete saree");
        return;
      }
      garmentImageUrl = imageData.url;
    } else if (productData.imageUrls && productData.imageUrls[index]) {
      garmentImageUrl = productData.imageUrls[index];
    } else {
      console.log("No garment image available");
      return;
    }
    
    setIsProcessing(true);
    setTryOnResult(null);
    
    try {
      const response = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelImage: STATIC_MODEL_IMAGE,
          garmentImage: garmentImageUrl,
        }),
      });
      
      if (!response.ok) throw new Error(`Backend error: ${response.status}`);
      
      const data = await response.json();
      if (data.output && data.output.length > 0) {
        setTryOnResult(data.output[0]);
      } else {
        console.error("No output received from try-on API");
        alert("Try-on failed. Please try again.");
      }
    } catch (error) {
      console.error("Try-on failed:", error);
      alert(`Try-on failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    tryOnResult,
    setTryOnResult,
    isProcessing,
    selectedImageIndex,
    handleTryOn
  };
};
