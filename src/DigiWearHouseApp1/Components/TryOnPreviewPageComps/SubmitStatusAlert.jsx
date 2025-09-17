import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const SubmitStatusAlert = ({ submitStatus, submitMessage }) => {
  if (!submitStatus) return null;
  
  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border ${
        submitStatus === "success" 
          ? "bg-green-50 border-green-200 text-green-800" 
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center">
        {submitStatus === "success" ? (
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
        )}
        <div>
          <div className="font-medium">{submitStatus === "success" ? "Success!" : "Error"}</div>
          <div className="text-sm mt-1">{submitMessage}</div>
        </div>
      </div>
    </div>
  );
};