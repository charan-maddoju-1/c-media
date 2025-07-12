import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"
import { useContext, useState ,useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';

import axios from "axios";

export default function Share(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
  
    const [file,setFile]=useState(null);
    const description=useRef();

    const submitHandler=async (event)=>{
        event.preventDefault();
        if(!description||!file){
            console.log("Nothing to share");
            return;
        }
        console.log("post submitted");
        const newPost={
            "userId": user._id,
            "description":description.current.value,
        }
        if(file){
            const fileName=Date.now()+file.name;
            const data=new FormData();
            data.append("file",file);
            data.append("name",fileName);
            newPost.image=fileName;
            try{
                await axios.post(`/api/upload?name=${fileName}`,data);
            }
            catch(err){
                console.log(err);
            } 
        }
        try{
            await axios.post("/api/posts/",newPost);
            window.location.reload();
        }   
        catch(err){
            console.log(err);
        }
        
    }

    return(
        <div className="sharecontainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture!==""?PF+user.profilePicture:PF+"profile-pics/noProfile.jpeg"} alt="" className="shareProfileImage" />
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
                            <input style={{display:"none"}} type="file" accept=".jpg,.png,.jpeg" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
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
                    <button className="shareButton" type="submit" >Share</button>
                </form>
            </div>
        </div>
    )
}