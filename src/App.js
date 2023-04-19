import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/header.js";
import SideBar from "./Components/SideBar/sidebar.js";
import Home from "./Components/Home/home.js";
import Categories from "./Components/Categories/categories.js";
import Products from "./Components/Products/product.js";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <>
        <Header showSidebar={showSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="app">
          <SideBar isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
