import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import {Users,Posts} from "../../dummyData.js"
import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}){
    const [posts,setPosts]=useState([]);
    const {user}=useContext(AuthContext);

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const res= username?
            await axios.get("/api/posts/profile/"+username):
            await axios.get("/api/posts/timeline/"+user._id);
            setPosts(res.data);
            console.log(res.data);
        }
        fetchPosts();
    },[username,user._id])
    
    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                <Share/>
                {posts.map(eachPost=>
                    <Post key={eachPost._id} postDetails={eachPost}/>
                )}
            </div>
        </div>
    )
}