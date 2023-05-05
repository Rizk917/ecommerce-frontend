import React, { useState } from "react";
import "./signup.css";
import axios from "axios";

function Signup({ hello, handleButtonClick}) {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPopUp, setShowPopUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/", {
        name: Name,
        email: email,
        password: password,
      });
      console.log(response.data); 
      hello()

    } catch (error) {
      console.error(error);
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
            <p onClick={handleButtonClick}>
              cancel
            </p>
          </span>
        </p>
      </form>
    </>
  );
}

export default Signup;
