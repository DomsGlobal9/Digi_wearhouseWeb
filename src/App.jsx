import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import otpPage from './pages/DigiOtp.jsx'
import OrdersManagementSystem from './pages/orders.jsx';
import DigiWarehouseRegistration from './pages/Registration.jsx'
import VendorDashboard from './pages/Dashboard/dashboard.jsx';
import Profilepage from './pages/Profile/Profilepage.jsx';
import './App.css'
import DigiWarehouseLogin from './pages/DigiLoginForm'
import TotalUnitsSoldController from './pages/Dashboard/TotalUnits.jsx';
 import InventoryController from './pages/Dashboard/Inventorypage.jsx';
 
import TotalRevenueController from './pages/Dashboard/Revenuepage.jsx';
import CommissionPage from './pages/Dashboard/CommissionPage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (

    <>
        <Navbar/>
     <Router>
      <Routes>
        {/* Default route */}
        <Route path="/login" element={< DigiWarehouseLogin/>} />
        <Route path = "/Reg" element={<DigiWarehouseRegistration />} />
        <Route path = "/orders" element={<OrdersManagementSystem />} />
        <Route path = "/" element={<VendorDashboard />} />
        <Route path = "/profile" element={<Profilepage />} />
        <Route path = "/total-units" element={<TotalUnitsSoldController />} />
        <Route path = "/total-revenue" element={<TotalRevenueController />} />
        <Route path = "/inventory" element={<InventoryController />} />
        <Route path="/commission" element={<CommissionPage/>} />
        {/* Redirect to login if no route matches */}

      </Routes>
    </Router>

    </>
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="p-6 max-w-sm bg-white rounded-2xl shadow-lg space-y-4">
    //     <h1 className="text-2xl font-bold text-gray-800">Hello Tailwind in React 🎉</h1>
    //     <p className="text-gray-600">If this is styled, Tailwind is working!</p>
    //     <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
    //       Click Me
    //     </button>
    //   </div>
    // </div>
  );
}
export default App
