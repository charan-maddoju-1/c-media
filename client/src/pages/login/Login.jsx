import React from 'react'
import "./login.css"

export default function Login() {
  return (
    <div className='loginContainer'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginLogo">C-Media</h1>
                <span className="loginDescription"><b>C</b>onnect. <b>C</b>reate. <b>C</b>elebrate.</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Email id" type="text" className="loginInput" />
                    <input placeholder="Password" type="text" className="loginInput" />
                    <button className="loginButton">Login</button>
                    <span className="loginForgot">Forgot Password ?</span>
                    <button className="loginRegisterButton">Create Account</button>
                </div>
            </div>
        </div> 
    </div>
  )
}
