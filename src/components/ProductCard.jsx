import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// Mock data for products
export const mockProductData = {
  women: [
    {
      id: 1,
      name: "Black Floral Top",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "women"
    },
    {
      id: 2,
      name: "Black Floral Top",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "women"
    },
    {
      id: 3,
      name: "Black Floral Top",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "women"
    },
    {
      id: 4,
      name: "Black Floral Top",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "women"
    },
    {
      id: 5,
      name: "Elegant Saree",
      image: "/api/placeholder/250/300",
      qtyAvailable: 180,
      unitsSold: 250,
      category: "women"
    },
    {
      id: 6,
      name: "Designer Kurti",
      image: "/api/placeholder/250/300",
      qtyAvailable: 200,
      unitsSold: 180,
      category: "women"
    }
  ],
  men: [
    {
      id: 7,
      name: "Casual Shirt",
      image: "/api/placeholder/250/300",
      qtyAvailable: 150,
      unitsSold: 200,
      category: "men"
    },
    {
      id: 8,
      name: "Formal Blazer",
      image: "/api/placeholder/250/300",
      qtyAvailable: 100,
      unitsSold: 150,
      category: "men"
    },
    {
      id: 9,
      name: "Cotton T-Shirt",
      image: "/api/placeholder/250/300",
      qtyAvailable: 300,
      unitsSold: 400,
      category: "men"
    },
    {
      id: 10,
      name: "Denim Jeans",
      image: "/api/placeholder/250/300",
      qtyAvailable: 120,
      unitsSold: 280,
      category: "men"
    }
  ],
  kids: [
    {
      id: 11,
      name: "Party Wear Kurthi",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "kids"
    },
    {
      id: 12,
      name: "Party Wear Kurthi",
      image: "/api/placeholder/250/300",
      qtyAvailable: 240,
      unitsSold: 320,
      category: "kids"
    },
    {
      id: 13,
      name: "Kids Casual Wear",
      image: "/api/placeholder/250/300",
      qtyAvailable: 180,
      unitsSold: 200,
      category: "kids"
    },
    {
      id: 14,
      name: "School Uniform",
      image: "/api/placeholder/250/300",
      qtyAvailable: 300,
      unitsSold: 150,
      category: "kids"
    }
  ]
};

// API function for fetching products (ready for future implementation)
const fetchProductsByCategory = async (category = 'women') => {
  try {
    // Replace with your actual API endpoint
    //const response = await axios.get(`your-api-endpoint/products?category=${category}`);
    // return response.data;
    
    // For now, return mock data with simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProductData[category] || []);
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data on error
    return mockProductData[category] || [];
  }
};

// Reusable ProductCard Component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <div className="aspect-[4/5] w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl">👗</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm mb-3 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span>Qty Available: {product.qtyAvailable}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            <span>Units Sold: {product.unitsSold}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard