import React, { useState } from 'react';

// Model - Data layer
const RevenueDataModel = {
  // Static data - replace with API calls later
  getProducts: () => [
    // {
    //   id: 1,
    //   name: "Trendy Plain Lehenga",
    //   price: "₹2,500",
    //   image: "/api/placeholder/120/120",
    //   revenue: 15000
    // },
    // {
    //   id: 2,
    //   name: "Trendy Blue Lehenga",
    //   price: "₹2,800",
    //   image: "/api/placeholder/120/120", 
    //   revenue: 12600
    // },
    // {
    //   id: 3,
    //   name: "Cotton saree",
    //   price: "₹1,200",
    //   image: "/api/placeholder/120/120",
    //   revenue: 8400
    // },
    // {
    //   id: 4,
    //   name: "Kala Lehenga",
    //   price: "₹3,200",
    //   image: "/api/placeholder/120/120",
    //   revenue: 9600
    // },
    // {
    //   id: 5,
    //   name: "Silky Lehenga",
    //   price: "₹2,900",
    //   image: "/api/placeholder/120/120",
    //   revenue: 11600
    // },
    // {
    //   id: 6,
    //   name: "Kala Lehenga",
    //   price: "₹3,200",
    //   image: "/api/placeholder/120/120",
    //   revenue: 9600
    // }

  ],

  getChartData: () => [
    { month: 'May', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Jun', value: 0, color: 'bg-blue-400', height: 'h-12' },
    { month: 'Jul', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Aug', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Sep', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Oct', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Nov', value: 0, color: 'bg-gray-200', height: 'h-8' },
    { month: 'Dec', value: 0, color: 'bg-slate-600', height: 'h-24' },
    { month: 'Jan', value: 0, color: 'bg-gray-200', height: 'h-8' }
  ],

  getStats: () => ({
    totalRevenue: 0,
    totalRefunds: 0,
    highPeriod: "DEC - ₹0",
    lowPeriod: "JUN - ₹0"
  })
};

// View Components
const StatsCard = ({ title, value, variant = "dark", className = "" }) => {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-slate-600 text-white" : "bg-white text-gray-900 border border-gray-200";
  
  return (
    <div className={`${bgClass} p-4 md:p-6 rounded-lg ${className}`}>
      <h3 className={`text-sm md:text-base font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
        {title}
      </h3>
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{value}</div>
    </div>
  );
};

const PeriodSelector = ({ periods, selectedPeriod, onPeriodChange }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 max-w-md">
    {periods.map((period) => (
      <button
        key={period}
        onClick={() => onPeriodChange(period)}
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
);

const Chart = ({ data }) => (
  <div className="relative">
    <div className="flex items-end justify-between space-x-2 md:space-x-4 h-32 md:h-40">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="relative w-full flex justify-center mb-2">
            <span className="text-xs md:text-sm text-gray-600">{item.value}</span>
          </div>
          <div 
            className={`w-full max-w-8 md:max-w-12 rounded-t ${item.color} ${item.height} transition-all duration-300`}
          ></div>
          <div className="mt-2 md:mt-3">
            <span className="text-xs md:text-sm text-gray-600 font-medium">{item.month}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 md:py-16">
    <div className="text-center mb-6">
      <p className="text-gray-600 text-sm md:text-base mb-4">
        Looks like you don't have any products yet
      </p>
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
        <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      </div>
    </div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      <span>Add Product</span>
    </button>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="text-center">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-xs md:text-sm mb-2">
        {product.price}
      </p>
      <div className="flex items-center justify-center space-x-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="text-xs md:text-sm text-gray-600">
        Revenue: ₹{product.revenue.toLocaleString()}
      </div>
    </div>
  </div>
);

const ProductsList = ({ products }) => (
  <div className="space-y-4 md:space-y-6">
    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
      Revenue by Product
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

// Controller Component
const TotalRevenueController = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [hasProducts, setHasProducts] = useState(true); // Toggle this to show empty/populated state

  const periods = ['Daily', 'Weekly', 'Monthly'];
  const stats = RevenueDataModel.getStats();
  const chartData = RevenueDataModel.getChartData();
  const products = hasProducts ? RevenueDataModel.getProducts() : [];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // In real app, this would trigger API call to fetch data for selected period
  };

  const toggleProductState = () => {
    setHasProducts(!hasProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Debug Toggle Button - Remove in production */}
      {/* <div className="mb-4">
        <button 
          onClick={toggleProductState}
          className="bg-purple-500 text-white px-4 py-2 rounded text-sm"
        >
          Toggle: {hasProducts ? 'Show Empty State' : 'Show Products'}
        </button>
      </div> */}

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Total Revenue</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue}`} variant="dark" />
          <StatsCard title="Total Refunds" value={`₹${stats.totalRefunds}`} variant="light" />
        </div>

        {/* Period Selector */}
        <PeriodSelector 
          periods={periods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

        {/* High/Low Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <div>
            <span className="text-gray-600 text-sm md:text-base">High:</span>
            <span className="font-semibold text-gray-900 ml-1">{stats.highPeriod}</span>
          </div>
          <div>
            <span className="text-gray-600 text-sm md:text-base">Low:</span>
            <span className="font-semibold text-gray-900 ml-1">{stats.lowPeriod}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg p-4 md:p-6">
          <Chart data={chartData} />
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg p-4 md:p-6">
          {products.length > 0 ? (
            <ProductsList products={products} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalRevenueController;