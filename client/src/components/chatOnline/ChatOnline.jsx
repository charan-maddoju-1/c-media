import "./chatOnline.css"

import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatOnline(props) {
  const {onlineUsers, currentId,setcurrentChat} =props;
  const [friends,setFriends]=useState([]);
  const [onlineFriends,setOnlineFriends]=useState([]);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log("online Users are", onlineUsers);

  useEffect(()=>{
    const getFriends=async()=>{
      try{
        const res=await axios.get("/api/users/friends/"+currentId);
        setFriends(res.data);
        // console.log("friends are ", friends);
      }catch(err){
        console.log(err);
      }
    }
    getFriends();
  },[currentId]);

  useEffect(()=>{
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
  },[onlineUsers,friends])

  // console.log("Online friends are",onlineFriends);

  const handleClick=async(user)=>{
    try{
      const res=await axios.get(`/api/conversation/find/${user._id}/${currentId}`);
      setcurrentChat(res.data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="chatOnline" >
        {onlineFriends.map(user=>(
          <div className="chatOnlineFriend" key={user._id} onClick={()=>handleClick(user)}>
            <div className="chatOnlineImageContainer">
                <img src={user.profilePicture ? user.profilePicture : PF+"profile-pics/noProfile.jpeg"} alt="" className="chatOnlineFriendImage" />
                <div className="chatOnlineBadge"></div>   
            </div>
            <span className="chatOnlineFriendName">{user.username}</span>
          </div>
        ))
        }
        
    </div>
  )
}
