import React, { useState } from 'react';

// Model - Data layer
const InventoryDataModel = {
  // Static data - replace with API calls later
  getLowStockProducts: () => [
    {
      id: 1,
      name: "Kala Lehenga",
      color: "Black",
      stock: 2,
      image: "/api/placeholder/60/60",
      category: "Lehenga"
    },
    {
      id: 2,
      name: "Blue Lehenga",
      color: "Blue", 
      stock: 1,
      image: "/api/placeholder/60/60",
      category: "Lehenga"
    }
  ],

  getOutOfStockProducts: () => [
    {
      id: 3,
      name: "Cotton saree",
      color: "Multicolor",
      stock: 0,
      image: "/api/placeholder/60/60",
      category: "Saree"
    },
    {
      id: 4,
      name: "Cotton saree",
      color: "Red",
      stock: 0,
      image: "/api/placeholder/60/60", 
      category: "Saree"
    }
  ],

  getInventoryByCategory: () => [
    {
      category: "Lehenga",
      items: [
        { id: 1, name: "Blue Lehenga", stock: 15, image: "/api/placeholder/60/60" },
        { id: 2, name: "Red Lehenga", stock: 8, image: "/api/placeholder/60/60" },
        { id: 3, name: "Pink Lehenga", stock: 12, image: "/api/placeholder/60/60" },
        { id: 4, name: "Green Lehenga", stock: 6, image: "/api/placeholder/60/60" }
      ]
    },
    {
      category: "Saree", 
      items: [
        { id: 5, name: "Silk Saree", stock: 10, image: "/api/placeholder/60/60" },
        { id: 6, name: "Cotton Saree", stock: 14, image: "/api/placeholder/60/60" },
        { id: 7, name: "Designer Saree", stock: 7, image: "/api/placeholder/60/60" },
        { id: 8, name: "Party Saree", stock: 9, image: "/api/placeholder/60/60" }
      ]
    },
    {
      category: "Kurti",
      items: [
        { id: 9, name: "Cotton Kurti", stock: 20, image: "/api/placeholder/60/60" },
        { id: 10, name: "Silk Kurti", stock: 11, image: "/api/placeholder/60/60" },
        { id: 11, name: "Designer Kurti", stock: 5, image: "/api/placeholder/60/60" },
        { id: 12, name: "Casual Kurti", stock: 18, image: "/api/placeholder/60/60" }
      ]
    }
  ],

  getStats: () => ({
    totalItems: 0,
    lowStockCount: 2,
    outOfStockCount: 2
  })
};

// View Components
const StatsCard = ({ title, value, variant = "light", className = "" }) => {
  return (
    <div className={`bg-white border border-gray-200 p-4 md:p-6 rounded-lg ${className}`}>
      <h3 className="text-sm md:text-base font-medium mb-2 text-gray-700">
        {title}
      </h3>
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

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

const ProductItem = ({ product, showColor = false }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
        {product.name}
      </h4>
      {showColor && (
        <p className="text-gray-600 text-xs md:text-sm">
          {product.color}
        </p>
      )}
    </div>
    <div className="text-right flex-shrink-0">
      <div className="text-sm md:text-base font-semibold text-gray-900">
        {product.stock > 0 ? product.stock : 'Out of stock'}
      </div>
      {product.stock <= 2 && product.stock > 0 && (
        <div className="text-xs text-red-500 font-medium">Low stock</div>
      )}
      {product.stock === 0 && (
        <div className="text-xs text-red-500 font-medium">Out of stock</div>
      )}
    </div>
  </div>
);

const StockAlerts = ({ lowStockProducts, outOfStockProducts }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Stock Alerts</h3>
    
    {/* Low Stock */}
    <div className="mb-6">
      <h4 className="text-base md:text-lg font-medium text-gray-900 mb-3">Low Stock</h4>
      <div className="space-y-1">
        {lowStockProducts.map((product) => (
          <ProductItem key={product.id} product={product} showColor={true} />
        ))}
      </div>
    </div>

    {/* Out of Stock */}
    <div>
      <h4 className="text-base md:text-lg font-medium text-gray-900 mb-3">Out of Stock</h4>
      <div className="space-y-1">
        {outOfStockProducts.map((product) => (
          <ProductItem key={product.id} product={product} showColor={true} />
        ))}
      </div>
      <div className="mt-3 text-xs md:text-sm text-gray-500">
        Only shows 5 out of stock items
      </div>
    </div>
  </div>
);

const CategorySection = ({ category, items }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
      <h4 className="text-base md:text-lg font-medium text-gray-900">{category}</h4>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  </div>
);

const InventoryByCategory = ({ categories }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Inventory by Category</h3>
    
    <div className="space-y-6">
      {categories.map((categoryData) => (
        <CategorySection 
          key={categoryData.category}
          category={categoryData.category}
          items={categoryData.items}
        />
      ))}
    </div>
  </div>
);

const InventoryContent = ({ hasProducts, lowStockProducts, outOfStockProducts, categories }) => {
  if (!hasProducts) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* Left Column - Stock Alerts */}
      <div>
        <StockAlerts 
          lowStockProducts={lowStockProducts}
          outOfStockProducts={outOfStockProducts}
        />
      </div>
      
      {/* Right Column - Inventory by Category */}
      <div>
        <InventoryByCategory categories={categories} />
      </div>
    </div>
  );
};

// Controller Component
const InventoryController = () => {
  const [hasProducts, setHasProducts] = useState(true); // Toggle this to show empty/populated state

  const stats = InventoryDataModel.getStats();
  const lowStockProducts = hasProducts ? InventoryDataModel.getLowStockProducts() : [];
  const outOfStockProducts = hasProducts ? InventoryDataModel.getOutOfStockProducts() : [];
  const categories = hasProducts ? InventoryDataModel.getInventoryByCategory() : [];

  const toggleProductState = () => {
    setHasProducts(!hasProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Debug Toggle Button - Remove in production */}
      <div className="mb-4">
        <button 
          onClick={toggleProductState}
          className="bg-purple-500 text-white px-4 py-2 rounded text-sm"
        >
          Toggle: {hasProducts ? 'Show Empty State' : 'Show Products'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Inventory</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatsCard title="Total Items" value={stats.totalItems} />
          <StatsCard title="Low Stock" value={stats.lowStockCount} />
          <StatsCard title="Out of Stock" value={stats.outOfStockCount} />
        </div>

        {/* Main Content */}
        {!hasProducts ? (
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <EmptyState />
          </div>
        ) : (
          <InventoryContent 
            hasProducts={hasProducts}
            lowStockProducts={lowStockProducts}
            outOfStockProducts={outOfStockProducts}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryController;