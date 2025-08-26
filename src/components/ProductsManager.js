// components/ProductsManager.js
import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import firebaseService from '../SERVICES/firebaseService';
import { useProductSubmission } from '../hooks/useProductSubmission';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { isSubmitting, submitStatus, submitMessage, clearStatus } = useProductSubmission();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedProducts = await firebaseService.getAllProducts();
      setProducts(fetchedProducts);
      console.log('Fetched products:', fetchedProducts);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      console.log('Deleting product:', productId);
      
      const result = await firebaseService.deleteProduct(productId);
      
      if (result.success) {
        // Remove product from local state
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        setShowDeleteConfirm(false);
        setProductToDelete(null);
        
        // Show success message
        alert('Product deleted successfully!');
      }
      
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  // Handle product status toggle (publish/unpublish)
  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      
      const result = await firebaseService.toggleProductStatus(productId, newStatus);
      
      if (result.success) {
        // Update local state
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === productId
              ? { ...product, isPublished: newStatus }
              : product
          )
        );
        
        alert(`Product ${newStatus ? 'published' : 'unpublished'} successfully!`);
      }
      
    } catch (error) {
      console.error('Error updating product status:', error);
      alert(`Failed to update product status: ${error.message}`);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return '$0';
    return `$${parseFloat(price).toLocaleString()}`;
  };

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    let date;
    if (timestamp.seconds) {
      // Firestore Timestamp
      date = new Date(timestamp.seconds * 1000);
    } else {
      // Regular timestamp
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Products Manager</h1>
            <p className="text-gray-600 mt-1">
              Manage your product inventory ({products.length} products)
            </p>
          </div>
          
          <button
            onClick={fetchProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg border ${
            submitStatus === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">
                {submitStatus === 'success' ? 'Success!' : 'Error'}
              </span>
            </div>
            <p className="mt-1 text-sm">{submitMessage}</p>
            <button
              onClick={clearStatus}
              className="mt-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't created any products yet. Start by adding your first product.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square relative">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img
                      src={product.imageUrls[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.title || 'Untitled Product'}
                  </h3>
                  
                  <div className="space-y-1 mb-3">
                    <p className="text-sm text-gray-600">{product.category || 'No Category'}</p>
                    <p className="text-sm text-gray-600">{product.dressType || 'No Type'}</p>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Created: {formatDate(product.timestamp)}</span>
                    <span>{product.imageUrls?.length || 0} images</span>
                  </div>

                  {/* Product Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600 mb-4">
                    <div>
                      <div className="font-semibold">{product.selectedSizes?.length || 0}</div>
                      <div>Sizes</div>
                    </div>
                    <div>
                      <div className="font-semibold">{product.selectedColors?.length || 0}</div>
                      <div>Colors</div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {Object.values(product.units || {}).reduce((sum, val) => sum + val, 0)}
                      </div>
                      <div>Units</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-2 rounded transition-colors flex items-center justify-center"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    
                    <button
                      onClick={() => handleToggleStatus(product.id, product.isPublished)}
                      className={`flex-1 text-xs px-3 py-2 rounded transition-colors flex items-center justify-center ${
                        product.isPublished
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {product.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteConfirm(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && productToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-lg font-semibold">Delete Product</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{productToDelete.title}"? 
                This action cannot be undone and will also delete all associated images.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(productToDelete.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Product Details</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Images */}
                  <div>
                    <h3 className="font-medium mb-3">Images ({selectedProduct.imageUrls?.length || 0})</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.imageUrls?.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <p className="text-gray-900">{selectedProduct.title}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <p className="text-gray-900 font-semibold">{formatPrice(selectedProduct.price)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <p className="text-gray-900">{selectedProduct.category}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Sizes</label>
                        <p className="text-gray-900">{selectedProduct.selectedSizes?.join(', ') || 'None'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Colors</label>
                        <p className="text-gray-900">{selectedProduct.selectedColors?.join(', ') || 'None'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        selectedProduct.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedProduct.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created</label>
                      <p className="text-gray-600 text-sm">{formatDate(selectedProduct.timestamp)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;