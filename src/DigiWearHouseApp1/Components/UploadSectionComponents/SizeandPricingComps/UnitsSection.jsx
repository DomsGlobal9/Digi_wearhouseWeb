// import React, { useState } from 'react';

// const UnitsSection = ({ selectedSizes, selectedColors, units, onChange }) => {
//   const [errorMessages, setErrorMessages] = useState({});
//   const safeSizes = Array.isArray(selectedSizes) ? selectedSizes : [];
//   const safeColors = Array.isArray(selectedColors) ? selectedColors : [];

//   const getColorDisplay = (colorCode) => {
//     const colorMap = {
//       red: { name: 'Red', value: '#FF0000' },
//       pink: { name: 'Pink', value: '#FF69B4' },
//       blue: { name: 'Blue', value: '#0000FF' },
//       green: { name: 'Green', value: '#008000' },
//       orange: { name: 'Orange', value: '#FFA500' },
//       purple: { name: 'Purple', value: '#800080' },
//       black: { name: 'Black', value: '#000000' }
//     };

//     if (colorMap[colorCode]) return colorMap[colorCode];

//     if (colorCode.includes('_')) {
//       const [baseColorName, hexValue] = colorCode.split('_');
//       if (colorMap[baseColorName]) {
//         return { 
//           name: `${colorMap[baseColorName].name} Shade`, 
//           value: hexValue.startsWith('#') ? hexValue : `#${hexValue}` 
//         };
//       }
//     }

//     return { name: colorCode, value: '#808080' };
//   };

//   const handleUnitChange = (size, colorCode, value) => {
//     const key = `${size}-${colorCode}`;

//     if (value === '' || /^[0-9]*$/.test(value)) {
//       const updatedUnits = {
//         ...units,
//         [colorCode]: {
//           ...(units[colorCode] || {}),
//           [size]: value
//         }
//       };
//       onChange(updatedUnits);
//       setErrorMessages((prev) => ({ ...prev, [key]: null }));
//     } else {
//       setErrorMessages((prev) => ({
//         ...prev,
//         [key]: 'Please enter a valid number'
//       }));
//     }
//   };

//   // Case: No colors chosen → show message
//   if (safeColors.length === 0) {
//     return (
//       <div className="space-y-4">
//         <label className="text-sm md:text-base font-medium text-gray-700">Units</label>
//         <p className="text-sm text-gray-500">
//           Please select colors to input units.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <label className="text-sm md:text-base font-medium text-gray-700">
//         Units {safeSizes.length > 0 ? "(Stock for each size and color combination)" : "(Stock for each color)"}
//       </label>

//       <div className="space-y-4">
//         {/* Header */}
//         <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
//           {safeSizes.length > 0 && <div>Size</div>}
//           <div>Color</div>
//           <div>Units</div>
//         </div>

//         {/* Rows */}
//         <div className="space-y-3">
//           {safeColors.map((colorCode) => {
//             const colorDisplay = getColorDisplay(colorCode);

//             // If no sizes → only one row per color
//             if (safeSizes.length === 0) {
//               const key = `nosize-${colorCode}`;
//               return (
//                 <div key={key} className="grid grid-cols-3 gap-4 items-center">
//                   {/* Empty Size Cell */}
//                   <div className="text-center text-sm font-medium text-gray-400">—</div>

//                   {/* Color */}
//                   <div
//                     className="rounded-md p-3 text-center text-sm font-medium shadow-sm"
//                     style={{
//                       backgroundColor: colorDisplay.value,
//                       color: (colorDisplay.value === '#FFFFFF' || colorDisplay.value === '#F5F5F5' || colorDisplay.value === '#FFFF00') 
//                         ? '#000000' : '#FFFFFF'
//                     }}
//                   >
//                     {colorDisplay.name}
//                   </div>

//                   {/* Input */}
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={units[colorCode]?.['nosize'] || ''}
//                       onChange={(e) => handleUnitChange('nosize', colorCode, e.target.value)}
//                       placeholder="e.g. 22"
//                       className={`w-full h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${
//                         errorMessages[key] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     />
//                     {errorMessages[key] && (
//                       <p className="text-xs text-red-500 mt-1 absolute">
//                         {errorMessages[key]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             }

//             // Normal case: sizes × colors
//             return safeSizes.map((size) => {
//               const key = `${size}-${colorCode}`;
//               return (
//                 <div key={key} className="grid grid-cols-3 gap-4 items-center">
//                   <div className="bg-gray-100 rounded-md p-3 text-center text-sm font-medium text-gray-700">
//                     {size}
//                   </div>

//                   <div
//                     className="rounded-md p-3 text-center text-sm font-medium shadow-sm"
//                     style={{
//                       backgroundColor: colorDisplay.value,
//                       color: (colorDisplay.value === '#FFFFFF' || colorDisplay.value === '#F5F5F5' || colorDisplay.value === '#FFFF00') 
//                         ? '#000000' : '#FFFFFF'
//                     }}
//                   >
//                     {colorDisplay.name}
//                   </div>

//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={units[colorCode]?.[size] || ''}
//                       onChange={(e) => handleUnitChange(size, colorCode, e.target.value)}
//                       placeholder="e.g. 22"
//                       className={`w-full h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${
//                         errorMessages[key] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     />
//                     {errorMessages[key] && (
//                       <p className="text-xs text-red-500 mt-1 absolute">
//                         {errorMessages[key]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             });
//           })}
//         </div>

