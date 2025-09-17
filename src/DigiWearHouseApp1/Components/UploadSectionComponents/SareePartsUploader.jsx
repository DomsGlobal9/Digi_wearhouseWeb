import React, { useState, useEffect } from 'react';
import { Upload, X, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { uploadToCloudinary } from '../../utilities/cloudinary';

const SareePartsUploader = ({ formData, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [draggedPart, setDraggedPart] = useState(null);
  const [error, setError] = useState(null);
  const [generatingComplete, setGeneratingComplete] = useState(false);

  const partLabels = {
    blouse: { name: 'Blouse', description: 'The fitted upper garment/top part', icon: '👚' },
    pleats: { name: 'Pleats', description: 'The folded front portion of the saree', icon: '📏' },
    pallu: { name: 'Pallu', description: 'The decorative end piece over shoulder', icon: '🎨' },
    shoulder: { name: 'Shoulder', description: 'The shoulder draping portion', icon: '💫' }
  };

  const sareeParts = formData.sareeParts || {
    blouse: { file: null, preview: null, url: null },
    pleats: { file: null, preview: null, url: null },
    pallu: { file: null, preview: null, url: null },
    shoulder: { file: null, preview: null, url: null }
  };

  useEffect(() => {
    const allPartsUploaded = Object.values(sareeParts).every(part => part.file);
    const noGeneratedImage = !formData.generatedSareeImage;
    
    if (allPartsUploaded && noGeneratedImage && !generatingComplete) {
      console.log('All 4 parts uploaded, auto-generating complete saree...');
      handleAutoGenerateCompleteSaree();
    }
  }, [sareeParts, formData.generatedSareeImage]);

  const handleDrag = (e, partName) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDraggedPart(partName);
    } else if (e.type === "dragleave") {
      setDraggedPart(null);
    }
  };

  const handleDrop = (e, partName) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedPart(null);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0], partName);
    }
  };

  const handleFile = async (file, partName) => {
    if (!file.type.startsWith('image/')) {
      setError(`Please select a valid image file for ${partLabels[partName].name}`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const previewUrl = URL.createObjectURL(file);
      console.log(`Uploading ${partName} to Cloudinary...`);
      const cloudinaryUrl = await uploadToCloudinary(file);
      console.log(`${partName} uploaded:`, cloudinaryUrl);
      
      const updatedParts = {
        ...sareeParts,
        [partName]: { 
          file, 
          preview: previewUrl, 
          url: cloudinaryUrl 
        }
      };

      onChange('sareeParts', updatedParts);
      
      const currentImageUrls = formData.imageUrls || [];
      const partIndex = Object.keys(partLabels).indexOf(partName);
      const newImageUrls = [...currentImageUrls];
      newImageUrls[partIndex + 1] = cloudinaryUrl;
      onChange('imageUrls', newImageUrls);
      
      console.log(`Updated imageUrls[${partIndex + 1}] with ${partName}:`, cloudinaryUrl);
      setError(null);
    } catch (err) {
      console.error(`Upload failed for ${partName}:`, err);
      setError(`Upload failed for ${partLabels[partName].name}: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e, partName) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file, partName);
    }
  };

  const handleAutoGenerateCompleteSaree = async () => {
    if (!getAllPartsUploaded()) {
      console.log('Not all parts uploaded yet');
      return;
    }

    setGeneratingComplete(true);
    setError(null);
    console.log('Starting AI saree generation...');

    try {
      const formDataToSend = new FormData();
      
      Object.entries(sareeParts).forEach(([partName, partData]) => {
        if (partData.file) {
          formDataToSend.append(partName, partData.file);
        }
      });

      console.log('Sending 4 saree parts to AI backend...');
      
      const response = await fetch('/api/drape-saree-parts', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log('AI generation successful! Uploading to Cloudinary...');
        
        const generatedImageBase64 = `data:${data.generatedImage.mimeType};base64,${data.generatedImage.data}`;
        
        try {
          const blob = await base64ToBlob(generatedImageBase64);
          const generatedImageFile = new File([blob], 'generated-complete-saree.png', { type: 'image/png' });
          
          console.log('Uploading generated saree to Cloudinary...');
          const cloudinaryUrl = await uploadToCloudinary(generatedImageFile);
          console.log('Generated saree uploaded:', cloudinaryUrl);
          
          const currentImageUrls = formData.imageUrls || [];
          const updatedImageUrls = [cloudinaryUrl, ...currentImageUrls.slice(1)];
          
          onChange('generatedSareeImage', cloudinaryUrl);
          onChange('imageUrls', updatedImageUrls);
          
          if (data.uploadedParts) {
            onChange('uploadedParts', data.uploadedParts);
          }
          
          console.log('Complete saree process finished!');
          console.log('Final imageUrls:', updatedImageUrls);
          
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          onChange('generatedSareeImage', generatedImageBase64);
          setError('Generated saree created but upload failed. Saved temporarily.');
        }
        
      } else {
        setError(data.error || 'Failed to generate complete saree from parts');
        console.error('AI Backend error:', data);
      }
    } catch (err) {
      console.error('Network/API error:', err);
      setError(`API Error: ${err.message || 'Failed to connect to AI service'}`);
    } finally {
      setGeneratingComplete(false);
    }
  };

  const clearPart = (partName) => {
    if (sareeParts[partName].preview) {
      URL.revokeObjectURL(sareeParts[partName].preview);
    }
    
    const updatedParts = {
      ...sareeParts,
      [partName]: { file: null, preview: null, url: null }
    };
    
    onChange('sareeParts', updatedParts);
    
    const currentImageUrls = formData.imageUrls || [];
    const partIndex = Object.keys(partLabels).indexOf(partName);
    const newImageUrls = [...currentImageUrls];
    newImageUrls[partIndex + 1] = null;
    onChange('imageUrls', newImageUrls);
  };

  const clearAllParts = () => {
    Object.keys(sareeParts).forEach(partName => {
      if (sareeParts[partName].preview) {
        URL.revokeObjectURL(sareeParts[partName].preview);
      }
    });
    
    const clearedParts = {
      blouse: { file: null, preview: null, url: null },
      pleats: { file: null, preview: null, url: null },
      pallu: { file: null, preview: null, url: null },
      shoulder: { file: null, preview: null, url: null }
    };
    
    onChange('sareeParts', clearedParts);
    onChange('generatedSareeImage', null);
    onChange('imageUrls', []);
    onChange('uploadedParts', null);
    setError(null);
  };

  const getUploadedPartsCount = () => {
    return Object.values(sareeParts).filter(part => part.file).length;
  };

  const getAllPartsUploaded = () => {
    return Object.values(sareeParts).every(part => part.file);
  };

  const base64ToBlob = async (base64String) => {
    const response = await fetch(base64String);
    return response.blob();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-purple-600" />
          Upload Saree Parts
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          Upload 4 separate saree parts - complete saree will generate automatically
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {getUploadedPartsCount()}/4 parts uploaded
            {formData.generatedSareeImage && (
              <span className="ml-2 text-green-600">
                {generatingComplete ? '(Generating...)' : '(+ AI Complete Saree ✨)'}
              </span>
            )}
          </span>
          {getUploadedPartsCount() > 0 && (
            <button
              onClick={clearAllParts}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getUploadedPartsCount() / 4) * 100}%` }}
          />
        </div>
      </div>

      {generatingComplete && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-600 border-t-transparent"></div>
            <div className="text-purple-800 font-medium">
              AI is creating your complete saree... This may take 30-60 seconds
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {Object.entries(partLabels).map(([partName, partInfo]) => (
          <div key={partName} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{partInfo.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-800">{partInfo.name}</h4>
                <p className="text-xs text-gray-600">{partInfo.description}</p>
              </div>
            </div>

            {!sareeParts[partName].file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${
                  draggedPart === partName 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-400'
                }`}
                onDragEnter={(e) => handleDrag(e, partName)}
                onDragLeave={(e) => handleDrag(e, partName)}
                onDragOver={(e) => handleDrag(e, partName)}
                onDrop={(e) => handleDrop(e, partName)}
              >
                <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-600 mb-2">Drop {partInfo.name.toLowerCase()} here</p>
                <label className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm rounded cursor-pointer hover:bg-purple-700 transition-colors">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e, partName)}
                    disabled={uploading || generatingComplete}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={sareeParts[partName].preview}
                    alt={`${partInfo.name} preview`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    onClick={() => clearPart(partName)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    disabled={uploading || generatingComplete}
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <CheckCircle className="text-green-500" size={12} />
                  <span className="text-xs text-green-600 font-medium">Uploaded ✓</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {formData.generatedSareeImage && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            AI Generated Complete Saree
            <span className="text-sm text-green-600 font-normal">(Set as Primary Image)</span>
          </h4>
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={formData.generatedSareeImage}
              alt="AI generated complete draped saree"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = formData.generatedSareeImage;
                link.download = 'ai-generated-complete-saree.png';
                link.click();
              }}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Download AI Saree
            </button>
            <div className="text-xs text-gray-600 flex items-center px-3 bg-white rounded-lg py-2">
              📊 Total Images: {formData.imageUrls?.length || 0}
            </div>
          </div>
        </div>
      )}

      <SareeInstructions />
    </div>
  );
};

const SareeInstructions = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">How it Works</h4>
    <div className="grid md:grid-cols-4 gap-4 mb-4">
      {[
        { icon: '👚', name: 'Blouse', step: 1, desc: 'Upload the blouse/top part' },
        { icon: '📏', name: 'Pleats', step: 2, desc: 'Upload the pleated front portion' },
        { icon: '🎨', name: 'Pallu', step: 3, desc: 'Upload the decorative end piece' },
        { icon: '💫', name: 'Shoulder', step: 4, desc: 'Upload the shoulder draping part' }
      ].map((part) => (
        <div key={part.name} className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <div className="text-3xl mb-2">{part.icon}</div>
          <div className="text-sm font-medium text-gray-700 mb-1">Step {part.step}</div>
          <div className="text-lg font-semibold text-purple-700 mb-2">{part.name}</div>
          <div className="text-xs text-gray-600">{part.desc}</div>
        </div>
      ))}
    </div>
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <p className="text-sm text-blue-800">
        <strong>✨ AI Magic:</strong> As soon as you upload all 4 parts, our AI automatically combines them to create a beautiful, 
        cohesive saree draped elegantly on an Indian model. The generated complete saree becomes your primary product image 
        (index 0), with individual parts following in the image array!
      </p>
    </div>
  </div>
);

export default SareePartsUploader;