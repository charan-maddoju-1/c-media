import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import {Users,Posts} from "../../dummyData.js"
import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

export default function Feed({username}){
    const [posts,setPosts]=useState([]);
    const {user}=useContext(AuthContext);
    const [loading, setLoading]=useState(true);
    const apiUrl=process.env.REACT_APP_API_URL;

    useEffect(()=>{
        const fetchPosts=async ()=>{
             try {
                let res;
                setLoading(true);
                if (username) {
                    res = await axios.get(apiUrl+"/api/posts/profile/" + username);
                } else {
                    res = await axios.get(apiUrl+"/api/posts/timeline/" + user?._id);
                }
                setLoading(false);
                setPosts(res.data);
                // console.log(res.data);
            } 
            catch (err) {
            console.error("Error fetching posts:", err);
            }
        }
        fetchPosts();
    },[username,user?._id])

    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {((!username)||username===user?.username)&&<Share/>}
                {loading?
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </div>:
                posts.map(eachPost=>
                    <Post key={eachPost._id} postDetails={eachPost}/>
                )}
            </div>
        </div>
    )
}