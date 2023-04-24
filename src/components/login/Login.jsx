import React from "react";
import './login.css'
import { useState } from "react";
import Signup from "../signup/Signup";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [prvnxt, setPrvnxt] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    function handleReg(){
        setPrvnxt(true)
    }

    function handleLog(){
        setPrvnxt(false)
    }


    return(
        <div className="login-wrapper">
            <div className={prvnxt ? 'login-zi7o' : 'login-r'}>
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
                    <button className="login-btn" value="login" type="submit">Submit</button>
                    <p className="p">New here? <span onClick={handleReg}>Create an account</span></p>
                </form>
            </div>
            <div className="login-card" id="lol">
                <Signup hello={handleLog}/>
            </div>
            </div>
        </div>
    )
}

export default Login;
