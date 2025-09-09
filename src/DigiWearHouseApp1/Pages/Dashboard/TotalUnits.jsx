// import React, { useState } from 'react';

// // Model - Data layer
// const DataModel = {
//   // Static data - replace with API calls later
//   getProducts: () => [
//     {
//       id: 1,
//       name: "Black Sweatshirt",
//       price: "₹999 May 6, 2024",
//       rating: 4.5,
//       reviews: 12,
//       image: "/api/placeholder/150/150",
//       unitsSold: 25
//     },
//     {
//       id: 2,
//       name: "Blue Sweatshirt",
//       price: "₹899 May 7, 2024",
//       rating: 4.2,
//       reviews: 8,
//       image: "/api/placeholder/150/150",
//       unitsSold: 18
//     },
//     {
//       id: 3,
//       name: "T-Shirt May 6, 2024",
//       price: "₹599",
//       rating: 4.0,
//       reviews: 15,
//       image: "/api/placeholder/150/150",
//       unitsSold: 30
//     },
//     {
//       id: 4,
//       name: "Sweatshirt",
//       price: "₹1099 May 8, 2024",
//       rating: 4.8,
//       reviews: 20,
//       image: "/api/placeholder/150/150",
//       unitsSold: 12
//     }
//   ],

//   getChartData: () => [
//     { month: 'May', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Jun', value: 0, color: 'bg-blue-400', height: 'h-12' },
//     { month: 'Jul', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Aug', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Sep', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Oct', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Nov', value: 0, color: 'bg-gray-200', height: 'h-8' },
//     { month: 'Dec', value: 0, color: 'bg-slate-600', height: 'h-24' },
//     { month: 'Jan', value: 0, color: 'bg-gray-200', height: 'h-8' }
//   ],

//   getStats: () => ({
//     totalSales: 0,
//     totalUnits: 0,
//     highPeriod: "DEC - ₹0",
//     lowPeriod: "JUN - ₹0"
//   })
// };

// // View Components
// const StatsCard = ({ title, value, variant = "dark", className = "" }) => {
//   const isDark = variant === "dark";
//   const bgClass = isDark ? "bg-slate-600 text-white" : "bg-white text-gray-900 border border-gray-200";
  
//   return (
//     <div className={`${bgClass} p-4 md:p-6 rounded-lg ${className}`}>
//       <h3 className={`text-sm md:text-base font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
//         {title}
//       </h3>
//       <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{value}</div>
//     </div>
//   );
// };

// const PeriodSelector = ({ periods, selectedPeriod, onPeriodChange }) => (
//   <div className="flex bg-gray-100 rounded-lg p-1 w-2/3 ">
//     {periods.map((period) => (
//       <button
//         key={period}
//         onClick={() => onPeriodChange(period)}
//         className={`flex-1 px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
//           selectedPeriod === period
//             ? 'bg-blue-400 text-white'
//             : 'text-gray-600 hover:text-gray-800'
//         }`}
//       >
//         {period}
//       </button>
//     ))}
//   </div>
// );

// const Chart = ({ data }) => (
//   <div className="relative">
//     <div className="flex items-end justify-between space-x-2 md:space-x-4 h-32 md:h-40">
//       {data.map((item, index) => (
//         <div key={index} className="flex flex-col items-center flex-1">
//           <div className="relative w-full flex justify-center mb-2">
//             <span className="text-xs md:text-sm text-gray-600">{item.value}</span>
//           </div>
//           <div 
//             className={`w-full max-w-8 md:max-w-12 rounded-t ${item.color} ${item.height} transition-all duration-300`}
//           ></div>
//           <div className="mt-2 md:mt-3">
//             <span className="text-xs md:text-sm text-gray-600 font-medium">{item.month}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const EmptyState = () => (
//   <div className="flex flex-col items-center justify-center py-12 md:py-16">
//     <div className="text-center mb-6">
//       <p className="text-gray-600 text-sm md:text-base mb-4">
//         Looks like you don't have any products yet
//       </p>
//       <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
//         <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
//         </svg>
//       </div>
//     </div>
//     <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
//       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//       </svg>
//       <span>Add Product</span>
//     </button>
//   </div>
// );

