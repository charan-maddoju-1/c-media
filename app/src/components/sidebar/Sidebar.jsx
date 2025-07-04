import "./sidebar.css"
import { RssFeed, Chat, Group, VideoLibrary, Bookmarks, QuestionMarkRounded, WorkOutlineOutlined, Event, SchoolOutlined} from "@mui/icons-material"
import {Users} from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";

export default function Sidebar(){
    return(
        <div className="sidebarContainer">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibrary className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <QuestionMarkRounded className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutlineOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show more</button>
                <hr className="hrStyle" />
                <ul className="sidebarFriendsList">
                    {Users.map(friend=>(
                        <CloseFriends key={friend.id} friendDetails={friend} />
                    ))}
                </ul>
            </div>
        </div>

    )
}