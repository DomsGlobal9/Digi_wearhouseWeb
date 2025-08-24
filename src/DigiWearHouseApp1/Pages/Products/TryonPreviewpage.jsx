import React, { useState } from 'react';
import { ArrowLeft, Package, Edit } from 'lucide-react';
import { useApp } from '../../context/Context'; // Adjust import path as needed

export default function TryonPreview() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { productData } = useApp();

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
      const response = await fetch("http://localhost:5000/api/tryon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const ProductOverviewPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-gray-800 font-medium">Product Overview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Product Info Card */}
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
              <h3 className="text-gray-700 font-medium mb-4">Inventory by color</h3>
              <div className="space-y-3">
                {productData.selectedColors && productData.selectedColors.length > 0 ? (
                  productData.selectedColors.map((colorCode) => {
                    const colorMap = {
                      'red': { name: 'Red', bg: 'bg-red-500' },
                      'pink': { name: 'Pink', bg: 'bg-pink-500' },
                      'blue': { name: 'Blue', bg: 'bg-blue-500' },
                      'green': { name: 'Green', bg: 'bg-green-500' },
                      'orange': { name: 'Orange', bg: 'bg-orange-500' },
                      'purple': { name: 'Purple', bg: 'bg-purple-500' },
                      'black': { name: 'Black', bg: 'bg-black' }
                    };
                    const color = colorMap[colorCode] || { name: colorCode, bg: 'bg-gray-500' };
                    
                    return (
                      <div key={colorCode} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${color.bg} mr-3`}></div>
                          <span className="text-sm text-gray-700">{color.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">0 pcs</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
                      <span className="text-sm text-gray-700">No colors selected</span>
                    </div>
                    <span className="text-sm text-gray-500">0 pcs</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                $ {productData.price || '0'}
              </div>
              <div className="text-sm text-gray-500">Base Price</div>
            </div>

            {/* Units Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {Object.values(productData.units || {}).reduce((sum, val) => sum + val, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Units</div>
            </div>

            {/* Variants & Inventory Card */}
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
                    {productData.price ? `$${productData.price}` : '0'}
                  </div>
                  <div className="text-xs text-gray-500">Est. Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <span className="text-green-800 font-medium">Ready to Publish</span>
            </div>
            <p className="text-sm text-green-700 mt-1">This product will be live and available for customers to purchase.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsPreviewMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductPreviewPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
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
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <Edit className="w-4 h-4 mr-1" />
            <span className="text-sm">Edit</span>
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">Click on garment images to see try-on results</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Stats */}
          <div className="space-y-6">
            {/* Total Products Cards */}
            <div className="space-y-4">
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
                    ${productData.price || '0'}
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
          </div>

          {/* Right Column - Product Images */}
<div className="min-h-screen bg-gray-50 p-4 md:p-6">
    <div className="max-w-6xl mx-auto">
      

      <div className="">
        {/* Left Column - Product Stats (1/3 width) */}
       

        {/* Right Section - Model Image + Thumbnails (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex gap-4">
              {/* Large Model Image */}
              <div className="flex-1">
                <div className="rounded-lg overflow-hidden  aspect-[3/4] relative">
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
                  // Display placeholder thumbnails
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
      </div>
      </div>

        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return isPreviewMode ? <ProductPreviewPage /> : <ProductOverviewPage />;
}





//  <div className="space-y-4">
//           {/* Product Details Card */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center mb-4">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                 <Package className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-gray-700 font-medium">Total Products</span>
//             </div>
            
//             <div className="space-y-2">
//               <div className="text-3xl font-bold text-gray-900">0</div>
//               <div className="text-sm text-gray-500">Total Units</div>
//               <div className="text-xs text-blue-600">
//                 {productData.title || 'Dress 1'}
//               </div>
//             </div>
//           </div>

//           {/* Pricing & Inventory Card */}
//           <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
//             <div className="flex items-center mb-4">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                 <Package className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-gray-700 font-medium">Total Products</span>
//             </div>
            
//             <div className="space-y-2">
//               <div className="text-3xl font-bold text-gray-900">0</div>
//               <div className="text-sm text-gray-500">Total Units</div>
//               <div className="text-xs text-blue-600">
//                 {productData.title || 'Dress 1'}
//               </div>
//             </div>
//           </div>
//         </div>









    





// {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <button 
//             onClick={() => setIsPreviewMode(false)}
//             className="flex items-center text-gray-600 hover:text-gray-800"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             <span className="font-medium">Product Preview</span>
//           </button>
//         </div>
//         <button className="flex items-center text-gray-600 hover:text-gray-800">
//           <Edit className="w-4 h-4 mr-1" />
//           <span className="text-sm">Edit</span>
//         </button>
//       </div>

//       <p className="text-gray-600 text-sm mb-6">Look at the products to view</p>