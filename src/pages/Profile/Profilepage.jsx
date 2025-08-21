import React, { useState } from 'react';

const Profilepage = () => {
  const [activeSection, setActiveSection] = useState('vendor');
  const [isEditing, setIsEditing] = useState(false);

  // Static profile data
  const profileData = {
    name: "Somesh",
    location: "Rajasthan, India",
    profileImage: "/api/placeholder/120/120",
    coverImage: "/api/placeholder/800/200"
  };

  // Navigation tabs
  const tabs = [
    { id: 'account', label: 'Account Preferences' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'shop', label: 'Shop' },
    { id: 'payout', label: 'Payout details' },
    { id: 'rating', label: 'Rating and review' },
    { id: 'support', label: 'Support' }
  ];

  // Handle edit/save functionality
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving changes...');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Different form sections
  const renderFormSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 2xl:gap-12">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your first Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Id</label>
                <input
                  type="email"
                  placeholder="Email Id"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Enter password</label>
                <input
                  type="password"
                  placeholder="Password"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2 lg:col-span-2 2xl:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  placeholder="Address"
                  rows="3"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>
        );

      case 'vendor':
        return (
          <div className="w-full ">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Who do you sell for?</h3>
              <div className="flex flex-wrap gap-3">
                <span className={`px-6 py-3 rounded-full text-sm cursor-pointer transition-colors ${
                  isEditing ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-700'
                }`}>Men</span>
                <span className={`px-6 py-3 rounded-full text-sm cursor-pointer transition-colors ${
                  isEditing ? 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white' : 'bg-gray-100 text-gray-700'
                }`}>Women</span>
                <span className={`px-6 py-3 rounded-full text-sm cursor-pointer transition-colors ${
                  isEditing ? 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white' : 'bg-gray-100 text-gray-700'
                }`}>Kids</span>
                <span className={`px-6 py-3 rounded-full text-sm cursor-pointer transition-colors ${
                  isEditing ? 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white' : 'bg-gray-100 text-gray-700'
                }`}>Unisex</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12">
              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-900">Select Categories</h4>
                <div className="space-y-3">
                  <button 
                    disabled={!isEditing}
                    className={`w-full px-6 py-4 rounded-lg transition-colors font-medium ${
                      isEditing 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-blue-400 text-white cursor-not-allowed'
                    }`}
                  >
                    Clothing
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`w-full px-6 py-4 rounded-lg transition-colors font-medium ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Accessories
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-900">Design Type</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                      isEditing 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-blue-400 text-white cursor-not-allowed'
                    }`}
                  >
                    Type 1
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Type 2
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-900">Material Type</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-blue-400 text-white cursor-not-allowed'
                    }`}
                  >
                    Cotton Lycra
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Material 2
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Material 3
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-900">Dress Type</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-blue-400 text-white cursor-not-allowed'
                    }`}
                  >
                    Western/Light
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Western 2
                  </button>
                  <button 
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Western 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'shop':
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 2xl:gap-12">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                <input
                  type="text"
                  placeholder="Your first Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">GSTN Number</label>
                <input
                  type="text"
                  placeholder="Your first Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  placeholder="First Id"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business Type</label>
                <input
                  type="text"
                  placeholder="Business"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2 lg:col-span-2 2xl:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  placeholder="Address"
                  rows="3"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>
        );

      case 'payout':
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Bank</label>
                <input
                  type="text"
                  placeholder="Your first Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Bank Address</label>
                <input
                  type="text"
                  placeholder="Your first Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Account Holder Number</label>
                <input
                  type="text"
                  placeholder="Account holder Name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                <input
                  type="text"
                  placeholder="Bank Account Number"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    !isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div className="w-full space-y-10">
            <div className="flex flex-col xl:flex-row xl:items-start xl:space-x-16 space-y-8 xl:space-y-0">
              <div className="text-center xl:text-left">
                <div className="text-6xl font-bold text-gray-900 mb-4">4.5</div>
                <div className="flex items-center justify-center xl:justify-start mb-4">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <svg className="w-6 h-6 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
                <div className="text-base text-gray-600">120 reviews</div>
              </div>

              <div className="flex-1 max-w-md">
                <div className="space-y-3">
                  {[
                    { stars: 5, percentage: 40, color: 'bg-gray-800' },
                    { stars: 4, percentage: 30, color: 'bg-gray-600' },
                    { stars: 3, percentage: 15, color: 'bg-gray-400' },
                    { stars: 2, percentage: 10, color: 'bg-gray-300' },
                    { stars: 1, percentage: 5, color: 'bg-gray-200' }
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center space-x-4">
                      <span className="text-sm w-3">{item.stars}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${item.color} transition-all duration-300`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-10">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-medium text-gray-900 mb-6">Dress Type Ratings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { type: 'Casual', count: '4.2 stars', reviews: '15 reviews' },
                  { type: 'Formal', count: '4.5 stars', reviews: '25 reviews' },
                  { type: 'Party', count: '4.8 stars', reviews: '8 reviews' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <span className="font-medium text-gray-900">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{item.count}</div>
                      <div className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">{item.reviews}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900">Support</h3>
            <p className="text-gray-600 mt-3 text-lg">Contact support for assistance</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header with cover image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 w-full">
        <img 
          src="/api/placeholder/1920/400" 
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Profile section */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 lg:px-8 xl:px-12 pb-6">
          <div className="flex items-end space-x-6">
            <div className="relative">
              <img
                src="/api/placeholder/140/140"
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div className="text-white pb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{profileData.name}</h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-200">{profileData.location}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 bg-white bg-opacity-20 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base backdrop-blur-sm hover:bg-opacity-30 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-10">
          <nav className="flex space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-16 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm lg:text-base whitespace-nowrap transition-colors ${
                  activeSection === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 lg:p-10 xl:p-12 w-full">
          {renderFormSection()}
          
          {/* Action Buttons */}
          {activeSection !== 'rating' && (
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="w-full sm:w-auto px-8 lg:px-10 py-3 lg:py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-base lg:text-lg"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-8 lg:px-10 py-3 lg:py-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors text-base lg:text-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="w-full sm:w-auto px-8 lg:px-10 py-3 lg:py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-base lg:text-lg"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profilepage;