import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup({ hello, handleButtonClick}) {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPopUp, setShowPopUp] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://ecommerce-backend-5k4d.onrender.com/user/", {
        name: Name,
        email: email,
        password: password,
      });
      // console.log(response.data);
      toast.success(' Account created succesfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
      hello()

    } catch (error) {
      console.error(error);
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };



  return (
    <>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          name="Name"
          value={Name}
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-btn" value="SignUp" type="submit">
          Sign Up
        </button>
        <p className="p">
          <p onClick={hello}>Return to login?</p>
          <span>
            <p onClick={()=>{navigate(-1)}}>
              cancel
            </p>
          </span>
        </p>
      </form>
    </>
  );
}

export default Signup;
