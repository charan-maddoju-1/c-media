import React, { useContext, useRef } from 'react'
import "./login.css"
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';



export default function Login() {

const email=useRef(); //to make reference to some data we make use of ths hook
const password=useRef(); 
const {user,isFetching,error,dispatch}=useContext(AuthContext);

const handleClick=async (event)=>{
    event.preventDefault();
    console.log(email.current.value,password.current.value);
    loginCall({email:email.current.value,password:password.current.value},dispatch);
}
console.log(user);

const navigate=useNavigate();
const handleRegister=()=>{
    navigate("/");
}

  return (
    <div className='loginContainer'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginLogo">C-Media</h1>
                <span className="loginDescription"><b>C</b>onnect. <b>C</b>reate. <b>C</b>elebrate.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email id" type="email" className="loginInput" ref={email} required/>
                    <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength="6" />
                    <button className="loginButton" >{isFetching? 
                    <CircularProgress color='white' size="15px" />:"Login"}</button>
                    <span className="loginForgot">Forgot Password ?</span>
                    <button className="loginRegisterButton" onClick={handleRegister}>Create Account</button>
                </form>
            </div>
        </div> 
    </div>
  )
}
