import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminHeader from "../admin/Header/header";
import SideBar from "../admin/SideBar/sidebar";

function AdminLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
    return(
        <>
        <AdminHeader  showSidebar={showSidebar}
            isSidebarOpen={isSidebarOpen}/>
        <div className="app">

          <SideBar isSidebarOpen={isSidebarOpen} />
        <Outlet/>
        </div>
        </>
    )

}





export default AdminLayout;