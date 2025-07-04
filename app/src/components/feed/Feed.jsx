import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import {Users,Posts} from "../../dummyData.js"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed({username}){
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const res= username?
            await axios.get("/api/posts/profile/"+username):
            await axios.get("/api/posts/timeline/68662c73048d66835d173b56");
            setPosts(res.data);
            console.log(res.data);
        }
        fetchPosts();
    },[username])
    
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