import "./navbar.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../Assets/logo.png";
import cartLogo from "../../Assets/cartIcon.png";
import cartLogoWhite from "../../Assets/cartIconWhite.png";
import { Link } from "react-router-dom";

function Navbar({ onButtonClick }) {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();
  const token = localStorage.getItem("token");
  const Role = localStorage.getItem("Role");
  const name = localStorage.getItem("name");
  const UserId = localStorage.getItem("id");
  const loggedIn = localStorage.getItem("loggedIn");

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
        <span>
          {" "}
          <img src={logo} alt="wlogo" className="header-logo" />
        </span>
      </a>
      <ul className={menu}>
        <li className="li">
          {" "}
          <Link
            className={`user${active ? "-b" : ""}${
              location.pathname === "/" ? " lol" : ""
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="li">
          <Link
            className={`user${active ? "-b" : ""}${
              location.pathname === "/shop" ? " lol" : ""
            }`}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="li">
          <Link
            className={`user${active ? "-b" : ""}${
              location.pathname === "/about" ? " lol" : ""
            }`}
            to="/about"
          >
            About us
          </Link>
        </li>
        <li className="li">
          <Link
            className={`user${active ? "-b" : ""}${
              location.pathname === "/contactus" ? " lol" : ""
            }`}
            to="/contactus"
          >
            Contact us
          </Link>
        </li>
      </ul>
      <div className="header-icons">
        <div className="image_logo">
          <Link className={active ? "user-b" : "user"} to="/cart">
            <img
              src={active ? cartLogoWhite : cartLogo}
              alt="edit"
              className="edit"
            />
          </Link>
        </div>
        {loggedIn ? (
          <h2>Hello, {name}</h2>
        ) : (
          <p onClick={onButtonClick} className={active ? "user-b" : "user"}>
            <i className="ri-user-fill"></i>Sign-in
          </p>
        )}
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;
