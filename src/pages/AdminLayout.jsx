import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import AdminHeader from "../admin/Header/header";
import SideBar from "../admin/SideBar/sidebar";

function AdminLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate=useNavigate();
useEffect(() => {
  if (!localStorage.getItem('token') || localStorage.getItem('Role')!=='admin') {
    navigate('/');
  }
}, []);
    return(
        <>
        <AdminHeader  showSidebar={showSidebar}
            isSidebarOpen={isSidebarOpen}/>
          <SideBar isSidebarOpen={isSidebarOpen} />
        {/* <Outlet/> */}
        </>
    )

}





export default AdminLayout;