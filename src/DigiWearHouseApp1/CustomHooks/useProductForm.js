// hooks/useProductForm.js
import { useState, useCallback } from 'react';
import { INITIAL_FORM_DATA } from '../constants/productConstants';

export const useProductForm = (initialData = null) => {
  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM_DATA,
    ...(initialData || {})
  }));

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateMultipleFields = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  return {
    formData,
    updateField,
    updateMultipleFields,
    resetForm
  };
};

