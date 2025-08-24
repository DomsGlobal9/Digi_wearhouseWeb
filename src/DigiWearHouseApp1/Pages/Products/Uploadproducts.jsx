import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/Context'; // Adjust import path as needed

// Model - Data layer
const ProductDataModel = {
  // Static data - replace with API calls later
  getProducts: () => [],
  
  getDressTypes: () => [
    'Traditional Lehenga',
    'Designer Saree',
    'Cotton Kurti',
    'Silk Dress',
    'Party Wear',
    'Casual Wear'
  ],
  
  getMaterialTypes: () => [
    'Cotton',
    'Silk',
    'Georgette',
    'Chiffon',
    'Net',
    'Velvet'
  ],
  
  getDesignTypes: () => [
    'Embroidered',
    'Printed',
    'Plain',
    'Sequined',
    'Beaded',
    'Mirror Work'
  ],
  
  getColors: () => [
    { name: 'Red', value: '#ef4444', code: 'red' },
    { name: 'Pink', value: '#ec4899', code: 'pink' },
    { name: 'Blue', value: '#3b82f6', code: 'blue' },
    { name: 'Green', value: '#10b981', code: 'green' },
    { name: 'Orange', value: '#f97316', code: 'orange' },
    { name: 'Purple', value: '#8b5cf6', code: 'purple' },
    { name: 'Black', value: '#1f2937', code: 'black' }
  ],
  
  getSizes: () => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  
  getFormData: () => ({
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
  })
};

// View Components
const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors p-2"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const EmptyProductsState = ({ onAddProduct }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header */}
    <div className="flex items-center p-4 md:p-6">
      <BackButton onClick={() => window.history.back()} />
    </div>
    
    {/* Main Content */}
    <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
      <div className="text-center max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">Your Products</h1>
        <p className="text-gray-700 text-base md:text-lg mb-12">
          Looks like you don't have any products yet!
        </p>
        
        {/* Empty Box Illustration */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            {/* Box */}
            <div className="w-32 h-24 md:w-40 md:h-28 bg-gray-300 rounded-lg shadow-lg relative">
              {/* Box flaps */}
              <div className="absolute -top-2 left-2 right-2 h-4 bg-gray-400 rounded-t-lg"></div>
              <div className="absolute -top-1 left-4 right-4 h-3 bg-gray-200 rounded-t-lg"></div>
              {/* Box details */}
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-400 rounded"></div>
            </div>
            {/* Shadow */}
            <div className="absolute -bottom-2 left-2 right-2 h-2 bg-gray-200 rounded-full opacity-50"></div>
          </div>
        </div>
        
        <button 
          onClick={onAddProduct}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-base md:text-lg transition-colors flex items-center space-x-3 mx-auto"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>
    </div>
  </div>
);

const TabNavigation = ({ activeTab, onTabChange, tabs }) => (
  <div className="border-b border-gray-200 mb-6 md:mb-8">
    <nav className="flex space-x-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-3 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
);

const FormInput = ({ label, type = "text", value, onChange, placeholder, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm md:text-base font-medium text-gray-700">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
    )}
  </div>
);

