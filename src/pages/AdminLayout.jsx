import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import AdminHeader from "../admin/Header/header";
import SideBar from "../admin/SideBar/sidebar";
import  secureLocalStorage  from  "react-secure-storage";
function AdminLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate=useNavigate();
useEffect(() => {
  if (!secureLocalStorage.getItem('token') || secureLocalStorage.getItem('Role')!=='admin') {
    navigate('/Error404');
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