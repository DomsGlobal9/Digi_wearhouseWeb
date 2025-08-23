import React from 'react';
import {  Routes, Route,  useLocation } from "react-router-dom";
// import otpPage from './pages/DigiOtp.jsx'
import Navbar from '../DigiWearHouseApp1/Components/Navbar.jsx';
import OrdersManagementSystem from '../DigiWearHouseApp1/Pages/OrdersManagementSystem.jsx';
import DigiWarehouseRegistration from '../DigiWearHouseApp1/Pages/Registration.jsx'
import VendorDashboard from '../DigiWearHouseApp1/Pages/Dashboard/dashboard.jsx';
import Profilepage from '../DigiWearHouseApp1/Pages/Profile/Profilepage.jsx';
import TotalUnitsSoldController from '../DigiWearHouseApp1/Pages/Dashboard/TotalUnits.jsx';
import InventoryController from '../DigiWearHouseApp1/Pages/Dashboard/Inventorypage.jsx';
import TotalRevenueController from '../DigiWearHouseApp1/Pages/Dashboard/Revenuepage.jsx';
import CommissionPage from '../DigiWearHouseApp1/Pages/Dashboard/CommissionPage.jsx';
import RecentlyAddedProductsPage from '../DigiWearHouseApp1/Pages/Dashboard/RecentlyAddedProductsPage.jsx';
import ProductsPage from '../DigiWearHouseApp1/Pages/Dashboard/ProductPage.jsx';
import UploadProducts from '../DigiWearHouseApp1/Pages/Products/Uploadproducts.jsx';
import TryonPreview from '../DigiWearHouseApp1/Pages/Products/TryonPreviewpage.jsx';
import { ProductProvider } from '../DigiWearHouseApp1/context/Context.jsx';

function DigiwearHouse() {
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
        <Route path = "/register" element={<DigiWarehouseRegistration/>} />
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
export default DigiwearHouse;
