import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import otpPage from './pages/DigiOtp.jsx'
import OrdersManagementSystem from './pages/orders.jsx';
// import DigiWarehouseRegistration from './pages/Registration.jsx'
import VendorDashboard from './pages/Dashboard/dashboard.jsx';
import Profilepage from './pages/Profile/Profilepage.jsx';
import './App.css'
// import DigiWarehouseLogin from './pages/DigiLoginForm'
import TotalUnitsSoldController from './pages/Dashboard/TotalUnits.jsx';
 import InventoryController from './pages/Dashboard/Inventorypage.jsx';
 
import TotalRevenueController from './pages/Dashboard/Revenuepage.jsx';
import CommissionPage from './pages/Dashboard/CommissionPage.jsx';
import Navbar from './components/Navbar.jsx';
import RecentlyAddedProductsPage from './pages/Dashboard/RecentlyAddedProductsPage.jsx';
import ProductsPage from './pages/Dashboard/ProductPage.jsx';
import UploadProducts from './pages/Products/Uploadproducts.jsx';
import TryonPreview from './pages/Products/TryonPreviewpage.jsx';
import { ProductProvider } from './context/Context.jsx';

function App() {
   const location = useLocation();

  // Don't show Navbar on login or register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";
  return (


    <>
         {!hideNavbar && <Navbar />}
  <ProductProvider>
      <Routes>
        {/* Default route */}
        {/* <Route path="/login" element={< DigiWarehouseLogin/>} /> */}
        {/* <Route path = "/register" element={<DigiWarehouseRegistration/>} /> */}
        <Route path = "/orders" element={<OrdersManagementSystem />} />
        <Route path = "/" element={<VendorDashboard />} />
        <Route path = "/profile" element={<Profilepage />} />
        <Route path = "/total-units" element={<TotalUnitsSoldController />} />
        <Route path = "/total-revenue" element={<TotalRevenueController />} />
        <Route path = "/inventory" element={<InventoryController />} />
        <Route path="/commission" element={<CommissionPage/>} />
         <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/recenltyproducts' element={<RecentlyAddedProductsPage/>}/>
        <Route path="/upload-products" element={<UploadProducts/>} />
        <Route path="/tryon-preview" element={<TryonPreview/>} />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        {/* Redirect to login if no route matches */}

      </Routes>
      </ProductProvider>
   

    </>
  );
}
export default App
