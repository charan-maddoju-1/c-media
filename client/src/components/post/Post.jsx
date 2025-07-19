import "./post.css"
import {MoreVert, ThumbUpOutlined,ThumbUp,FavoriteBorderOutlined,Favorite, WindowOutlined} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Users} from "../../dummyData.js"
import React, { useState ,useEffect, useContext, useRef} from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReportIcon from '@mui/icons-material/Report';

import {AuthContext} from "../../context/AuthContext";


export default function Post(props){
    //making public folder accessible 
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    //
    // console.log(PF);
    const {postDetails}=props;
    const {user} = useContext(AuthContext);
    // const postedUser=Users.find(userDetails=>userDetails.id===postDetails.userId);
    
    const [like,setLike]=useState(postDetails.likes.length);
    const [isLiked, setIsLiked]=useState(false);

    useEffect(()=>{
        setIsLiked(postDetails.likes.includes(user?._id));
    },[user?._id]);
    const likeHandler=()=>{
        // console.log("hello");
        try{
            axios.put(`/api/posts/${postDetails._id}/like`,{"userId":user._id});
            // console.log("like sent to mongodb");
        }
        catch(err){
            console.log(err);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
         console.log(like,isLiked)
    }

    const [postedUser, setUser]=useState({});
    useEffect(()=>{
        const fetchUser=async ()=>{
            const res=await axios.get(`/api/users?userId=${postDetails.userId}`);
            setUser(res.data);
            // console.log(res.data);
        }
        fetchUser();
    },[postDetails])

    //for reporting a post or deleting a post
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async() => {
        const confirmMsg=window.confirm("Delete Post?");
        if(!confirmMsg) return;
        try{
            await axios.delete(`/api/posts/${postDetails._id}`, {data:{"userId":user._id}});
            console.log("deleted post successfully");
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    };
    
    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTopSection">
                    <div className="postTopLeft">
                        <Link to={`/profile/${postedUser.username}`}>
                        <img 
                        src={postedUser.profilePicture ? postedUser.profilePicture : PF+"profile-pics/noProfile.jpeg"} 
                        alt="" className="postProfileImage" 
                        />
                        </Link>
                        <span className="postProfileName">{postedUser.username}</span>
                        <span className="postedTime">{format(postDetails.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <div className="dropdown" ref={dropdownRef}>
                            <MoreVert className="postDropDownIcon" onClick={() => setDropdownOpen(!dropdownOpen)}/>
                            <ul className={`dropdown-menu  postDropdownMenu dropdown-menu-end mt-2 ${dropdownOpen ? 'show' : ''}`}>
                                {postedUser.username===user.username?
                                <li className="dropdown-item postDropdownItem" onClick={handleDelete}><DeleteOutlineIcon />Delete</li>
                                :
                                <li className="dropdown-item postDropdownItem" ><ReportIcon />Report</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="postMiddleSection">
                        <p className="postDescription">{postDetails?.description}</p>
                    <img src={postDetails.image} alt="" className="postImage" />
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