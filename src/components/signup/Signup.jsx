import React, { useState } from "react";
import "./signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="signup-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>

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
      </form>
    </div>
  );
}
export default Signup;
