import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/navBar/Navbar";
import ContactUs from "./pages/ContactUs";
import Login from "./components/login/Login";
import AboutUs from "./components/AboutUs/AboutUsComponent";
import Dashboard from "./admin/Dashboard/Dashboard";
import CategoriesAdmin from "./admin/Categories/categories";
import ProductsAdmin from "./admin/Products/product";
import AdminHeader from "./admin/Header/header";
import AdminLayout from "./pages/AdminLayout";
import UserLayout from "./pages/UserLayout";
import SideBar from "./admin/SideBar/sidebar";
import Shop from "./pages/Shop";
function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  function handleButtonClick() {
    setShowPopUp(!showPopUp);
  }

  function handleCloseButtonClick() {
    setShowPopUp(false);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
        {/* <div>
      <>
        <AdminHeader showSidebar={showSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="admin_dashboard">
          <SideBar isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<CategoriesAdmin />} />
            <Route path="/products" element={<ProductsAdmin />} />
          </Routes>
        </div>
      </>
    </div> */}

    
    <>
    <Routes>
    
    <Route element={<AdminLayout/>}>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<CategoriesAdmin />} />
      <Route path="/products" element={<ProductsAdmin />} />
    </Route>
    </Routes>
    </>
        

      <div className={showPopUp ? "none" : "main-wrap"}>
      
        <Routes>
          <Route element={<UserLayout/>}>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/about" element={<AboutUs />}/>
          <Route exact path="/cart" element={<Home />}/>
          <Route exact path="/contactus" element={<ContactUs />}/>
          <Route exact path="/shop" element={<Shop />}/>

          </Route>
        </Routes>
      
      </div>
    
    
    

    
    </>
  );
}

export default App;
