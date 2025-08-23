import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import DigiwearHouse from './Routes/DigiwearHouse';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<DigiwearHouse/>}/>
        <Route path="/digiwearhouse" element={<DigiwearHouse/>} />
      </Routes>
    </>
  );
}
export default App
