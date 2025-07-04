import "./Home.css"
import Topbar from "../../components/topbar/Topbar.js"
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Rightbar from '../../components/rightbar/Rightbar.jsx';

function Home(){
    return (
        <>
        <Topbar/>
        <div className="homePageContainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
        </div>
        </>
    )
}

export default Home;