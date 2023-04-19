import React, {useState} from 'react';
import sidebar from '../SideBar/sidebar.js';
import SideBar from '../SideBar/sidebar.js'
import "./header.css";

function Header({showSidebar,isSidebarOpen}) {


return (
    <div className="header-container">
    <div className="logo-container" onClick={()=>showSidebar(!isSidebarOpen)}>
        <img src={process.env.PUBLIC_URL + '/pictures/burgerMenu.png'} alt='logo' />
    </div>
    <div className='title-container'>
        <div className='title'>Welcome To The DashBoard</div>
    </div>
    <div className='logout'>
    <button type='button' className="logout_button"><p>Logout</p></button>

    </div>
    
    </div>
);
}

export default Header;
