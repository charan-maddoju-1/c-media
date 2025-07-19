import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"
import { useContext, useState ,useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Share(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const apiUrl=process.env.REACT_APP_API_URL;
    const {user}=useContext(AuthContext);
    const [loading,setLoading]=useState(false);

    const [file,setFile]=useState(null);
    const description=useRef();
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > MAX_SIZE) {
            alert("File is too large. Please choose a file under 10MB.");
            return;
        }
        setFile(e.target.files[0])
    };

    const submitHandler=async (event)=>{
        event.preventDefault();
        if(!description||!file){
            console.log("Nothing to share");
            return;
        }
        // console.log("post submitted");
        const newPost={
            "userId": user._id,
            "description":description.current.value,
        }
        if(file){
            // const fileName=Date.now()+file.name;
            const data=new FormData();
            data.append("file",file);
            // data.append("name",fileName);
            // newPost.image=fileName;
            try{
                setLoading(true);
                const res=await axios.post(`${apiUrl}/api/upload`,data);
                newPost.image=res.data.url;
                await axios.post(apiUrl+"/api/posts/",newPost);
                window.location.reload();
                console.log("post submitted");
            }
            catch(err){
                setLoading(false);
                console.log(err);
            } 
        }
        else{
            try{
                setLoading(true);
                await axios.post(apiUrl+"/api/posts/",newPost);
                window.location.reload();
            }   
            catch(err){
                setLoading(false);
                console.log(err);
            }
        }
        
        
    }

    return(
        <div className="sharecontainer">
            {user && <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? user.profilePicture :PF+"profile-pics/noProfile.jpeg"} alt="" className="shareProfileImage" />
                    <input placeholder="What's in your mind buddy ?" type="text" className="shareInput" ref={description} />
                </div>
                <hr className="shareHr" />
                {file&&
                <div className="shareImageContainer">
                    <CancelIcon className="shareCancelImg" onClick={()=>{setFile(null)}}/>
                    <img src={URL.createObjectURL(file)} alt="" className="shareImage" />
                    
                </div>
                }

                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <label htmlFor="file" className="shareOption">
                            <span className="shareIconLabel">Media</span>
                            <input style={{display:"none"}} type="file" accept=".jpg,.png,.xhr,.jpeg,.mp4,.mov" id="file" onChange={handleFileChange}/>
                        </label>
                    </div>
                    <div className="shareOptions">
                        <Label htmlColor="lightgreen" className="shareIcon"/>
                        <div className="shareOption">
                            <span className="shareIconLabel">Tag</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <Room htmlColor="skyblue" className="shareIcon"/>
                        <div className="shareOption">
                            <span className="shareIconLabel">Location</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <div className="shareOption">
                            <span className="shareIconLabel">Reactions</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit" >
                       {loading? <CircularProgress color="white" size="15px"/>: "Share" } 
                       {/* share */}
                    </button>
                </form>
            </div>
            }
        </div>
    )
}