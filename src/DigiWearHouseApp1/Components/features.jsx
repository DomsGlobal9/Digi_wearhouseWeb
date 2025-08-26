import React from 'react';

const FeatureCard = ({ title, description, buttonText, icon }) => (
  <div className="bg-blue-200 rounded-lg p-6 shadow-md max-w-sm mx-auto text-center transform transition-all duration-500 ease-in-out group relative z-10">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">{buttonText}</button>
  </div>
);

const HiddenCard = ({ title, description, className,buttonText,icon }) => (
  <div className={`bg-blue-300 rounded-lg p-6 shadow-md max-w-sm text-center absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out opacity-0 ${className} group-hover:opacity-100 group-hover:translate-x-0 z-0`}>
     <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">Try Feature</button>
  </div>
);

const FeatureSection = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Powerful Features for Indian Businesses</h2>
      <p className="text-gray-600 mb-8">Everything you need to digitize and grow your business, designed specifically for Indian market needs.</p>
      <div className="relative">
        <div className="relative inline-block group">
          <FeatureCard
            title="Real-time Analytics"
            description="Track sales, inventory levels, and profits in real-time with beautiful dashboards"
            buttonText="Try Feature"
            icon={<span className="text-2xl">📊</span>}
          />
          <HiddenCard
            title="Inventory Management"
            description="Efficiently manage your stock with real-time updates"
            className="left-0 -translate-x-full opacity-0 group-hover:opacity-100 group-hover:left-[-110%] group-hover:z-20"
              icon={<span className="text-2xl">📊</span>}
          />
          <HiddenCard
            title="Customer Insights"
            description="Gain deep insights into customer behavior and preferences"
            className="right-0 translate-x-full opacity-0 group-hover:opacity-100 group-hover:right-[-110%] group-hover:z-20"
              icon={<span className="text-2xl">📊</span>}
          />
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Why Vendors Love DVYB</h3>
        <p className="text-gray-600 mb-4">Join thousands of successful vendors who've transformed their business</p>
        <div className="flex justify-center space-x-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-800">3,157+</p>
            <p className="text-gray-600">Active Vendors</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-800">₹47Cr+</p>
            <p className="text-gray-600">Monthly Sales</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-800">4.8/5</p>
            <p className="text-gray-600">App Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;