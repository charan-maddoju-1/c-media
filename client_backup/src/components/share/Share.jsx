import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"

export default function Share(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="sharecontainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={`${PF}profile-pics/profile1.png`} alt="" className="shareProfileImage" />
                    <input placeholder="What's in your mind buddy ?" type="text" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <div className="shareOption">
                            <span className="shareIconLabel">Media</span>
                        </div>
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
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}