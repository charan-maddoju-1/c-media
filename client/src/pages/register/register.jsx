import React from 'react'
import "./register.css"
import { replace, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Register() {
    const username=useRef();
    const email=useRef(); //to make reference to some data we make use of ths hook
    const password=useRef(); 
    const confirmPassword=useRef(); 

    const navigate=useNavigate();
    const apiUrl=process.env.REACT_APP_API_URL;
    
    const handleClick=async (event)=>{
        event.preventDefault();
        // confirmPassword.current.setCustomValidity("");
        console.log(email.current.value,password.current.value,confirmPassword.current.value);
        if(password.current.value!==confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("Passwords didn't match");
            return;
        }
        else{
            confirmPassword.current.setCustomValidity("");
            const user={
                "username":username.current.value,
                "email":email.current.value,
                "password":password.current.value
            }
            try{
                await axios.post(apiUrl+"/api/auth/register",user);
                navigate("/login",{replace:true});
            }
            catch (err) {
                if (err.response?.status === 409) {
                    alert("User already exists. Please login.");
                    navigate("/login");
                } else {
                    alert("Registration failed.");
                }
            }
        }  
    }
    const handleLogin=()=>{
        navigate("/login");
    }
  return (
    <div className='registerContainer'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h1 className="registerLogo">C-Media</h1>
                <span className="registerDescription"><b>C</b>onnect. <b>C</b>reate. <b>C</b>elebrate.</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="User name" type="text" className="registerInput" ref={username} required/>
                    <input placeholder="Email id" type="email" className="registerInput" ref={email} required/>
                    <input placeholder="Password" type="password" className="registerInput" ref={password} required minLength="6" />
                    <input placeholder="Confirm password" type="text" className="registerInput" ref={confirmPassword} required 
                    onChange={() => {
                    // Live reset the error message if inputs match
                    if (confirmPassword.current.value === password.current.value) {
                        confirmPassword.current.setCustomValidity("");
                    }
                    }}
                    />
                    <button className="signUpButton" type="submit" >Sign up</button>
                    <button className="registerLoginButton" onClick={handleLogin}>Log in</button>
                </form>
            </div>
        </div> 
    </div>
  )
}
