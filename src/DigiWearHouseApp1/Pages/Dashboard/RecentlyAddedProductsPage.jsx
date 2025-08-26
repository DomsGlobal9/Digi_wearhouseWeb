import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import firebaseService from '../../../SERVICES/firebaseService';

const RecentlyAddedProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('women');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' }
  ];

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    filterProductsByCategory(activeCategory);
  }, [activeCategory, products]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all recently added products...');
      
      // Fetch all published products
      const allProducts = await firebaseService.getAllProducts();
      
      // Filter only published products and sort by creation date (most recent first)
      const publishedProducts = allProducts
        .filter(product => product.isPublished === true)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA; // Most recent first
        });
      
      console.log('Fetched products:', publishedProducts);
      setProducts(publishedProducts);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const filterProductsByCategory = (category) => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [];
    
    switch (category.toLowerCase()) {
      case 'women':
        filtered = products.filter(product => 
          product.category?.toLowerCase() === 'women' || 
          product.category?.toLowerCase() === 'woman' ||
          product.dressType?.toLowerCase().includes('women') ||
          product.tags?.some(tag => tag.toLowerCase().includes('women'))
        );
        break;
      case 'men':
        filtered = products.filter(product => 
          product.category?.toLowerCase() === 'men' || 
          product.category?.toLowerCase() === 'man' ||
          product.dressType?.toLowerCase().includes('men') ||
          product.tags?.some(tag => tag.toLowerCase().includes('men'))
        );
        break;
      case 'kids':
        filtered = products.filter(product => 
          product.category?.toLowerCase() === 'kids' || 
          product.category?.toLowerCase() === 'children' ||
          product.category?.toLowerCase() === 'child' ||
          product.dressType?.toLowerCase().includes('kids') ||
          product.tags?.some(tag => tag.toLowerCase().includes('kids'))
        );
        break;
      default:
        filtered = products;
    }

    console.log(`Filtered products for ${category}:`, filtered);
    setFilteredProducts(filtered);
    setCurrentPage(0); // Reset to first page when filtering
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredProducts.length / getItemsPerPage()) - 1;
    setCurrentPage(prev => Math.min(maxPage, prev + 1));
  };

  const getItemsPerPage = () => {
    // Responsive items per page
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 8; // xl
      if (window.innerWidth >= 1024) return 6; // lg
      if (window.innerWidth >= 768) return 4;  // md
    }
    return 2; // sm and default
  };

  const getCurrentPageProducts = () => {
    const itemsPerPage = getItemsPerPage();
    const startIndex = currentPage * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / getItemsPerPage());

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center space-x-1 bg-white rounded-full p-1 shadow-sm">
              {categories.map((category) => (
                <div key={category.id} className="px-4 sm:px-6 py-2 rounded-full">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
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
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                {/* Show count for each category */}
                <span className="ml-2 text-xs opacity-75">
                  ({category.id === 'women' ? 
                    products.filter(p => p.category?.toLowerCase() === 'women' || p.category?.toLowerCase() === 'woman').length :
                    category.id === 'men' ?
                    products.filter(p => p.category?.toLowerCase() === 'men' || p.category?.toLowerCase() === 'man').length :
                    products.filter(p => p.category?.toLowerCase() === 'kids' || p.category?.toLowerCase() === 'children').length
                  })
                </span>
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
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Recently added products
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} {activeCategory} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {/* Navigation Arrows */}
          {filteredProducts.length > 0 && (
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
                disabled={currentPage >= totalPages - 1 || totalPages <= 1}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  currentPage >= totalPages - 1 || totalPages <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {getCurrentPageProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {activeCategory} products found
            </h3>
            <p className="text-gray-600 mb-6">
              There are no recently added products in the {activeCategory} category yet.
            </p>
            <button 
              onClick={fetchAllProducts}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh Products
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages} • {filteredProducts.length} products in {activeCategory}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedProductsPage;