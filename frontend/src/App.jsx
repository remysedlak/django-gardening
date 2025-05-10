import "./index.css";
import React from "react";

import Navbar from "./components/Navbar";

import { Plants, Gallery, Home, Analytics } from "./pages";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-gray-900 p-2 overflow-x-hidden font-roboto">
      <Navbar />
      <Routes>
        <Route path="/Plants" element={<Plants />} />
        <Route path="/Gallery" element={<Gallery />} />\
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
