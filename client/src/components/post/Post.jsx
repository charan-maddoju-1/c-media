import "./post.css"
import {MoreVert, ThumbUpOutlined,ThumbUp,FavoriteBorderOutlined,Favorite} from '@mui/icons-material';

// import {Users} from "../../dummyData.js"
import React, { useState ,useEffect} from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
export default function Post(props){
    //making public folder accessible 
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    //
    // console.log(PF);
    const {postDetails}=props;
    // const postedUser=Users.find(userDetails=>userDetails.id===postDetails.userId);
    
    const [like,setLike]=useState(postDetails.likes.length);
    const [isLiked, setIsLiked]=useState(false);

    const likeHandler=()=>{
        // console.log("hello");
        setLike(isLiked ? like-1 : like+1);
       
        setIsLiked(!isLiked);
         console.log(like,isLiked)
    }

    const [postedUser, setUser]=useState({});
    useEffect(()=>{
        const fetchUser=async ()=>{
            const res=await axios.get(`/api/users/${postDetails.userId}`);
            setUser(res.data);
            console.log(res.data);
        }
        fetchUser();
    },[postDetails])
    
    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTopSection">
                    <div className="postTopLeft">
                        <Link to={`profile/${postedUser.username}`}>
                        <img 
                        src={postedUser.profilePicture || PF+"profile-pics/noProfile.jpeg"} 
                        alt="" className="postProfileImage" 
                        />
                        </Link>
                        <span className="postProfileName">{postedUser.username}</span>
                        <span className="postedTime">{format(postDetails.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postMiddleSection">
                        <p className="postDescription">{postDetails?.description}</p>
                    <img src={PF+postDetails.image} alt="" className="postImage" />
                </div>
                <div className="postBottomSection">
                    <div className="postBottomLeft">
                        {isLiked?
                        (
                        <>
                            <ThumbUp htmlColor="blue" className="likeIcon" onClick={likeHandler} />
                            <Favorite htmlColor="red" className="likeIcon" onClick={likeHandler} />
                        </>
                        ):(
                        <>
                            <ThumbUpOutlined htmlColor="blue" className="likeIcon" onClick={likeHandler} />
                            <FavoriteBorderOutlined htmlColor="red" className="likeIcon" onClick={likeHandler} />
                        </>
                        )
                        }
                        <span className="likeCount">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="commentsCount">{postDetails.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}