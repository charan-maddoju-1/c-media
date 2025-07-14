import "./chatOnline.css"

export default function ChatOnline() {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="clasOnlineImageContainer">
                <img src="http://localhost:3000/assets/profile-pics/profile5.png" alt="" className="chatOnlineFriendImage" />
                <div className="chatOnlineBadge"></div>   
            </div>
            <span className="chatOnlineFriendName">Bunny</span>
        </div>
        
    </div>
  )
}