//         {/* Summary */}
//         <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//           <div className="text-sm text-blue-800">
//             {safeSizes.length > 0 ? (
//               <>
//                 <strong>Total combinations:</strong> {safeSizes.length} sizes × {safeColors.length} colors = {safeSizes.length * safeColors.length} variants
//               </>
//             ) : (
//               <>
//                 <strong>Total combinations:</strong> {safeColors.length} colors = {safeColors.length} variants
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnitsSection;
import React, { useState } from "react";

const UnitsSection = ({ selectedSizes, selectedColors, units, onChange }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const safeSizes = Array.isArray(selectedSizes) ? selectedSizes : [];
  const safeColors = Array.isArray(selectedColors) ? selectedColors : [];

  const getColorDisplay = (colorCode) => {
    const colorMap = {
      red: { name: "Red", value: "#FF0000" },
      pink: { name: "Pink", value: "#FF69B4" },
      blue: { name: "Blue", value: "#0000FF" },
      green: { name: "Green", value: "#008000" },
      orange: { name: "Orange", value: "#FFA500" },
      purple: { name: "Purple", value: "#800080" },
      black: { name: "Black", value: "#000000" },
    };

    if (colorMap[colorCode]) return colorMap[colorCode];

    if (colorCode.includes("_")) {
      const [baseColorName, hexValue] = colorCode.split("_");
      if (colorMap[baseColorName]) {
        return {
          name: `${colorMap[baseColorName].name} Shade`,
          value: hexValue.startsWith("#") ? hexValue : `#${hexValue}`,
        };
      }
    }

    return { name: colorCode, value: "#808080" };
  };

  const handleUnitChange = (size, colorCode, value) => {
    const key = `${size}-${colorCode}`;

    if (value === "" || /^[0-9]*$/.test(value)) {
      const updatedUnits = {
        ...units,
        [colorCode]: {
          ...(units[colorCode] || {}),
          [size]: value,
        },
      };
      onChange(updatedUnits);
      setErrorMessages((prev) => ({ ...prev, [key]: null }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [key]: "Please enter a valid number",
      }));
    }
  };

  // Case: No colors chosen → show message
  if (safeColors.length === 0) {
    return (
      <div className="space-y-4">
        <label className="text-sm md:text-base font-medium text-gray-700">
          Units
        </label>
        <p className="text-sm text-gray-500">
          Please select colors to input units.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="text-sm md:text-base font-medium text-gray-700">
        Units{" "}
        {safeSizes.length > 0
          ? "(Stock for each size and color combination)"
          : "(Stock for each color)"}
      </label>

      <div className="space-y-4">
        {/* Header */}
        {/* <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
          {safeSizes.length > 0 && <div>Size</div>}
          <div>Color</div>
          <div>Units</div>
        </div> */}
        <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
          {safeSizes.length > 0 ? (
            <div>Size</div>
          ) : (
            <div className="invisible">Size</div>
          )}
          <div>Color</div>
          <div>Units</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {safeColors.map((colorCode) => {
            const colorDisplay = getColorDisplay(colorCode);

            // If no sizes → only one row per color
            if (safeSizes.length === 0) {
              const key = `nosize-${colorCode}`;
              return (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  {/* Empty Size Cell */}
                  <div className="text-center text-sm font-medium text-gray-400">
                    —
                  </div>

                  {/* Color */}
                  <div
                    className="rounded-md p-3 text-center text-sm font-medium shadow-sm"
                    style={{
                      backgroundColor: colorDisplay.value,
                      color:
                        colorDisplay.value === "#FFFFFF" ||
                        colorDisplay.value === "#F5F5F5" ||
                        colorDisplay.value === "#FFFF00"
                          ? "#000000"
                          : "#FFFFFF",
                    }}
                  >
                    {colorDisplay.name}
                  </div>

                  {/* Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={units[colorCode]?.["nosize"] || ""}
                      onChange={(e) =>
                        handleUnitChange("nosize", colorCode, e.target.value)
                      }
                      placeholder="e.g. 22"
                      className={`w-full h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${
                        errorMessages[key]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errorMessages[key] && (
                      <p className="text-xs text-red-500 mt-1 absolute">
                        {errorMessages[key]}
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            // Normal case: sizes × colors
            return safeSizes.map((size) => {
              const key = `${size}-${colorCode}`;
              return (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <div className="bg-gray-100 rounded-md p-3 text-center text-sm font-medium text-gray-700">
                    {size}
                  </div>

                  <div
                    className="rounded-md p-3 text-center text-sm font-medium shadow-sm"
                    style={{
                      backgroundColor: colorDisplay.value,
                      color:
                        colorDisplay.value === "#FFFFFF" ||
                        colorDisplay.value === "#F5F5F5" ||
                        colorDisplay.value === "#FFFF00"
                          ? "#000000"
                          : "#FFFFFF",
                    }}
                  >
                    {colorDisplay.name}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={units[colorCode]?.[size] || ""}
                      onChange={(e) =>
                        handleUnitChange(size, colorCode, e.target.value)
                      }
                      placeholder="e.g. 22"
                      className={`w-full h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${
                        errorMessages[key]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errorMessages[key] && (
                      <p className="text-xs text-red-500 mt-1 absolute">
                        {errorMessages[key]}
                      </p>
                    )}
                  </div>
                </div>
              );
            });
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            {safeSizes.length > 0 ? (
              <>
                <strong>Total combinations:</strong> {safeSizes.length} sizes ×{" "}
                {safeColors.length} colors ={" "}
                {safeSizes.length * safeColors.length} variants
              </>
            ) : (
              <>
                <strong>Total combinations:</strong>{safeColors.length} colors
                = {safeColors.length} variants
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsSection;
