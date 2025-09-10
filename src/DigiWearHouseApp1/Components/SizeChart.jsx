import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Body from '../../assets/body.png';

import { useNavigate } from "react-router-dom";

const SizeChart = () => {
  const [selectedUnit, setSelectedUnit] = useState('inch');
const navigate = useNavigate();

  const inchData = [
    { size: 'XXS', bust: '30', waist: '24', hip: '34' },
    { size: 'XS', bust: '32', waist: '25', hip: '35' },
    { size: 'S', bust: '34', waist: '26', hip: '36' },
    { size: 'M', bust: '36', waist: '28', hip: '40' },
    { size: 'L', bust: '38', waist: '30', hip: '42' },
    { size: 'XL', bust: '40', waist: '32', hip: '44' },
    { size: '2XL', bust: '42', waist: '34', hip: '46' },
    { size: '3XL', bust: '44', waist: '36', hip: '48' }
  ];

  const cmData = [
    { size: 'XXS', bust: '76.2', waist: '61.4', hip: '74' },
    { size: 'XS', bust: '81.3', waist: '63.5', hip: '88.9' },
    { size: 'S', bust: '86.4', waist: '66.6', hip: '94' },
    { size: 'M', bust: '92.4', waist: '73.7', hip: '99.1' },
    { size: 'L', bust: '96.5', waist: '76.7', hip: '104.1' },
    { size: 'XL', bust: '101.6', waist: '83.8', hip: '109.2' },
    { size: '2XL', bust: '106.7', waist: '86.9', hip: '114.3' },
    { size: '4XL', bust: '119.4', waist: '101.6', hip: '127' },
    { size: '3XL', bust: '113', waist: '95.2', hip: '120.7' }
  ];

  const currentData = selectedUnit === 'inch' ? inchData : cmData;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center text-blue-600 mb-4 hover:text-blue-700 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          
          <span onClick={() => navigate(-1)} className="text-sm font-medium">Back</span>

        </button>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-evenly ">
          {/* Size Chart Table */}
          <div className="">


            <div className='flex justify-between'>
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Size Chart</h1>
            
            {/* Unit Toggle */}
            <div className="inline-flex bg-gray-200 rounded-lg p-1 mb-6">
              <button
                onClick={() => setSelectedUnit('inch')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedUnit === 'inch'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                inch
              </button>
              <button
                onClick={() => setSelectedUnit('cm')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedUnit === 'cm'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                cm
              </button>
            </div>

  </div>
            {/* Table */}
            <div className="bg-white rounded-xl w-96  shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Size</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Bust</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Waist</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row, index) => (
                      <tr 
                        key={row.size} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index === currentData.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.size}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.bust}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.waist}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Human Figure Diagram */}
          <div className="  justify-center">
         <img src={Body} className='' alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;