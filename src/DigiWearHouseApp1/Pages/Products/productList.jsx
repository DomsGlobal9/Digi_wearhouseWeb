import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/Context';
import firebaseService from '../../../SERVICES/firebaseService';
import { Package, Edit, Trash2, Eye, MoreHorizontal, Plus } from 'lucide-react';

export default function UserProductsList() {
  const { currentUser } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch user's products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentUser) {
        setError('Please log in to view your products');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching products for user:', currentUser.uid);
        
        const userProducts = await firebaseService.getUserProducts(currentUser.uid);
        
        console.log('Fetched products:', userProducts);
        setProducts(userProducts);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser]);

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!selectedProduct || !currentUser) return;

    try {
      await firebaseService.deleteUserProduct(currentUser.uid, selectedProduct.id);
      
      // Remove product from local state
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      
      // Close confirmation dialog
      setShowDeleteConfirm(false);
      setSelectedProduct(null);
      
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  // Handle product status toggle
  const handleToggleStatus = async (product) => {
    try {
      const newStatus = !product.isPublished;
      await firebaseService.toggleUserProductStatus(currentUser.uid, product.id, newStatus);
      
      // Update local state
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, isPublished: newStatus }
          : p
      ));
      
      alert(`Product ${newStatus ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error('Error updating product status:', error);
      alert(`Failed to update product status: ${error.message}`);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your products...</p>
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
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
              <p className="text-gray-600">Manage your product listings</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Empty state */}
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first product to the catalog</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Add Your First Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} • User: {currentUser?.email}
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    product.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                  <div className="relative group">
                    <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(product)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Package className="w-4 h-4" />
                          <span>{product.isPublished ? 'Unpublish' : 'Publish'}</span>
                        </button>
                        <hr className="my-1" />
                        <button 
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteConfirm(true);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {product.title || 'Untitled Product'}
                </h3>
                
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600">{product.category || 'Uncategorized'}</p>
                  <p className="text-sm text-gray-600">{product.dressType || 'No Type'}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price || '0'}
                    </span>
                    <div className="text-xs text-gray-500">
                      {product.imageUrls?.length || 0} image{product.imageUrls?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      Created {formatDate(product.createdAt)}
                    </div>
                    {product.selectedSizes && product.selectedSizes.length > 0 && (
                      <div className="text-xs text-gray-500">
                        Sizes: {product.selectedSizes.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete "{selectedProduct.title}"? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}