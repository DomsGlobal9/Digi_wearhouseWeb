import React, { useState } from 'react';

import dash_cover from '../../assets/dash_cover.png';
import dash_icon1 from '../../assets/dash_icon1.png';
import dash_icon2 from '../../assets/dash_icon2.png';
import dash_icon3 from '../../assets/dash_icon3.png';
import dash_icon4 from '../../assets/dash_icon4.png';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  const periods = ['Daily', 'Weekly', 'Monthly'];

  const chartData = [
    { month: 'May', value: 0, color: 'bg-gray-200' },
    { month: 'Jun', value: 0, color: 'bg-blue-400' },
    { month: 'Jul', value: 0, color: 'bg-gray-200' },
    { month: 'Aug', value: 0, color: 'bg-gray-200' },
    { month: 'Sep', value: 0, color: 'bg-gray-200' },
    { month: 'Oct', value: 0, color: 'bg-gray-200' },
    { month: 'Nov', value: 0, color: 'bg-gray-200' },
    { month: 'Dec', value: 0, color: 'bg-slate-600', height: 'h-20' },
    { month: 'Jan', value: 0, color: 'bg-gray-200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      {/* Main Content */}
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Welcome, Vendor!
          </h1>
          
          {/* Hero Image */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800 h-40 md:h-48 lg:h-56 xl:h-64">
            <img 
              src={dash_cover}  
              alt="Warehouse with digital displays"
              className="w-full  h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30"></div>
            
            {/* Digital Display Overlays */}
            {/* <div className="absolute top-4 md:top-6 left-4 md:left-8 lg:left-12">
              <div className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm font-bold">
                143
              </div>
            </div> */}
            
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold">50</div>
                <div className="text-lg md:text-xl mt-1">
                  <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 md:top-6 right-4 md:right-8 lg:right-12">
              <div className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm font-bold">
                28
              </div>
            </div> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Products Card */}
          <Link to={"/products"}>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">Products</h3>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-500 rounded-full flex items-center justify-center">
                <img src={dash_icon1} className='p-3' alt="" />
                {/* <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg> */}
              </div>
            </div>
            <div className="text-4xl text-start  md:text-5xl font-bold text-gray-800">0</div>
          </div>
          </Link>

          {/* Inventory Card */}
          <Link to={"/inventory"}>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">Inventory</h3>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-500 rounded-full flex items-center justify-center">
                <img src={dash_icon2} className='p-3' alt="" />
                {/* <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg> */}
              </div>
            </div>
            <div className="text-4xl text-start md:text-5xl font-bold text-gray-800">0</div>
          </div>
            </Link>

          {/* Total Revenue Card */}
          <Link to={"/total-revenue"}>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">Total Revenue</h3>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-500 rounded-full flex items-center justify-center">
                {/* <div className="text-white font-bold text-lg md:text-xl">₹</div> */}
             <img className='p-3' src={dash_icon3} alt="" />
              </div>
            </div>
            <div className="text-4xl text-start  md:text-5xl font-bold text-gray-800">0</div>
          </div>
          </Link>

          {/* Total Units Sold Card */}
          <Link to={"/total-units"}>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">Total Units sold</h3>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-500 rounded-full flex items-center justify-center">
                {/* <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg> */}
                <img src={dash_icon4} className='p-3' alt="" />
              </div>
            </div>
            <div className="text-4xl text-start  md:text-5xl font-bold text-gray-800">0</div>
          </div>
          </Link>
        </div>

        {/* Performance Section */}
        <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl text-start font-bold text-gray-900 mb-1">Performance</h2>
            <p className="text-gray-600 text-start text-sm md:text-base mb-2">Sales Statistics</p>
            <p className="text-gray-500 text-start text-xs md:text-sm">Updated: Jan 26, 2024, 10 AM</p>
          </div>

          {/* Period Selector */}
          <div className="mb-6  md:mb-8">
            <div className="flex bg-gray-100   rounded-lg p-1 max-w-2/3">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`flex-1 px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-400 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* High/Low Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 space-y-2 md:space-y-0">
            <div>
              <span className=" text-sm text-gray-900 md:text-base">High:</span>
              <span className="font-semibold text-gray-600 ml-1">DEC - ₹0</span>
            </div>
            <div>
              <span className="text-gray-900 text-sm md:text-base">Low:</span>
              <span className="font-semibold text-gray-600 ml-1">JUN - ₹0</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <div className="flex items-end justify-between space-x-2 md:space-x-4 h-40 md:h-48 lg:h-56">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex justify-center mb-2">
                    <span className="text-xs md:text-sm text-gray-600">{item.value}</span>
                  </div>
                  <div 
                    className={`w-full max-w-8 md:max-w-12 rounded-t ${item.color} ${
                      item.height || 'h-8 md:h-12'
                    } transition-all duration-300`}
                  ></div>
                  <div className="mt-2 md:mt-3">
                    <span className="text-xs md:text-sm text-gray-600 font-medium">{item.month}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;