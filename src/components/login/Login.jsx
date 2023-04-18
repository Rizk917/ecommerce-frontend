import React from "react";
import './login.css'
import { useState } from "react";
import Signup from "../signup/Signup";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return(
        <div className="login-wrapper">
            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <button className="login-btn" value="login" type="submit">Submit</button>
                </form>
                <p>New here? <span><a href="#lol">Create an account</a></span></p>
            </div>
            <div className="login-card" id="lol">
                {/* Your create account form goes here */}
                <Signup/>
            </div>
        </div>
    )
}

export default Login;
