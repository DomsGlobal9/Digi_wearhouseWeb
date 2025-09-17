
// hooks/useImageUpload.js
import { useState } from 'react';
import { uploadMultipleFiles } from '../utilities/cloudinary';
import { UPLOAD_CONFIG } from '../constants/productConstants';

export const useImageUpload = (currentImages = [], onUpdate) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImages = async (files) => {
    const filesArray = Array.from(files);
    
    if (currentImages.length + filesArray.length > UPLOAD_CONFIG.MAX_IMAGES) {
      setError(`Maximum ${UPLOAD_CONFIG.MAX_IMAGES} images allowed`);
      return false;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls = await uploadMultipleFiles(filesArray);
      const newImageUrls = [...currentImages, ...uploadedUrls];
      onUpdate(newImageUrls);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImageUrls = currentImages.filter((_, i) => i !== index);
    onUpdate(newImageUrls);
  };

  const canUpload = !uploading && currentImages.length < UPLOAD_CONFIG.MAX_IMAGES;

  return {
    uploading,
    error,
    uploadImages,
    removeImage,
    canUpload
  };
};
