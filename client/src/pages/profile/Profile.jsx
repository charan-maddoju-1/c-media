import React from 'react'
import "./profile.css"

import Topbar from "../../components/topbar/Topbar.js"
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Rightbar from '../../components/rightbar/Rightbar.jsx';

export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
     <>
        <Topbar/>
        <div className="profileContainer">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={`${PF}posts/post11.jpg`} alt="" className="profileCoverImage" />
                        <img src={`${PF}profile-pics/profile1.png`} alt="" className="profileImage" />
                    </div>
                    <div className='profileInfo'>
                        <h4 className="profileName">Ajay Rangaraju</h4>
                        <p className="profileDescription">Hey everyone! This is Ajay.</p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username="ajay"/>
                    <Rightbar profile/>
                </div>
            </div>
        </div>
        </>
  )
}
