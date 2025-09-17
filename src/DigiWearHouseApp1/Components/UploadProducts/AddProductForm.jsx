import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/Context';
import { useProductForm } from '../../CustomHooks/useProductForm';
import { useTabNavigation } from '../../CustomHooks/useTabNavigation';
import { TABS } from '../../constants/productConstants';

import TabNavigation from   '../UploadSectionComponents/TabNavigation'                   //'./components/common/TabNavigation';
import NavigationButtons from '../UploadSectionComponents/NavigationButtons'         //'./components/common/NavigationButtons';
import GeneralTab from '../UploadTabs/GeneralTab';
import SizePricingTab from '../UploadTabs/SizePricingTab';
import UploadTab from '../UploadTabs/UploadTab';

const AddProductForm = ({ onBack }) => {
  const navigate = useNavigate();
  const { productData, updateProductData } = useApp();
  
  const { formData, updateField } = useProductForm(productData);
  const { 
    activeTab, 
    setActiveTab, 
    goToNextTab, 
    goToPreviousTab, 
    isFirstTab, 
    isLastTab 
  } = useTabNavigation(TABS, "general");

  const handleBack = () => {
    if (!goToPreviousTab()) {
      onBack();
    }
  };

  // const handleSubmit = () => {
  //   updateProductData(formData);
  //   console.log("Product data:", formData);
  //   navigate("/tryon-preview");
  // };
const handleSubmit = () => {
  const dressType = formData?.dressType?.toLowerCase() || '';
  const isSaree = dressType.includes('saree') || dressType.includes('sari');

  // If saree and AI image not yet ready → block
  if (isSaree && !formData.generatedSareeImage) {
    alert("Please wait until the AI has finished generating your saree image before proceeding.");
    return;
  }

  updateProductData(formData);
  console.log("Product data:", formData);
  navigate("/tryon-preview");
};

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab formData={formData} onChange={updateField} />;
      case "size-pricing":
        return <SizePricingTab formData={formData} onChange={updateField} />;
      case "upload":
        return <UploadTab formData={formData} onChange={updateField} />;
      default:
        return null;
    }
  };

        return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
            Add One Product
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={TABS}
        />

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {renderTabContent()}

          <NavigationButtons
            onBack={handleBack}
            onNext={goToNextTab}
            isLastTab={isLastTab}
            isFirstTab={isFirstTab}
            onSubmit={handleSubmit}
             disableSubmit={
    formData?.dressType?.toLowerCase().includes("saree") &&
    !formData?.generatedSareeImage
  }
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
