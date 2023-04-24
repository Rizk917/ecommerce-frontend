import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../login/Login';
// import logo from '../../Assets/logo.png';

function Navbar({ onButtonClick }) {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();
  const [hidden, setHidden] = useState(false);

  function popUp(){
    setHidden(!hidden);
  }

  // function popDown(){
  //   setHidden(false)
  // }
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
    <>
    <header className="sticky-header">
      <a href="/" className="logo">
        {/* <img src={logo} alt="wlogo" className="header-logo" /> */}
        <span>Store</span>
      </a>
      <ul className={menu}>
        <li className='li'>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li className='li'>
          <a href="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Shop
          </a>
        </li>
        <li className='li'>
          <a href="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About us
          </a>
        </li>
        <li className='li'>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
      </ul>
      <div className="header-icons">
        <div onClick={onButtonClick}>
          <p className="user" onClick={popUp}> 
            <i className="ri-user-fill"></i>Sign-in
          </p>
        </div>
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
    </>
  );
}

export default Navbar;