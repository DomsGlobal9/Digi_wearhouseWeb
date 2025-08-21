import React, { useState } from 'react';
import { ChevronDown, Bell, User } from 'lucide-react';
import logo from '../assets/dvyb_logo.svg'; // Adjust the path to your logo
import notificationIcon from "../assets/notification-icon.svg"
import user_icon from "../assets/user-circle.svg"
const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className=" px-4 lg:px-6 py-4 shadow-sm" style={{background: "linear-gradient(90.23deg, #61C2FF 2.31%, #FFFFFF 152.12%)"}}>
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex flex-col">
          <img src={logo} alt="logo" />
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center space-x-8 text-black">
          <a 
            href="#" 
            className="text-black hover:text-blue-100 transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Dashboard
          </a>
          
          {/* Categories with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center space-x-1 text-black hover:text-blue-100 transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-500"
            >
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Dropdown Menu */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electronics</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fashion</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home & Garden</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sports</a>
              </div>
            )}
          </div>

          <a 
            href="#" 
            className="text-black hover:text-blue-100 transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Orders
          </a>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Notification Bell */}
          <button className="text-white cursor-pointer hover:text-blue-100 transition-colors duration-200 p-2 rounded-full hover:bg-blue-500">
            <img src={notificationIcon} alt="notififcation-icon" />
          </button>

          {/* User Profile */}
          <button className="text-white cursor-pointer hover:text-blue-100 transition-colors duration-200 p-2 rounded-full hover:bg-blue-500">
             <img src={user_icon} alt="user-icon" />
          </button>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white transition-colors duration-200 p-2 rounded-md hover:bg-blue-500"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden transition-all duration-300 ${isCategoriesOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="pt-4 pb-2 border-t border-blue-300 mt-4">
          <div className="space-y-2">
            <a 
              href="#" 
              className="block text-white  transition-colors duration-200 text-sm font-medium px-4 py-3 rounded-md"
            >
              Dashboard
            </a>
            
            {/* Mobile Categories */}
            <div className="space-y-2">
              <div className="text-white text-sm font-medium px-4 py-2">Categories</div>
              <div className="ml-4 space-y-1">
                <a href="#" className="block text-blue-100 hover:text-white hover:bg-blue-500 text-sm px-4 py-2 rounded-md transition-colors duration-200">Electronics</a>
                <a href="#" className="block text-blue-100 hover:text-white hover:bg-blue-500 text-sm px-4 py-2 rounded-md transition-colors duration-200">Fashion</a>
                <a href="#" className="block text-blue-100 hover:text-white hover:bg-blue-500 text-sm px-4 py-2 rounded-md transition-colors duration-200">Home & Garden</a>
                <a href="#" className="block text-blue-100 hover:text-white hover:bg-blue-500 text-sm px-4 py-2 rounded-md transition-colors duration-200">Sports</a>
              </div>
            </div>

            <a 
              href="#" 
              className="block text-white  transition-colors duration-200 text-sm font-medium px-4 py-3 rounded-md"
            >
              Orders
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;