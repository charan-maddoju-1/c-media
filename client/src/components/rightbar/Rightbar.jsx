import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online"
import axios from "axios";
import { useEffect,useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from "@mui/material/CircularProgress";

export default function Rightbar(props){
    const {user}=props;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([]);
    const {user:currentUser,dispatch}=useContext(AuthContext);

    const [loading,setLoading]=useState(false);

    const [followed, setFollow] = useState(false)
    useEffect(() => {
    if (currentUser && user) {
        setFollow(currentUser?.following?.includes(user?._id));
    }
    }, [currentUser, user]);
    
    console.log("is following ? ",currentUser?.following?.includes(user?._id));
    console.log("current user",currentUser.following);
    console.log("user",user?.followers);

    useEffect(()=>{
        const getFriends=async()=>{
            try{
                const friendsList=await axios.get(`/api/users/friends/${user?._id}`);
                setFriends(friendsList?.data);
            }catch(err){
                console.log(err);
            }
        }
        getFriends();//since we cant use async directly with useEffect we are making use of an arroe function with async call and then calling it
    },[user])

    const HomeRightbar=()=>{
        return(
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}icons/cake.jpeg`} alt="" className="birthdayImage" />
                    <span className="birthdayText">
                        <b>Charan</b> and <b>4 other friends</b> have birthaday today.
                    </span>
                </div>
                <img src={`${PF}posts/post1.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendsList">
                    {Users.map(onlineUser=>(
                        <Online key={onlineUser.id} onlineUser={onlineUser} />
                    ))}
                </ul>
            </>
        )
    }

    const handleFollow=async (event)=>{
        try{
            if(followed){
                setLoading(true);
                await axios.put(`/api/users/${user._id}/unfollow`,{userId:currentUser._id});
                setLoading(false);
                const updatedFollowing = currentUser.following.filter(id => id !== user._id);
                dispatch({ type: "UPDATE_FOLLOWING", payload: updatedFollowing });
            }
            else{
                setLoading(true);
                await axios.put(`/api/users/${user._id}/follow`,{userId:currentUser._id}); 
                setLoading(false);
                const updatedFollowing =[...currentUser.following,user._id];
                dispatch({ type: "UPDATE_FOLLOWING", payload: updatedFollowing });
            } 

            setFollow(!followed);
        }
        catch(err){
            setLoading(false);
            console.log(err);
        }
        
    }

    const navigate=useNavigate();
    const handleMessage=async()=>{
        try{
            const res=await axios.post("/api/conversation",{senderId:currentUser._id,receiverId:user._id});
            // console.log(res);
            navigate(`/Chatter?convoId=${res.data._id}`)
        }catch(err){
            console.log(err);
        }
    }

    const ProfileRightbar=()=>{
        // return <h1>Charan Friend</h1>
        return(
            <>
                {user._id!==currentUser._id && 
                <div className="rightbarButtonsContainer">
                    <button className={followed?"rightbarFollowButton rightbarUnFollowButton":"rightbarFollowButton"} onClick={handleFollow}>
                        {loading? <CircularProgress color='white' size="15px"/>:
                        <>
                        {followed ? "Unfollow":"Follow"}
                        {followed ? <RemoveIcon/>:<AddIcon/>}
                        </>}
                    </button>
                    <button className="rightbarMessageButton" onClick={handleMessage}>
                        Message
                    </button>
                </div>   
                }
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    {/* <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Age :</span>
                        <span className="rightbarInfoValue"> {user.age} </span>
                    </div> */}
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Profession :</span>
                        <span className="rightbarInfoValue"> {user.profession} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship :</span>
                        <span className="rightbarInfoValue"> {user.relationship} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From :</span>
                        <span className="rightbarInfoValue"> {user.from} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City :</span>
                        <span className="rightbarInfoValue"> {user.city} </span>
                    </div>
                </div>

                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarUserFriends">
                    {friends.map(friend=>{
                        return (
                            <Link to={"/profile/"+friend.username} style={{textDecoration:"none",color:"black"}} key={friend._id}>
                                <div className="rightbarUserFriend">
                                    <img src={friend.profilePicture ? friend.profilePicture: PF+"profile-pics/noProfile.jpeg"} alt="" className="rightbarFriendImage" />
                                    <span className="rightbarFriendName">{friend.username}</span>
                                </div>
                            </Link>
                        )
                    })}
                    
                </div>
            </>
        )
    }

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {user? <ProfileRightbar/> : <HomeRightbar/> }
            </div>
        </div>
    )
}