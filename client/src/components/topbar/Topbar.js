import "./Topbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Search,Person, Chat, Notifications} from "@mui/icons-material"

import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext,useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logoutCall } from "../../apiCalls";

function Topbar(){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user,dispatch}=useContext(AuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navigate=useNavigate();
    const handleLogout = () => {
        // alert("Logging out...");
        logoutCall(dispatch);
        navigate("/login",{replace:"true"});
    };


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
                <Link to={"/home"} className="topBarLink">Home page</Link>
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

            <div className="dropdown" ref={dropdownRef}>
                <img src={user.profilePicture!==""? PF+user.profilePicture:PF+"profile-pics/noProfile.jpeg"} alt="profile pic" className="topBarImage" onClick={() => setDropdownOpen(!dropdownOpen)} />
                <ul className={`dropdown-menu dropdown-menu-end mt-2 ${dropdownOpen ? 'show' : ''}`}>
                    <li><Link className="dropdown-item" to={`/profile/${user.username}`}>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" style={{color:"brown"}} onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        </div>
    </div>
    
    </>
    );
    
}

export default Topbar;