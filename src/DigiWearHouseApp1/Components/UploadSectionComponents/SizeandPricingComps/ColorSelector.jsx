import React, { useState } from "react";
import { COLORS } from "../../../constants/productConstants";

const ColorSelector = ({ selectedColors, onChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);

  const handleShadeSelection = (shade, colorName) => {
    setSelectedShade(shade);
    onChange([`${colorName.toLowerCase()}_${shade}`]);
  };

  const handleBaseColorSelection = (color) => {
    setSelectedShade(color.value);
    onChange([color.code]);
  };

  const isShadeSelected = (shadeValue, colorName) => {
    const shadeCode = `${colorName.toLowerCase()}_${shadeValue}`;
    return selectedColors.includes(shadeCode);
  };

  const isBaseColorSelected = (colorCode) => {
    return selectedColors.includes(colorCode);
  };

  const getSelectedColorInfo = () => {
    if (!selectedColors || selectedColors.length === 0) return null;

    const selected = selectedColors[0];
    const baseColor = COLORS.find((c) => c.code === selected);

    if (baseColor) {
      return { name: baseColor.name, value: baseColor.value };
    }

    for (const color of COLORS) {
      const shadeIndex = color.shades.findIndex(
        (shade) => selected === `${color.name.toLowerCase()}_${shade}`
      );
      if (shadeIndex !== -1) {
        return {
          name: `${color.name} Shade`,
          value: color.shades[shadeIndex],
        };
      }
    }

    return null;
  };

  const selectedColorInfo = getSelectedColorInfo();

  return (
    <div className="space-y-6">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
        Select Color
      </h3>

      {/* Main colors */}
      {/* <div className="grid grid-cols-7 gap-3 max-w-md mx-auto">
        {COLORS.map((color) => (
          <button
            key={color.code}
            type="button"
            onClick={() => {
              setSelectedColor(color);
              setSelectedShade(null);
            }}
            onDoubleClick={() => handleBaseColorSelection(color)}
            className="relative group border border-gray-300 rounded-lg p-2 shadow-sm hover:shadow-md transition-all"
          >
            <div
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor?.code === color.code
                  ? "border-gray-800 scale-110"
                  : isBaseColorSelected(color.code)
                  ? "border-blue-500 scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
            />
            <div className="text-xs text-center mt-1 text-gray-600 pe-2">
              {color.name}
            </div>
          </button>
        ))}
      </div> */}
      <div className="grid grid-cols-7 gap-3 max-w-md mx-auto">
        {COLORS.map((color) => (
          <button
            key={color.code}
            type="button"
            onClick={() => {
              setSelectedColor(color);
              setSelectedShade(null);
            }}
            onDoubleClick={() => handleBaseColorSelection(color)}
            className="relative group rounded-lg p-3 cursor-pointer hover:shadow-md transition-all
                 sm:p-2 xs:p-1 mobile:p-1"
          >
            <div
              className={`w-8 h-8 rounded-full border-2 transition-all
                   sm:w-8 sm:h-8
                   xs:w-6 xs:h-6
                   mobile:w-5 mobile:h-5
                   ${
                     selectedColor?.code === color.code
                       ? "border-gray-800 scale-110"
                       : isBaseColorSelected(color.code)
                       ? "border-blue-500 scale-110"
                       : "border-gray-300 hover:scale-105"
                   }`}
              style={{ backgroundColor: color.value }}
            />
            <div
              className="text-[10px] text-center mt-1 text-gray-600
                     sm:text-xs sm:block
                     xs:text-[10px] xs:leading-tight
                     mobile:text-[8px] mobile:leading-none mobile:mt-0.5
                     max-[320px]:hidden"
            >
              <span className="sm:inline xs:block mobile:block">
                {color.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-gray-500">
        Click to see shades • Double-click to select base color
      </div>

      {/* Palette */}
      {selectedColor && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2 text-center">
            Choose a shade of {selectedColor.name}
          </h4>
          <div className="flex justify-center flex-wrap gap-2">
            {selectedColor.shades.map((shade, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleShadeSelection(shade, selectedColor.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  isShadeSelected(shade, selectedColor.name)
                    ? "border-gray-800 scale-110 ring-2 ring-blue-400"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: shade }}
                title={shade}
              />
            ))}
          </div>
        </div>
      )}

      {/* Selected color preview */}
      {selectedColorInfo && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-700 mb-2">Selected Color:</p>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full border-2 border-gray-800 shadow-lg"
                style={{ backgroundColor: selectedColorInfo.value }}
              />
              <div className="text-xs text-center mt-2 text-gray-700 font-medium max-w-24">
                {selectedColorInfo.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSelector;
