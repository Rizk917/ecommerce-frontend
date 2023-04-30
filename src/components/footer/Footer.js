import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../../styles/Button";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import "./FooterStyles.css";

const Footer = () => {
  return (
    <>
      
        <section className="contact-short">
          <div className="grid grid-two-column">
            <div >
              <h3>Ready to get started?</h3>
              <h3>Talk to us today</h3>
            </div>

            <div>
              <Button>Get Started</Button>
            </div>
          </div>
        </section>
        {/* footer section */}

        <footer>
          <div className="container grid grid-four-column">
            <div className="footer-about">
              <h3 className="footer-h3">Name of Company</h3>
              <p className="footer-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="footer-subscribe">
              <h3 className="footer-h3" >Subscribe to get important updates</h3>
              <form className="subscribe-form" action="#">
                <input type="email" name="email" placeholder="YOUR E-MAIL" />

      
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="footer-social">
              <h3 className="footer-h3">Follow Us on Instagram</h3>
              <div className="footer-social--icons">
         
                <div>
                  <FaInstagram className="social-media-icons" />
                </div>
                
              </div>
            </div>
            <div className="footer-contact">
              <h3 className="footer-h3">Call Us </h3> 
              <h3 className="footer-h3">  +961 12345678978</h3>
            </div>
          </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p className="footer-p">
                @{new Date().getFullYear()} Nameofcompany. All Rights Reserved
              </p>
              <div className="footer-p">
                <p >PRIVACY POLICY</p>
                <p>TERMS & CONDITIONS</p>
              </div>
            </div>
          </div>
        </footer>
      
    </>
  );
};

export default Footer;
