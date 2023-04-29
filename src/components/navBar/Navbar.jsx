import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/logo.png';

function Navbar() {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

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
    <header className={`hello ${active ? "active" : "sticky-header"}`}>
      <a href="/" className="logo">
        <span>        <img src={logo} alt="wlogo" className="header-logo" />
</span>
      </a>
      <ul className={menu}>
        <li className='li'>
          <a href="/" className={location.pathname === '/' ? 'lol' : ''}>
            Home
          </a>
        </li>
        <li className='li'>
          <a href="/shop" className={location.pathname === '/shop' ? 'lol' : ''}>
            Shop
          </a>
        </li>
        <li className='li'>
          <a href="/about" className={location.pathname === '/about' ? 'lol' : ''}>
            About us
          </a>
        </li>
        <li className='li'>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'lol' : ''}>
            Contact us
          </a>
        </li>
      </ul>
      <div className="header-icons">
        <a href="/" className="user"> 
          <i className="ri-user-fill"></i>Sign-in
        </a>
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;