import React from 'react'
import "./register.css"

export default function Register() {
  return (
    <div className='registerContainer'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h1 className="registerLogo">C-Media</h1>
                <span className="registerDescription"><b>C</b>onnect. <b>C</b>reate. <b>C</b>elebrate.</span>
            </div>
            <div className="registerRight">
                <div className="registerBox">
                    <input placeholder="User name" type="text" className="registerInput" />
                    <input placeholder="Email id" type="text" className="registerInput" />
                    <input placeholder="Password" type="text" className="registerInput" />
                    <input placeholder="Confirm password" type="text" className="registerInput" />
                    <button className="signUpButton">Sign up</button>
                    <button className="registerLoginButton">Log in</button>
                </div>
            </div>
        </div> 
    </div>
  )
}
