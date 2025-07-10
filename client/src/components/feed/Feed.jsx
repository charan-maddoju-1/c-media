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
             try {
                let res;
                if (username) {
                    res = await axios.get("/api/posts/profile/" + username);
                } else {
                    res = await axios.get("/api/posts/timeline/" + user._id);
                }

                setPosts(res.data);
                console.log(res.data);
            } 
            catch (err) {
            console.error("Error fetching posts:", err); // ✅ catches the promise error
            }
        }
        fetchPosts();
    },[username,user._id])
    
    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {((!username)||username===user.username)&&<Share/>}
                {posts.map(eachPost=>
                    <Post key={eachPost._id} postDetails={eachPost}/>
                )}
            </div>
        </div>
    )
}