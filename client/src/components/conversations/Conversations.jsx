import "./conversations.css"
import{useState,useEffect,useRef} from "react";
import axios from "axios";

export default function Conversations(props){
    const {conversation,currentUser}=props;
    const [user,setUser]=useState(null);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        const friendId=conversation.members.find((m) => m!==currentUser._id);
        const getFriendDetails=async()=>{
            try{
                const res=await axios.get("api/users?userId="+friendId);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }  
        }
        getFriendDetails();
    },[currentUser._id]);

    return (
        <>
            {user&&<div className="conversation">
                <img src={user.profilePicture !== "" ? PF + user.profilePicture : PF + "profile-pics/noProfile.jpeg"} alt="" className="conversationImage" />
                <span className="conversationName">{user.username}</span>
            </div>}
        </>
    )
}