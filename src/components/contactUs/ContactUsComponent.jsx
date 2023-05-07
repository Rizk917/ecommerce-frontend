import axios from "axios";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope,faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import "./contactUscomp.css"
import Footer from "../footer/Footer";
const ContactUsComponent = (props) => {
  const form = useRef();
  const [error, setError] = useState(null);

  const [myData, setmyData] = useState({
    fullName: "",
    email: "",
    Message: "",
  });
  const { fullName, email, Message } = myData;

  const onChange = (e) => {
    setmyData({ ...myData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_x11nz0r",
        "template_r8t4mxk",
        form.current,
        "-G-4mQwUEY5HmF9QG"
      );

      // console.log("email sent successfully");
      form.current.reset();
    } catch (error) {
      // console.log("email sending failed", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    setError(null);
    const newContact = {
      fullName: fullName,
      email: email,
      Message: Message,
    };
    await sendEmail(e);

    try {
      await axios.post("https://ecommerce-backend-5k4d.onrender.com/contactus/", newContact);
      setmyData({
        fullName: "",
        email: "",
        Message: "",
      });
    } catch (err) {
      console.log("error", err.response.data);
    }
  };

  return (
    <>
    <div className="contact-Us">
      <h1>Contact Us</h1>
    <div className="container-home">
    <div class="cntctus">
      <div class="content">
        <div class="left-side">
          <div class="address details">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div class="topic">Address</div>
            <div class="text-one">Maasser El Chouf</div>
            <div class="text-two"></div>
          </div>
          <div class="phone details">
          <FontAwesomeIcon icon={faPhoneAlt} />
            <div class="topic">Phone</div>
            <div class="text-one">+961 76 482 098</div>
            <div class="text-two"></div>
          </div>
          <div class="email details">
          <FontAwesomeIcon icon={faEnvelope} />
            <div class="topic">Email</div>
            <div class="text-one">baco-lb@hotmail.com</div>
            <div class="text-two"></div>
          </div>
        </div>
        <div class="right-side">
          <div class="topic-text">Send us a message</div>
          <p>
            If you have any work from me or any types of quries related to my tutorial,
            you can send me message from here. It's my pleasure to help you.
          </p>
          <form ref={form} onSubmit={onSubmit}>
            <div class="input-box">
              <input
                type="text"
                name="fullName"
                value={fullName}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            <div class="input-box">
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                />
                </div>
                {error && <div className="error">{error}</div>}
                <div class="input-box">
                <textarea
                             name="Message"
                             value={Message}
                             placeholder="Type your message"
                             onChange={onChange}
                           />
                </div>
                <div class="button_card">
                <button type="submit">Send Message</button>
                </div>
                </form>
                </div>
                </div></div>
                </div></div>
                <Footer/>
                </>
                );
                };
                
                export default ContactUsComponent;
