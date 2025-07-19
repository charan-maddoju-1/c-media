import "./online.css"

export default function Online(props){
    const {onlineUser}=props;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriendsListItem">
            <div className="rightbarProfileImageContainer">
                <img src={onlineUser.profilePicture? PF+onlineUser.profilePicture:PF+"/profile-pics/noProfile.jpeg"} alt="" className="rightbarProfileImage" />
                <span className="rightbarOnline"> </span>
            </div>
            <span className="rightbarProfilName">{onlineUser.username}</span>
        </li>
    )
}