// const ProductCard = ({ product }) => (
//   <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//     <div className="flex items-start space-x-4">
//       <img 
//         src={product.image} 
//         alt={product.name}
//         className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-100"
//       />
//       <div className="flex-1 min-w-0">
//         <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1 truncate">
//           {product.name}
//         </h3>
//         <p className="text-gray-600 text-xs md:text-sm mb-2">
//           {product.price}
//         </p>
//         <div className="flex items-center space-x-4 text-xs md:text-sm">
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <svg 
//                   key={i} 
//                   className={`w-3 h-3 md:w-4 md:h-4 ${
//                     i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
//                   }`} 
//                   fill="currentColor" 
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="text-gray-600">{product.rating}</span>
//           </div>
//           <span className="text-gray-600">({product.reviews})</span>
//         </div>
//       </div>
//       <div className="text-right">
//         <div className="text-lg md:text-xl font-bold text-gray-900">
//           {product.unitsSold}
//         </div>
//         <div className="text-xs md:text-sm text-gray-600">units sold</div>
//       </div>
//     </div>
//   </div>
// );

// const ProductsList = ({ products }) => (
//   <div className="space-y-4">
//     <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
//       Highest Revenue Products
//     </h3>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   </div>
// );

// // Controller Component
// const TotalUnitsSoldController = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
//   const [hasProducts, setHasProducts] = useState(true); // Toggle this to show empty/populated state

//   const periods = ['Daily', 'Weekly', 'Monthly'];
//   const stats = DataModel.getStats();
//   const chartData = DataModel.getChartData();
//   const products = hasProducts ? DataModel.getProducts() : [];

//   const handlePeriodChange = (period) => {
//     setSelectedPeriod(period);
//     // In real app, this would trigger API call to fetch data for selected period
//   };

//   const toggleProductState = () => {
//     setHasProducts(!hasProducts);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//       {/* Debug Toggle Button - Remove in production */}
//       <div className="mb-4">
//         <button 
//           onClick={toggleProductState}
//           className="bg-purple-500 text-white px-4 py-2 rounded text-sm"
//         >
//           Toggle: {hasProducts ? 'Show Empty State' : 'Show Products'}
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           <StatsCard title="Total Sales" value={`₹${stats.totalSales}`} variant="dark" />
//           <StatsCard title="Total Units sold" value={stats.totalUnits} variant="light" />
//         </div>

//         {/* Period Selector */}
//         <PeriodSelector 
//           periods={periods}
//           selectedPeriod={selectedPeriod}
//           onPeriodChange={handlePeriodChange}
//         />

//         {/* High/Low Stats */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
//           <div>
//             <span className="text-gray-600 text-sm md:text-base">High:</span>
//             <span className="font-semibold text-gray-900 ml-1">{stats.highPeriod}</span>
//           </div>
//           <div>
//             <span className="text-gray-600 text-sm md:text-base">Low:</span>
//             <span className="font-semibold text-gray-900 ml-1">{stats.lowPeriod}</span>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="bg-white rounded-lg p-4 md:p-6">
//           <Chart data={chartData} />
//         </div>

//         {/* Products Section */}
//         <div className="bg-white rounded-lg p-4 md:p-6">
//           {products.length > 0 ? (
//             <ProductsList products={products} />
//           ) : (
//             <EmptyState />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalUnitsSoldController;


import React, { useState } from 'react';
import img1 from "../../../assets/tailor4.png"
import ic_product from "../../../assets/Ic_product.jpg"
import right_arrow from "../../../assets/right_arrow.jpg"
import { ArrowRight } from "lucide-react"; // optional if you want icons


// Model - Data layer
const DataModel = {
  // Static data - replace with API calls later
  getProducts: () => [
    {
      id: 1,
      name: "Black Sweatshirt",
      price: "999 ",
      rating: 4.5,
      reviews: 12,
      image: "/api/placeholder/150/150",
      unitsSold: 25,
      src : img1
    },
    {
      id: 2,
      name: "Blue Sweatshirt",
      price: "899 ",
      rating: 4.2,
      reviews: 8,
      image: "/api/placeholder/150/150",
      unitsSold: 18,
      src: img1
    },
    {
      id: 3,
      name: "T-Shirt May 6, 2024",
      price: "599",
      rating: 4.0,
      reviews: 15,
      image: "/api/placeholder/150/150",
      unitsSold: 30,
      src: img1
    },
    {
      id: 4,
      name: "Sweatshirt",
      price: "1099 ",
      rating: 4.8,
      reviews: 20,
      image: "/api/placeholder/150/150",
      unitsSold: 12
      ,src: img1
    }
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
    totalSales: 0,
    totalUnits: 0,
    highPeriod: "DEC - ₹0",
    lowPeriod: "JUN - ₹0"
  })
};

