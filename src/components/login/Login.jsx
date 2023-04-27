import React from "react";
import "./login.css";
import { useState } from "react";
import Signup from "../signup/Signup";

function Login() {
  const [prvnxt, setPrvnxt] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      fetch("http://127.0.0.1:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Invalid email or password");
          }
          return res.json();
        })
        .then((data) => {
          console.table(data);
          alert("login successful");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("Role", data.role);
          window.localStorage.setItem("id", data._id);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  function handleReg() {
    setPrvnxt(true);
  }

  function handleLog() {
    setPrvnxt(false);
  }

  return (
    <div className="login-wrapper">
      <div className={prvnxt ? "login-zi7o" : "login-r"}>
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <button className="login-btn" value="login" type="submit">
              Submit
            </button>
            <p className="p">
              New here? <span onClick={handleReg}>Create an account</span>
            </p>
          </form>
        </div>
        <div className="login-card" id="lol">
          <Signup hello={handleLog} />
        </div>
      </div>
    </div>
  );
}

export default Login;
