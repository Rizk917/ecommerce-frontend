import React, { useState } from "react";
import sidebar from "../SideBar/sidebar.js";
import SideBar from "../SideBar/sidebar.js";
import "./header.css";
import burgerImage from "../image/burgerMenu.png";
function AdminHeader({ showSidebar, isSidebarOpen }) {
  const logOut = () => {
    window.location.href = "/";

    window.localStorage.clear();
  };

  return (
    <div className="header-container">
      {/* <div className="logo-container" onClick={()=>showSidebar(!isSidebarOpen)}>
        <img src={burgerImage} alt='logo' />
    </div> */}
      <div className="title-container">
        <div className="title">Welcome To The DashBoard</div>
      </div>
      <div className="logout">
        <button type="button" onClick={logOut} className="logout_button">
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
