import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import logo from '../../Assets/logo.png';

function Navbar() {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();

  useEffect(() => {
    setShow(false);
    setMenu("nav-links");
    setIcon("bx bx-menu");
  }, [location]);

  const toggle = () => {
    if (!show) {
      console.log("opened");
      setMenu("nav-links open");
      setIcon("bx bx-x");
    } else {
      console.log("closed");
      setMenu("nav-links");
      setIcon("bx bx-menu");
    }
    setShow(!show);
  };

  return (
    <header className="sticky-header">
      <Link href="/" className="logo">
        {/* <img src={logo} alt="wlogo" className="header-logo" /> */}
        <span>Store</span>
      </Link>
      <ul className={menu}>
        <li className='li'>
          <Link to="/">
            Home
          </Link>
        </li>
        <li className='li'>
          <Link to="/shop">
            Shop
          </Link>
        </li>
        <li className='li'>
          <Link to="/about">
            About us
          </Link>
        </li>
        <li className='li'>
          <Link to="/contactus">
            Contact us
          </Link>
        </li>
        
      </ul>
      <div className="header-icons">
        <Link to="/cart">Cart</Link>
        <a href="/" className="user"> 
          <i className="ri-user-fill"></i>Sign-in
        </a>
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;