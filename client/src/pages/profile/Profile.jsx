import React from 'react'
import "./profile.css"

import Topbar from "../../components/topbar/Topbar.js"
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Rightbar from '../../components/rightbar/Rightbar.jsx';

import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';


export default function Profile() {
    const username=useParams().username;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser]=useState({});
    useEffect(()=>{
        const fetchUser=async ()=>{
            const res=await axios.get(`/api/users?username=${username}`);
            setUser(res.data);
            console.log(res.data);
        }
        fetchUser();
    },[username])

  return (
     <>
        <Topbar/>
        <div className="profileContainer">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={user.coverPicture!==""? PF+user.coverPicture:PF+"profile-pics/noCover.jpg"} alt="" className="profileCoverImage" />
                        <img src={user.profilePicture!==""? PF+user.profilePicture:PF+"profile-pics/noProfile.jpeg"} alt="" className="profileImage" />
                    </div>
                    <div className='profileInfo'>
                        <h4 className="profileName">{user.username}</h4>
                        <p className="profileDescription">{user.description}</p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user} key={user._id}/>
                </div>
            </div>
        </div>
        </>
  )
}
