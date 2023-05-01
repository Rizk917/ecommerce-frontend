import React, { useState } from "react";
import "./signup.css";

function Signup({ hello }) {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const [showPopUp, setShowPopUp] = useState(true);

  function handleButtonClick() {
    console.log('hello')
    setShowPopUp(!showPopUp);
  }

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
          <span><a href="#" onClick={(handleButtonClick) }>cancel</a></span>
        </p>
      </form>
      </>
  );
}
export default Signup;
