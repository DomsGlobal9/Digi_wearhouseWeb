// components/products/upload/components/tabs/UploadTab.jsx
// import React, { useState } from 'react';
// import ImageUploader from '../upload/ImageUploader';
// import SareePartsUploader from '../upload/SareePartsUploader';
// import BulkUploadInterface from '../upload/BulkUploadInterface';
// import UploadModal from '../modals/UploadModal';
// import BulkUploadNotification from '../upload/BulkUploadNotification';
// import SuccessNotification from '../common/SuccessNotification';
import React, { useState } from 'react';
import ImageUploader from '../UploadSectionComponents/ImageUploader';
import BulkUploadInterface from '../UploadSectionComponents/Bulk/BulkUploadInterface';
import UploadModal from '../UploadSectionComponents/models/UploadModal';
import BulkUploadNotification from '../UploadSectionComponents/Bulk/BulkUploadNotification';
import SuccessNotification from '../UploadSectionComponents/SuccessNotification';
import SareePartsUploader from '../UploadSectionComponents/SareePartsUploader';

const UploadTab = ({ formData, onChange }) => {
  const [uploadMode, setUploadMode] = useState("single");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showBulkNotification, setShowBulkNotification] = useState(false);

  // Check if the selected dress type is a saree
  const isSareeType = () => {
    const dressType = formData?.dressType?.toLowerCase() || '';
    return dressType.includes('saree') || dressType.includes('sari');
  };

  const handleBulkUploadChoice = () => {
    setShowBulkNotification(true);
  };

  const handleBulkNotificationProceed = () => {
    setShowBulkNotification(false);
    setUploadMode("bulk");
  };

  const handleBulkSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const handleBackToSingle = () => setUploadMode("single");

  // Show bulk upload interface
  if (uploadMode === "bulk") {
    return (
      <>
        <BulkUploadInterface
          onBack={handleBackToSingle}
          onSuccess={handleBulkSuccess}
        />
        <SuccessNotification
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          message={successMessage}
        />
      </>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
      {/* Conditional Upload Component */}
      {isSareeType() ? (
        <SareePartsUploader 
          formData={formData} 
          onChange={onChange} 
        />
      ) : (
        <ImageUploader
          formData={formData}
          onChange={onChange}
          onUploadClick={handleBulkUploadChoice}
        />
      )}

      {/* Bulk Upload Notification - Only show for non-saree types */}
      {!isSareeType() && (
        <BulkUploadNotification
          show={showBulkNotification}
          onClose={() => setShowBulkNotification(false)}
          onProceed={handleBulkNotificationProceed}
        />
      )}

      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
      />
    </div>
  );
};

export default UploadTab;



//normal
// import React, { useState } from 'react';
// import ImageUploader from '../UploadSectionComponents/ImageUploader';
// import BulkUploadInterface from '../UploadSectionComponents/Bulk/BulkUploadInterface';
// import UploadModal from '../UploadSectionComponents/models/UploadModal';
// import BulkUploadNotification from '../UploadSectionComponents/Bulk/BulkUploadNotification';
// import SuccessNotification from '../UploadSectionComponents/SuccessNotification';

// const UploadTab = ({ formData, onChange }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [uploadMode, setUploadMode] = useState("single");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showBulkNotification, setShowBulkNotification] = useState(false);

//   const handleUploadClick = () => setShowModal(true);

//   const handleModalChoice = (choice) => {
//     setShowModal(false);
//     if (choice === "single") {
//       setUploadMode("single");
//     } else if (choice === "bulk") {
//       setShowBulkNotification(true);
//     }
//   };

//   const handleBulkNotificationProceed = () => {
//     setShowBulkNotification(false);
//     setUploadMode("bulk");
//   };

//   const handleBulkSuccess = (message) => {
//     setSuccessMessage(message);
//     setShowSuccess(true);
//   };

//   const handleBackToSingle = () => setUploadMode("single");

//   if (uploadMode === "bulk") {
//     return (
//       <>
//         <BulkUploadInterface
//           onBack={handleBackToSingle}
//           onSuccess={handleBulkSuccess}
//         />
//         <SuccessNotification
//           show={showSuccess}
//           onClose={() => setShowSuccess(false)}
//           message={successMessage}
//         />
//       </>
//     );
//   }

//   return (
//     <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
//       <ImageUploader
//         formData={formData}
//         onChange={onChange}
//         onUploadClick={handleUploadClick}
//       />

//       <UploadModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onChoice={handleModalChoice}
//       />

//       <BulkUploadNotification
//         show={showBulkNotification}
//         onClose={() => setShowBulkNotification(false)}
//         onProceed={handleBulkNotificationProceed}
//       />

//       <SuccessNotification
//         show={showSuccess}
//         onClose={() => setShowSuccess(false)}
//         message={successMessage}
//       />
//     </div>
//   );
// };

// export default UploadTab;
