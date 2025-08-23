import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import React from "react";
import { useState,useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import {mockProductData} from "../../components/ProductCard";

const RecentlyAddedProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('women');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' }
  ];

  useEffect(() => {
    loadProducts(activeCategory);
  }, [activeCategory]);

  const loadProducts = async (category) => {
    setLoading(true);
    try {
      const data = await fetchProductsByCategory(category);
      setProducts(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts(mockProductData[category] || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(products.length / getItemsPerPage()) - 1;
    setCurrentPage(prev => Math.min(maxPage, prev + 1));
  };

  const getItemsPerPage = () => {
    // Responsive items per page
    if (window.innerWidth >= 1280) return 8; // xl
    if (window.innerWidth >= 1024) return 6; // lg
    if (window.innerWidth >= 768) return 4;  // md
    return 2; // sm
  };

  const getCurrentPageProducts = () => {
    const itemsPerPage = getItemsPerPage();
    const startIndex = currentPage * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(products.length / getItemsPerPage());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header with Category Tabs and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 bg-white rounded-full p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        {/* Page Title and Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Recently added products
          </h1>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full transition-colors duration-200 ${
                currentPage === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`p-2 rounded-full transition-colors duration-200 ${
                currentPage >= totalPages - 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-[4/5] bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {getCurrentPageProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No products found</div>
            <div className="text-gray-500 text-sm">Try selecting a different category</div>
          </div>
        )}

        {/* Pagination Info */}
        {!loading && products.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages} • {products.length} total products
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedProductsPage;