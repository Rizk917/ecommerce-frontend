import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHeader from "./Components/Header/header.js";
import SideBar from "./Components/SideBar/sidebar.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import CategoriesAdmin from "./Components/Categories/categories.js";
import ProductsAdmin from "./Components/Products/product.js";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <>
        <AdminHeader showSidebar={showSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="app">
          <SideBar isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<CategoriesAdmin />} />
            <Route path="/products" element={<ProductsAdmin />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
