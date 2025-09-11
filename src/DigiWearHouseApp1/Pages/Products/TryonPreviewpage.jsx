import React, { useState } from 'react';
import { ArrowLeft, Package, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/Context';
import firebaseService from '../../../SERVICES/firebaseService';
import { Navigate } from 'react-router-dom';

export default function TryonPreview() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const { productData, updateProductData, currentUser } = useApp();

const TestFirebaseButton = () => {
  const runFirestoreTests = async () => {
    if (!currentUser) {
      alert('Please log in first');
      return;
    }

    console.log('Running comprehensive Firestore tests...');
    
    try {
      // Run the test function
      const testResult = await firebaseService.testFirestoreConnection(currentUser.uid);
      
      if (testResult.success) {
        console.log('All tests passed!', testResult);
        alert('All Firestore tests passed! Check console for details.');
      } else {
        console.error('Tests failed:', testResult);
        alert('Tests failed: ' + testResult.error);
      }
      
    } catch (error) {
      console.error('Test execution failed:', error);
      alert('Test execution failed: ' + error.message);
    }
  };

  return (
    <button 
      onClick={runFirestoreTests}
      className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors z-50"
    >
      Test Firestore
    </button>
  );
};

  // Static model image URL
  const staticModelImage = "https://res.cloudinary.com/doiezptnn/image/upload/v1754996630/qgxzm85zvkchgssliiww.png";

  // Function to perform try-on when thumbnail is clicked
  const handleThumbnailClick = async (index) => {
    setSelectedImageIndex(index);
    
    if (!productData.images || !productData.images[index]) {
      console.log('No garment image available');
      return;
    }

    setIsProcessing(true);
    setTryOnResult(null);

    try {
const response = await fetch("/api/tryon", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    modelImage: staticModelImage,
    garmentImage: productData.images[index],
  }),
});

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

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

  // Handle product submission to Firebase
  const handleSubmitProduct = async () => {
    // Validation
    if (!productData.title || productData.title.trim() === '') {
      setSubmitStatus('error');
      setSubmitMessage('Product title is required');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    if (!productData.price || productData.price === '0') {
      setSubmitStatus('error');
      setSubmitMessage('Product price is required');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    // if (!productData.images || productData.images.length === 0) {
    //   setSubmitStatus('error');
    //   setSubmitMessage('At least one product image is required');
    //   setTimeout(() => setSubmitStatus(null), 5000);
    //   return;
    // }

    if (!currentUser) {
      setSubmitStatus('error');
      setSubmitMessage('User not authenticated. Please log in again.');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting product for user:', currentUser.uid);
      console.log('Product data:', productData);
      
      // Save product to user's subcollection
      const result = await firebaseService.saveProduct(productData, currentUser.uid);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(`Product saved successfully! ID: ${result.productId}`);
        
        // Update context with the product ID
        updateProductData({
          ...productData,
          id: result.productId
        });
        
        console.log('Product saved successfully:', result);
        
      } else {
        throw new Error(result.message || 'Failed to save product');
      }
      
    } catch (error) {
      console.error('Error submitting product:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, submitStatus === 'success' ? 10000 : 5000);
    }
  };


  const calculateTotalUnits = (units) => {
    if (!units) return 0;

    let total = 0;

    Object.values(units).forEach((val) => {
      if (typeof val === "object" && val !== null) {
        // Nested structure: color -> { size: quantity }
        Object.values(val).forEach((qty) => {
          total += parseInt(qty) || 0;
        });
      } else {
        // Direct structure: size -> quantity
        total += parseInt(val) || 0;
      }
    });

    return total;
  };

  // Submit Status Component
  const SubmitStatusAlert = () => {
    if (!submitStatus) return null;

    return (
      <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border ${
        submitStatus === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        <div className="flex items-center">
          {submitStatus === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
          )}
          <div>
            <div className="font-medium">
              {submitStatus === 'success' ? 'Success!' : 'Error'}
            </div>
            <div className="text-sm mt-1">{submitMessage}</div>
          </div>
        </div>
      </div>
    );
  };

  const ProductOverviewPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <SubmitStatusAlert />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft  className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-gray-800 font-medium">Product Overview</span>
          {currentUser && (
            <span className="ml-auto text-sm text-gray-500">
              User: {currentUser.email}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Package className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-700 font-medium">Product Overview</span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {productData.title || 'Untitled Product'}
              </h2>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{productData.chooseType || 'No Category'}</p>
                <p className="text-sm text-gray-600">{productData.dressType || 'No Category'}</p>
                <p className="text-sm text-gray-600">{productData.materialType || 'No Material'}</p>
                <p className="text-sm text-gray-600">{productData.designType || 'No Design'}</p>
              </div>
              
              {productData.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description:</h3>
                  <p className="text-sm text-gray-600">{productData.description}</p>
                </div>
              )}
            </div>

            {/* Inventory by Color Card */}
<div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-700 font-medium mb-4">
                Inventory by color
              </h3>
              <div className="space-y-3">
                {productData.selectedColors &&
                productData.selectedColors.length > 0 ? (
                  productData.selectedColors.map((colorCode) => {
                    // Extract color name by splitting at '_' and taking the first part
                    const colorName = colorCode.split("_")[0];
                    const colorMap = {
                      red: { name: "Red", bg: "bg-red-500" },
                      pink: { name: "Pink", bg: "bg-pink-500" },
                      blue: { name: "Blue", bg: "bg-blue-500" },
                      green: { name: "Green", bg: "bg-green-500" },
                      orange: { name: "Orange", bg: "bg-orange-500" },
                      purple: { name: "Purple", bg: "bg-purple-500" },
                      black: { name: "Black", bg: "bg-black" },
                    };
                    const color = colorMap[colorName.toLowerCase()] || {
                      name:
                        colorName.charAt(0).toUpperCase() + colorName.slice(1),
                      bg: "bg-gray-500",
                    };

                    const totalUnits = productData.units[colorCode]
                      ? Object.values(productData.units[colorCode]).reduce(
                          (sum, quantity) => {
                            const num = parseInt(quantity, 10);
                            return sum + (isNaN(num) ? 0 : num);
                          },
                          0
                        )
                      : 0;

                    return (
                      <div
                        key={colorCode}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${color.bg} mr-3`}
                          ></div>
                          <span className="text-sm text-gray-700">
                            {color.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {totalUnits} pcs
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
                      <span className="text-sm text-gray-700">
                        No colors selected
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">0 pcs</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹ {productData.price || '0'}
              </div>
              <div className="text-sm text-gray-500">Base Price</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
  <div className="text-3xl font-bold text-gray-900 mb-1">
    {calculateTotalUnits(productData.units)}
  </div>
  <div className="text-sm text-gray-500">Total Units</div>
</div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 text-blue-500 mr-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Variants & Inventory</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Sizes</label>
                  <div className="flex flex-wrap gap-1">
                    {productData.selectedSizes && productData.selectedSizes.length > 0 ? (
                      productData.selectedSizes.map((size) => (
                        <button key={size} className="px-2 py-1 text-xs border border-gray-300 rounded">
                          {size}
                        </button>
                      ))
                    ) : (
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-500">
                        No sizes
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Colors</label>
                  <div className="flex flex-wrap gap-1">
                    {productData.selectedColors && productData.selectedColors.length > 0 ? (
                      productData.selectedColors.map((colorCode) => (
                        <div key={colorCode} className="px-2 py-1 text-xs border border-gray-300 rounded capitalize">
                          {colorCode}
                        </div>
                      ))
                    ) : (
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-500">
                        No colors
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(productData.selectedSizes?.length || 0) * (productData.selectedColors?.length || 1)}
                  </div>
                  <div className="text-xs text-gray-500">Total Variants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {productData.images?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Images</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {productData.price ? `₹${productData.price}` : '0'}
                  </div>
                  <div className="text-xs text-gray-500">Est. Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Section */}
        <div className="mt-8 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <span className="text-green-800 font-medium">Ready to Publish</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              This product will be saved to your account and can be made live for customers to purchase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsPreviewMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              disabled={isSubmitting}
            >
              Preview
            </button>
            <button 
              onClick={handleSubmitProduct}
              disabled={isSubmitting || !currentUser}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting || !currentUser
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Product'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductPreviewPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <SubmitStatusAlert />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Product Preview</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <span className="text-sm text-gray-500">
                User: {currentUser.email}
              </span>
            )}
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <Edit className="w-4 h-4 mr-1" />
              <span className="text-sm">Edit</span>
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">Click on garment images to see try-on results</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Product Details</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-lg font-semibold text-gray-900">
                  {productData.title || 'Untitled Product'}
                </div>
                <div className="text-sm text-gray-600">{productData.chooseType || 'No Category'}</div>
                <div className="text-sm text-gray-600">{productData.dressType || 'No Type'}</div>
                <div className="text-sm text-gray-600">{productData.materialType || 'No Material'}</div>
                <div className="text-sm text-gray-600">
                  Type: {productData.productType || 'Ready to Wear'}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Pricing & Inventory</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{productData.price || '0'}
                </div>
                <div className="text-sm text-gray-500">Base Price</div>
                <div className="text-sm text-blue-600">
                  Available Sizes: {productData.selectedSizes?.join(', ') || 'None'}
                </div>
                <div className="text-sm text-blue-600">
                  Available Colors: {productData.selectedColors?.join(', ') || 'None'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Model Image + Thumbnails */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex gap-4">
                {/* Large Model Image */}
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden aspect-[3/4] relative">
                    {isProcessing ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
                        <div className="font-medium text-white">Processing Try-On...</div>
                      </div>
                    ) : tryOnResult ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={tryOnResult} 
                          alt="Try-on Result" 
                          className="w-full h-full object-cover object-top" 
                        />
                        <button 
                          onClick={() => setTryOnResult(null)}
                          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs hover:bg-opacity-70 transition-opacity"
                        >
                          Reset
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <img 
                          src={staticModelImage} 
                          alt="Model" 
                          className="w-full h-full object-cover object-top" 
                        />
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="text-white font-medium">Front view</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Images - Vertical Stack */}
                <div className="w-20 space-y-3">
                  {productData.images && productData.images.length > 0 ? (
                    productData.images.map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        disabled={isProcessing}
                        className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))
                  ) : (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-full aspect-square bg-pink-300 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">👗</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button 
            onClick={handleSubmitProduct}
            disabled={isSubmitting || !currentUser}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting || !currentUser
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving to Firebase...
              </div>
            ) : (
              'Submit Product'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
  <div>
    {/* <TestFirebaseButton  /> */}
    {isPreviewMode ? <ProductPreviewPage /> : <ProductOverviewPage />}
  </div>
);


  // return isPreviewMode ? <ProductPreviewPage /> : <ProductOverviewPage />;
}
