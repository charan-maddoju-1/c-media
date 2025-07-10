import "./Topbar.css"

import {Search,Person, Chat, Notifications} from "@mui/icons-material"

import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Topbar(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
    return(
    <>  
    <div className="topbarContainer">

        <div className="topbarLeftContainer">
            <Link to="/home" style={{textDecoration:"none"}}>
                <span className="logo">C-Media</span>
            </Link> 
        </div>
        <div className="topbarMiddleContainer">
            <div className="searchBar">
                <Search className="searchIcon" />
                <input placeholder="...Search for a friend, post or video" className="searchInput"/>

            </div>
            
        </div>
        <div className="topbarRightContainer">
            <div className="topBarLinks">
                <p className="topBarLink">Home page</p>
                <p className="topBarLink">Time Line</p>
            </div>
            <div className="topBarIcons">
                <div className="topBarIconItem">
                    <Person/>
                    <span className="topBarIconBadge">1</span>
                </div>
                <div className="topBarIconItem">
                    <Chat/>
                    <span className="topBarIconBadge">3</span>
                </div>
                <div className="topBarIconItem">
                    <Notifications/>
                    <span className="topBarIconBadge">4</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture!==""? PF+user.profilePicture:PF+"profile-pics/noProfile.jpeg"} alt="profile pic" className="topBarImage" />
            </Link>
        </div>
    </div>
    
    </>
    );
    
}

export default Topbar;