const FormSelect = ({ label, value, onChange, options, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm md:text-base font-medium text-gray-700">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const ProductTypeToggle = ({ value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm md:text-base font-medium text-gray-700">
      Product Type
    </label>
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => onChange('Ready to Wear')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          value === 'Ready to Wear'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Ready to Wear
      </button>
      <button
        type="button"
        onClick={() => onChange('Unstitched')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          value === 'Unstitched'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Unstitched
      </button>
    </div>
  </div>
);

const GeneralTab = ({ formData, onChange, dressTypes, materialTypes, designTypes }) => (
  <div className="space-y-6 md:space-y-8">
    <div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Product Information</h3>
      
      <div className="space-y-6">
        <FormInput
          label="Product Title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Elegant Women in Pink Floral Traditional Indian Outfit..."
        />
        
        <FormInput
          label="Product Description"
          type="textarea"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="A stylish, beautiful pink floral lehenga with a matching dupatta, set against a pink background. The traditional Indian ensemble features intricate gold motifs, exuding elegance..."
        />
        
        <FormSelect
          label="Choose Type"
          value={formData.chooseType}
          onChange={(e) => onChange('chooseType', e.target.value)}
          options={['Traditional Wear', 'Western Wear', 'Fusion Wear']}
          placeholder="Choose Type"
        />
        
        <ProductTypeToggle
          value={formData.productType}
          onChange={(value) => onChange('productType', value)}
        />
        
        <FormSelect
          label="Dress type"
          value={formData.dressType}
          onChange={(e) => onChange('dressType', e.target.value)}
          options={dressTypes}
          placeholder="Select Dress"
        />
        
        <FormSelect
          label="Material Type"
          value={formData.materialType}
          onChange={(e) => onChange('materialType', e.target.value)}
          options={materialTypes}
          placeholder="Select Material"
        />
        
        <FormSelect
          label="Design Type"
          value={formData.designType}
          onChange={(e) => onChange('designType', e.target.value)}
          options={designTypes}
          placeholder="Select Design"
        />
      </div>
    </div>
  </div>
);

const SizeSelector = ({ sizes, selectedSizes, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <label className="text-sm md:text-base font-medium text-gray-700">
        Select Sizes
      </label>
      <button className="text-blue-500 text-sm hover:text-blue-600">
        Size chart ?
      </button>
    </div>
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => {
            if (selectedSizes.includes(size)) {
              onChange(selectedSizes.filter(s => s !== size));
            } else {
              onChange([...selectedSizes, size]);
            }
          }}
          className={`w-12 h-12 rounded-lg font-medium transition-colors ${
            selectedSizes.includes(size)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
    <p className="text-xs text-gray-500">You can select multiple sizes</p>
  </div>
);

const ColorSelector = ({ colors, selectedColors, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">Select colors</h3>
    
    <FormSelect
      label="Color"
      value=""
      onChange={() => {}}
      options={colors.map(c => c.name)}
      placeholder="Select color"
    />
    
    <div className="grid grid-cols-7 gap-3 max-w-md mx-auto">
      {colors.map((color) => (
        <button
          key={color.code}
          type="button"
          onClick={() => {
            if (selectedColors.includes(color.code)) {
              onChange(selectedColors.filter(c => c !== color.code));
            } else {
              onChange([...selectedColors, color.code]);
            }
          }}
          className="relative group"
        >
          <div 
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColors.includes(color.code)
                ? 'border-gray-800 scale-110'
                : 'border-gray-300 hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
          />
          <div className="text-xs text-center mt-1 text-gray-600">{color.name}</div>
        </button>
      ))}
    </div>
    
    {/* Color swatches */}
    <div className="flex justify-center space-x-2 mt-4">
      {selectedColors.map((colorCode) => {
        const color = colors.find(c => c.code === colorCode);
        return (
          <div
            key={colorCode}
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: color?.value }}
          />
        );
      })}
    </div>
  </div>
);

const UnitsSection = ({ units, onChange }) => (
  <div className="space-y-4">
    <label className="text-sm md:text-base font-medium text-gray-700">Units</label>
    <div className="space-y-3">
      {Object.entries(units).map(([size, quantity]) => (
        <div key={size} className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
            {size}
          </div>
          <div 
            className={`flex-1 h-8 rounded ${
              size === 'S' ? 'bg-pink-400' : size === 'M' ? 'bg-blue-400' : 'bg-green-400'
            }`}
          />
          <div className="text-sm text-gray-600">e.g {quantity}</div>
        </div>
      ))}
    </div>
  </div>
);

const SizePricingTab = ({ formData, onChange, sizes, colors }) => (
  <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
    <SizeSelector
      sizes={sizes}
      selectedSizes={formData.selectedSizes}
      onChange={(sizes) => onChange('selectedSizes', sizes)}
    />
    
    <FormInput
      label="Price"
      type="number"
      value={formData.price}
      onChange={(e) => onChange('price', e.target.value)}
      placeholder="Ex. 12,000"
    />
    
    <ColorSelector
      colors={colors}
      selectedColors={formData.selectedColors}
      onChange={(colors) => onChange('selectedColors', colors)}
    />
    
    <UnitsSection
      units={formData.units}
      onChange={(units) => onChange('units', units)}
    />
  </div>
);

// Cloudinary upload function
// Improved Cloudinary upload function with better error handling
const uploadToCloudinary = async (file) => {
  // Validate file
  if (!file) {
    throw new Error("No file provided");
  }
  
  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size must be less than 10MB");
  }
  
  // Check file type
  if (!file.type.startsWith('image/')) {
    throw new Error("File must be an image");
  }
  
  console.log('Starting upload for file:', file.name, 'Size:', file.size, 'bytes');
  
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tryon_unsigned"); // Make sure this is correct
  data.append("cloud_name", "doiezptnn"); // Make sure this is correct
  
  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/doiezptnn/image/upload", {
      method: "POST",
      body: data,
    });
    
    const json = await res.json();
    console.log('Cloudinary response:', json);
    
    if (!res.ok) {
      throw new Error(`Cloudinary API error: ${json.error?.message || 'Unknown error'}`);
    }
    
    if (!json.secure_url) {
      throw new Error("No secure URL returned from Cloudinary");
    }
    
    console.log('Upload successful:', json.secure_url);
    return json.secure_url;
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

const UploadTab = ({ formData, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (formData.images.length + files.length > 4) {
      alert(`You can only upload ${4 - formData.images.length} more images. Maximum 4 images allowed.`);
      return;
    }

    setUploading(true);
    try {
      // Upload files one by one to handle errors better
      const uploadedUrls = [];
      for (const file of files) {
        console.log('Uploading file:', file.name);
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
        console.log('Uploaded successfully:', url);
      }
      
      // Update the images array
      const newImages = [...formData.images, ...uploadedUrls];
      onChange('images', newImages);
      console.log('Updated images array:', newImages);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.message}. Please try again.`);
    } finally {
      setUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    onChange('images', newImages);
    console.log('Removed image at index:', index, 'New images:', newImages);
  };

  const canUpload = !uploading && formData.images.length < 4;

  return (
    <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Upload Photos</h3>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Add photos of your product ({formData.images.length}/4 images)
        </p>
        
        {/* Upload Area */}
        <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          canUpload 
            ? 'border-gray-300 hover:border-blue-400 cursor-pointer' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          {canUpload ? (
            <label className="cursor-pointer">
              <span className="text-gray-700 font-medium hover:text-gray-900">
                {uploading ? 'Uploading...' : 'Click to add photos'}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          ) : (
            <div className="text-gray-500">
              {uploading ? 'Uploading...' : 'Maximum 4 images reached'}
            </div>
          )}
        </div>

        {/* Upload Instructions */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>• Accepted formats: JPG, PNG, GIF</p>
          <p>• Maximum file size: 10MB per image</p>
          <p>• You can select multiple images at once</p>
        </div>

        {/* Uploaded Images Preview */}
        {formData.images && formData.images.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Uploaded Images ({formData.images.length}/4)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                    onError={() => console.error(`Failed to load image ${index + 1}:`, imageUrl)}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base md:text-lg font-medium text-gray-900">Capture Instructions</h4>
          <button className="text-blue-500 text-sm hover:text-blue-600 flex items-center space-x-1">
            <span>View</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <ul className="space-y-3 text-sm md:text-base text-gray-600">
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Click 'Upload Photo beside the product name.</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Include Image details in the description.</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Set the price before uploading the image</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>If multiple images are allowed, specify the number.</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Select the right category for your image</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Choose the brand linked to the product image.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const NavigationButtons = ({ onBack, onNext, isLastTab, onSubmit }) => (
  <div className="flex justify-between pt-6 md:pt-8 border-t border-gray-200">
    <button
      onClick={onBack}
      className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
    
    <button
      onClick={isLastTab ? onSubmit : onNext}
      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      <span>{isLastTab ? 'Submit' : 'Next'}</span>
      {!isLastTab && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  </div>
);

const AddProductForm = ({ onBack }) => {
  const navigate = useNavigate();
  const { productData, updateProductData } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(productData);
  
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'size-pricing', label: 'Size & Pricing' },
    { id: 'upload', label: 'Upload' }
  ];
  
  const dressTypes = ProductDataModel.getDressTypes();
  const materialTypes = ProductDataModel.getMaterialTypes();
  const designTypes = ProductDataModel.getDesignTypes();
  const colors = ProductDataModel.getColors();
  const sizes = ProductDataModel.getSizes();
  
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };
  
  const handleBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    } else {
      onBack();
    }
  };
  
  const handleSubmit = () => {
    // Update context with final data
    updateProductData(formData);
    console.log('Product data:', formData);
    
    // Navigate to tryon preview page
    navigate('/tryon-preview');
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralTab
            formData={formData}
            onChange={handleFormChange}
            dressTypes={dressTypes}
            materialTypes={materialTypes}
            designTypes={designTypes}
          />
        );
      case 'size-pricing':
        return (
          <SizePricingTab
            formData={formData}
            onChange={handleFormChange}
            sizes={sizes}
            colors={colors}
          />
        );
      case 'upload':
        return (
          <UploadTab
            formData={formData}
            onChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };
  
  const isLastTab = activeTab === tabs[tabs.length - 1].id;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center">Add One Product</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {renderTabContent()}
          
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            isLastTab={isLastTab}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

// Controller Component
const UploadProducts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasProducts] = useState(false); // Set to true when products exist
  
  const handleAddProduct = () => {
    setShowAddForm(true);
  };
  
  const handleBackToProducts = () => {
    setShowAddForm(false);
  };
  
  if (showAddForm) {
    return <AddProductForm onBack={handleBackToProducts} />;
  }
  
  if (!hasProducts) {
    return <EmptyProductsState onAddProduct={handleAddProduct} />;
  }
  
  // Products list view would go here
  return <div>Products List View</div>;
};

export default UploadProducts;