// View Components
const StatsCard = ({ title, value, variant = "dark", className = "" }) => {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-[#284F5E] text-white" : "bg-white text-gray-900 border border-gray-200";
  
  return (
    <div className={`${bgClass} p-4 md:p-6 rounded-lg ${className}`}>
      <h3 className={`text-start text-lg md:text-base font-bold   mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
        {title}
      </h3>
      <div className="text-2xl text-start md:text-3xl lg:text-4xl font-bold">{value}</div>
    </div>
  );
};

const PeriodSelector = ({ periods, selectedPeriod, onPeriodChange }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 w-2/3 ">
    {periods.map((period) => (
      <button
        key={period}
        onClick={() => onPeriodChange(period)}
        className={`flex-1 px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
          selectedPeriod === period
            ? 'bg-[#7DBBD1] text-white'
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

const ProductCard = ({ product }) => {
  return (
    <div className="flex items-center p-7 justify-between bg-white  rounded-2xl  hover:shadow-md transition-all duration-300">
      
      {/* Left section */}
      <div className="flex flex-col justify-between flex-1 pr-4">
        <h3 className="font-medium text-gray-900 text-start text-sm md:text-base mb-3 truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-16  mb-4">
          {/* Price */}
          <div className="flex flex-col items-center text-gray-700">
            <img src={ic_product} alt="" className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium text-gray-900">
              ₹{product.price}
            </span>
          </div>

          {/* Units sold */}
          <div className="flex flex-col items-center text-gray-700">
            <img src={ic_product} alt="" className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium">{product.unitsSold}</span>
          </div>
        </div>

        {/* Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 w-fit rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 transition">
          View Product
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Right section (Image) */}
      <div className="flex-shrink-0 ">
        <img
          src={product.src}
          alt={product.name}
          className="h-32 w-56 md:h-36  object-cover rounded-xl"
        />
      </div>
    </div>
  );
};
// const ProductCard = ({ product }) => (
//   <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//     <div className="flex items-start space-x-4">
//       <img 
//         src={product.image} 
//         alt={product.name}
//         className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-100"
//       />
//       <div className="flex-1 min-w-0">
//         <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1 truncate">
//           {product.name}
//         </h3>
//         <p className="text-gray-600 text-xs md:text-sm mb-2">
//           {product.price}
//         </p>
//         <div className="flex items-center space-x-4 text-xs md:text-sm">
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <svg 
//                   key={i} 
//                   className={`w-3 h-3 md:w-4 md:h-4 ${
//                     i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
//                   }`} 
//                   fill="currentColor" 
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="text-gray-600">{product.rating}</span>
//           </div>
//           <span className="text-gray-600">({product.reviews})</span>
//         </div>
//       </div>
//       <div className="text-right">
//         <div className="text-lg md:text-xl font-bold text-gray-900">
//           {product.unitsSold}
//         </div>
//         <div className="text-xs md:text-sm text-gray-600">units sold</div>
//       </div>
//     </div>
//   </div>
// );

const ProductsList = ({ products }) => (
  <div className="space-y-4">
    <h3 className="text-lg md:text-xl font-semibold text-start text-gray-900 mb-4">
Most Sold Products
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

// Controller Component
const TotalUnitsSoldController = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [hasProducts, setHasProducts] = useState(true); // Toggle this to show empty/populated state

  const periods = ['Daily', 'Weekly', 'Monthly'];
  const stats = DataModel.getStats();
  const chartData = DataModel.getChartData();
  const products = hasProducts ? DataModel.getProducts() : [];

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
      {/* <div className="mb-4"> */}
        {/* <button 
          onClick={toggleProductState}
          className="bg-purple-500 text-white px-4 py-2 rounded text-sm"
        >
          Toggle: {hasProducts ? 'Show Empty State' : 'Show Products'}
        </button>
      </div> */}
 
 {/* <div> */}
  <p className='text-black max-w-7xl mx-auto space-y-6 mt-7 md:space-y-8  text-start font-semi-bold font-medium  text-xl'>Total Units Sold</p>
 {/* </div> */}
      <div className="max-w-7xl mx-auto space-y-6 mt-7 md:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatsCard title="Total Sales" value={`₹${stats.totalSales}`} variant="dark" />
          <StatsCard title="Total Units sold" value={stats.totalUnits} variant="light" />
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

export default TotalUnitsSoldController;