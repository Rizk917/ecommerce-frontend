import React from "react";
import logo from "../../Assets/logo.png"
import "./FooterStyles.css";
import { useLocation } from 'react-router-dom';

const Footer = () => {
	const location = useLocation();

  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          <span><img className="logo-Footer" src={logo} alt="logo-footer"></img></span>
        </h3>

        <p class="footer-links">
          <a href="/"  className= { location.pathname === "/" ? "f-active" : ""}>
            Home
          </a>

		  <a href="/shop" className={location.pathname === "/shop" ? "f-active" : ""}>
            shop
          </a>   <a href="/about" className={location.pathname === "/about" ? "f-active" : ""}>
            About
          </a>   <a href="/contactus" className={location.pathname === "/contactus" ? "f-active" : ""}>
          contactus
          </a>   <a href="/" className={location.pathname === "/" ? "f-active" : ""}>
            Home
          </a>
        </p>

        <p class="footer-company-name">Company Name © 2015</p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span>Maasser El Chouf</span>
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+961 76 482 098</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="mailto:baco-lb@hotmail.com">baco-lb@hotmail.com</a>
          </p>
        </div>
      </div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div class="footer-icons">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
