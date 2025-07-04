import "./closeFriends.css"

export default function CloseFriends(props){
    const {friendDetails}=props;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <li className="sidebarFriendListItem">
            <img src={PF+friendDetails.profilePicture} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{friendDetails.username}</span>
        </li>
    )
}