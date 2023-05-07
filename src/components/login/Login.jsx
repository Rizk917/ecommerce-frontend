import React from "react";
import "./login.css";
import { useState } from "react";
import Signup from "../signup/Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login({cancel}) {
  const [prvnxt, setPrvnxt] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function cancelToggle(){
    cancel()
  }
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
            toast.error('Invalid email or password !', {
              position: toast.POSITION.TOP_RIGHT
          });
            throw new Error("Invalid email or password");
          }
          return res.json();
        })
        .then((data) => {
          console.table(data);
       
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("Role", data.role);
          window.localStorage.setItem("id", data.id);
          window.localStorage.setItem("name", data.name);
          window.localStorage.setItem("loggedIn", true);
          if(localStorage.getItem('Role')==='admin')
          {window.location.href = "/dashboard";}
          else
          if(localStorage.getItem('Role')==='user')
          {window.location.href = "/";}
        })
        .catch((err) => {
          toast.error('Invalid email or password !');
          // setError(err.message);
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
    <>
    <ToastContainer/>

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
          <Signup hello={handleLog} handleButtonClick={cancelToggle}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
