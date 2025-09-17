import React from 'react';

const BulkUploadNotification = ({ show, onClose, onProceed }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Please follow the below format to add documents
          </h3>

          {/* Document format information */}
          <DocumentFormatInfo />

          {/* Additional instructions */}
          <ImportantNotes />

          {/* Action buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onProceed}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentFormatInfo = () => (
  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Required Fields:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {[
            "Product Name",
            "Product Description", 
            "Category",
            "Price",
            "Available Sizes",
            "Colors Available",
            "Material Type",
            "Design Type"
          ].map((field, index) => (
            <li key={index}>• {field}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">File Requirements:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {[
            "Excel format (.xlsx, .xls)",
            "Word format (.docx, .doc)",
            "Maximum file size: 5MB",
            "Include product image URLs",
            "Use our template format",
            "Fill all mandatory fields"
          ].map((requirement, index) => (
            <li key={index}>• {requirement}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ImportantNotes = () => (
  <div className="text-left mb-6">
    <h4 className="font-semibold text-gray-800 mb-3">Important Notes:</h4>
    <ul className="text-sm text-gray-600 space-y-2">
      {[
        "Download our template file to ensure proper formatting",
        "Each row should represent one product with complete information",
        "Image URLs should be publicly accessible and high quality",
        "Review your data before uploading to avoid processing errors"
      ].map((note, index) => (
        <li key={index} className="flex items-start space-x-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span>{note}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default BulkUploadNotification;
