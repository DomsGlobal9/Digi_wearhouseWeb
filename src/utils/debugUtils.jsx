// utils/debugUtils.js
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Test Firebase connection
export const testConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firebase connection successful');
    console.log('Collections accessible:', snapshot.docs.length);
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return { success: false, error: error.message };
  }
};

// Test minimal document creation
export const testMinimalSave = async () => {
  try {
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: 'Test document'
    };
    
    const docRef = await addDoc(collection(db, 'test'), testDoc);
    console.log('✅ Test document saved with ID:', docRef.id);
    return { success: true, documentId: docRef.id };
  } catch (error) {
    console.error('❌ Test document failed:', error);
    return { success: false, error: error.message };
  }
};

// Debug product save with enhanced logging
export const debugSaveProduct = async (formData, imageFiles = null) => {
  console.log('=== FIREBASE SAVE DEBUG ===');
  console.log('1. Input data:', formData);
  console.log('2. Image files:', imageFiles);
  
  try {
    // Check if db is properly initialized
    if (!db) {
      throw new Error('Firestore database not initialized');
    }
    console.log('✅ Database connection exists');

    // Prepare data
    const productData = {
      title: formData.title || '',
      description: formData.description || '',
      category: formData.chooseType || '',
      productType: formData.productType || 'Ready to Wear',
      dressType: formData.dressType || '',
      material: formData.materialType || '',
      design: formData.designType || '',
      price: formData.price || '0',
      selectedSizes: formData.selectedSizes || [],
      selectedColors: formData.selectedColors || [],
      units: formData.units || {},
      imageUrls: formData.images || [],
      timestamp: new Date(), // Use regular Date instead of serverTimestamp for debugging
      userId: '',
      status: 'active',
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('3. Formatted product data:', productData);

    // Try to save
    const productsCollection = collection(db, 'products');
    console.log('4. Collection reference created');

    const docRef = await addDoc(productsCollection, productData);
    console.log('✅ Document successfully written with ID:', docRef.id);
    
    return {
      success: true,
      productId: docRef.id,
      message: 'Product saved successfully!'
    };

  } catch (error) {
    console.error('❌ Error saving product:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Common error solutions
    if (error.code === 'permission-denied') {
      console.error('🔧 SOLUTION: Check Firestore security rules');
    }
    if (error.code === 'unavailable') {
      console.error('🔧 SOLUTION: Check internet connection and Firebase project status');
    }
    if (error.message.includes('Firebase App named')) {
      console.error('🔧 SOLUTION: Check Firebase initialization in firebaseConfig.js');
    }
    
    throw error;
  }
};

// Expose functions globally for console testing
if (typeof window !== 'undefined') {
  window.testConnection = testConnection;
  window.testMinimalSave = testMinimalSave;
  window.debugSaveProduct = debugSaveProduct;
}