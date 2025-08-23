import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - replace with actual API call later
const mockProductData = {
  totalProducts: 360,
  lastAdded: "12/07/2025",
  categoryBreakdown: {
    women: 120,
    men: 120,
    kids: 120
  },
  topPerformingProducts: [
    {
      id: 1,
      name: "Kids top and bottom",
      image: "/api/placeholder/60/60",
      category: "kids"
    },
    {
      id: 2,
      name: "Hoodies",
      image: "/api/placeholder/60/60",
      category: "clothing"
    },
    {
      id: 3,
      name: "Kids bottom wear",
      image: "/api/placeholder/60/60",
      category: "kids"
    }
  ],
  categoryWiseProducts: [
    {
      id: 1,
      name: "Sarees",
      items: 17,
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Lehenga",
      items: 12,
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Kids wear",
      items: 32,
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "Kids wear",
      items: 32,
      image: "/api/placeholder/60/60"
    },
    {
      id: 5,
      name: "Mens wear",
      items: 25,
      image: "/api/placeholder/60/60"
    },
    {
      id: 6,
      name: "Mens wear",
      items: 25,
      image: "/api/placeholder/60/60"
    }
  ]
};

// API functions (ready for future implementation)
const fetchProductData = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductData), 500);
  });
};

const ProductsPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    setLoading(true);
    try {
      const data = await fetchProductData();
      setProductData(data);
    } catch (error) {
      console.error('Failed to load product data:', error);
      setProductData(mockProductData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProducts = () => {
    console.log('Add products clicked');
    // Add your navigation logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Total Products Card */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <Link to={"/recenltyproducts"}>
            <div className="relative z-10" >
              <h2 className="text-lg md:text-xl font-semibold mb-2" >Total Products</h2>
              <div className="mb-4">
                <p className="text-sm opacity-90">Last added</p>
                <p className="text-sm opacity-90">{productData.lastAdded}</p>
              </div>
              <div className="text-5xl md:text-6xl font-bold mb-4">
                {productData.totalProducts}
              </div>
            </div>
            </Link>
            
            {/* Family Image */}
            <div className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 opacity-80">
              <div className="w-full h-full bg-gradient-to-t from-white/20 to-transparent rounded-tl-full flex items-end justify-center pb-2">
                <div className="text-4xl">👨‍👩‍👧‍👦</div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            {/* Women */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">Women</h3>
                <span className="text-2xl md:text-3xl font-bold">{productData.categoryBreakdown.women}</span>
              </div>
            </div>

            {/* Men */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">Men</h3>
                <span className="text-2xl md:text-3xl font-bold">{productData.categoryBreakdown.men}</span>
              </div>
            </div>

            {/* Kids */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">Kids</h3>
                <span className="text-2xl md:text-3xl font-bold">{productData.categoryBreakdown.kids}</span>
              </div>
            </div>
          </div>

          {/* Add Products Button */}
          <Link to={"/upload-products"}>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white flex flex-col items-center justify-center cursor-pointer hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
               onClick={handleAddProducts}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300">
              <Plus className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-center">Add Products</h3>
          </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Top Performing Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Top Performing Products</h2>
            
            <div className="space-y-4">
              {productData.topPerformingProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded opacity-80"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">{product.name}</h4>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Category Wise Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Category Wise products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productData.categoryWiseProducts.map((category) => (
                <div key={category.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm md:text-base">{category.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{category.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;