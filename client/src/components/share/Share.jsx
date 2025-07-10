import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"
import { useContext, useState ,useRef} from "react";
import {AuthContext} from "../../context/AuthContext";

import axios from "axios";

export default function Share(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
  
    const [file,setFile]=useState(null);
    const description=useRef();

    const submitHandler=async (event)=>{
        event.preventDefault();
        console.log("post submitted");
        const newPost={
            userId: user._id,
            description:description.current.value,
        }
        try{
            await axios.post("/api/posts/",newPost);
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