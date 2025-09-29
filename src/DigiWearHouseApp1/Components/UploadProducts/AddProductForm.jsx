// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/Context';
// import { useProductForm } from '../../CustomHooks/useProductForm';
// import { useTabNavigation } from '../../CustomHooks/useTabNavigation';
// import { TABS } from '../../constants/productConstants';

// import TabNavigation from   '../UploadSectionComponents/TabNavigation'                   //'./components/common/TabNavigation';
// import NavigationButtons from '../UploadSectionComponents/NavigationButtons'         //'./components/common/NavigationButtons';
// import GeneralTab from '../UploadTabs/GeneralTab';
// import SizePricingTab from '../UploadTabs/SizePricingTab';
// import UploadTab from '../UploadTabs/UploadTab';

// const AddProductForm = ({ onBack }) => {
//   const navigate = useNavigate();
//   const { productData, updateProductData } = useApp();
  
//   const { formData, updateField } = useProductForm(productData);
//   const { 
//     activeTab, 
//     setActiveTab, 
//     goToNextTab, 
//     goToPreviousTab, 
//     isFirstTab, 
//     isLastTab 
//   } = useTabNavigation(TABS, "general");

//   const handleBack = () => {
//     if (!goToPreviousTab()) {
//       onBack();
//     }
//   };

//   // const handleSubmit = () => {
//   //   updateProductData(formData);
//   //   console.log("Product data:", formData);
//   //   navigate("/tryon-preview");
//   // };
// const handleSubmit = () => {
//   const dressType = formData?.dressType?.toLowerCase() || '';
//   const isSaree = dressType.includes('saree') || dressType.includes('sari');

//   // If saree and AI image not yet ready → block
//   if (isSaree && !formData.generatedSareeImage) {
//     alert("Please wait until the AI has finished generating your saree image before proceeding.");
//     return;
//   }

//   updateProductData(formData);
//   console.log("Product data:", formData);
//   navigate("/tryon-preview");
// };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "general":
//         return <GeneralTab formData={formData} onChange={updateField} />;
//       case "size-pricing":
//         return <SizePricingTab formData={formData} onChange={updateField} />;
//       case "upload":
//         return <UploadTab formData={formData} onChange={updateField} />;
//       default:
//         return null;
//     }
//   };

//         return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
//             Add One Product
//           </h1>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
//         <TabNavigation
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           tabs={TABS}
//         />

//         <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
//           {renderTabContent()}

//           <NavigationButtons
//             onBack={handleBack}
//             onNext={goToNextTab}
//             isLastTab={isLastTab}
//             isFirstTab={isFirstTab}
//             onSubmit={handleSubmit}
//              disableSubmit={
//     formData?.dressType?.toLowerCase().includes("saree") &&
//     !formData?.generatedSareeImage
//   }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductForm;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/Context';
import { useProductForm } from '../../CustomHooks/useProductForm';
import { useTabNavigation } from '../../CustomHooks/useTabNavigation';
import { TABS } from '../../constants/productConstants';

import TabNavigation from '../UploadSectionComponents/TabNavigation';
import NavigationButtons from '../UploadSectionComponents/NavigationButtons';
import GeneralTab from '../UploadTabs/GeneralTab';
import SizePricingTab from '../UploadTabs/SizePricingTab';
import UploadTab from '../UploadTabs/UploadTab';
import { ArrowLeft } from 'lucide-react';

const AddProductForm = ({ onBack }) => {
  const navigate = useNavigate();
  const { productData, updateProductData } = useApp();
const [errors, setErrors] = React.useState({});

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

  const clearError = (field) => {
  setErrors((prev) => ({ ...prev, [field]: undefined }));
};

const handleNext = () => {
  if (activeTab === "general") {
    if (formData.premium === null || formData.premium === undefined) {
      setErrors({ premium: "Please select one option." });
      return; // stop navigation
    }
  }

  // clear errors if valid
  setErrors({});
  goToNextTab();
};

  const handleSubmit = () => {
    if (formData.premium === null) {
    alert("Please select if this product is premium (Yes/No).");
    return;
  }
    const dressType = formData?.dressType?.toLowerCase() || '';
    const isSaree = dressType.includes('saree') || dressType.includes('sari');

    // If saree and AI views not yet ready → block
    if (isSaree && (!formData.generatedSareeViews || Object.keys(formData.generatedSareeViews).length === 0)) {
      alert("Please wait until the AI has finished generating your saree views before proceeding.");
      return;
    }

    updateProductData(formData);
    console.log("Product data:", formData);
    navigate("/tryon-preview");
  };

  // Check if saree generation is complete
  const isSareeGenerationComplete = () => {
    const dressType = formData?.dressType?.toLowerCase() || '';
    const isSaree = dressType.includes('saree') || dressType.includes('sari');
    
    if (!isSaree) return true; // Not a saree, so no generation needed
    
    // Check if we have generated views
    const generatedViews = formData.generatedSareeViews;
    return generatedViews && Object.keys(generatedViews).length > 0;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab formData={formData} onChange={updateField} errors={errors} clearError={clearError}
 />;
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
      <div className="max-w-4xl mx-auto relative flex items-center justify-center">
        {/* Back Button (absolute left) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 flex items-end text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          {/* <span className="hidden sm:inline ml-1">Back</span> */}
        </button>

        {/* Title (centered) */}
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
            onNext={handleNext}
            isLastTab={isLastTab}
            isFirstTab={isFirstTab}
            onSubmit={handleSubmit}
            disableSubmit={!isSareeGenerationComplete()}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;