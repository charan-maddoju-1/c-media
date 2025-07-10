import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online"


export default function Rightbar({user}){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightbar=()=>{
        return(
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}icons/cake.jpeg`} alt="" className="birthdayImage" />
                    <span className="birthdayText">
                        <b>Charan</b> and <b>4 other friends</b> have birthaday today.
                    </span>
                </div>
                <img src={`${PF}posts/post1.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendsList">
                    {Users.map(onlineUser=>(
                        <Online key={onlineUser.id} onlineUser={onlineUser} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar=()=>{
        // return <h1>Charan Friend</h1>
        return(
            <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    {/* <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Age :</span>
                        <span className="rightbarInfoValue"> {user.age} </span>
                    </div> */}
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Profession :</span>
                        <span className="rightbarInfoValue"> {user.profession} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship :</span>
                        <span className="rightbarInfoValue"> {user.relationship} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From :</span>
                        <span className="rightbarInfoValue"> {user.from} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City :</span>
                        <span className="rightbarInfoValue"> {user.city} </span>
                    </div>
                </div>

                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarUserFriends">
                    <div className="rightbarUserFriend">
                        <img src={`${PF}profile-pics/profile6.png`} alt="" className="rightbarFriendImage" />
                        <span className="rightbarFriendName">Charan</span>
                    </div>
                    <div className="rightbarUserFriend">
                        <img src={`${PF}profile-pics/profile7.png`} alt="" className="rightbarFriendImage" />
                        <span className="rightbarFriendName">Bunny</span>
                    </div>
                    <div className="rightbarUserFriend">
                        <img src={`${PF}profile-pics/profile8.png`} alt="" className="rightbarFriendImage" />
                        <span className="rightbarFriendName">Kittu</span>
                    </div>
                    <div className="rightbarUserFriend">
                        <img src={`${PF}profile-pics/profile5.png`} alt="" className="rightbarFriendImage" />
                        <span className="rightbarFriendName">Mishna</span>
                    </div>
                    <div className="rightbarUserFriend">
                        <img src={`${PF}profile-pics/profile10.png`} alt="" className="rightbarFriendImage" />
                        <span className="rightbarFriendName">Fiaz</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {user? <ProfileRightbar/> : <HomeRightbar/> }
            </div>
        </div>
    )
}