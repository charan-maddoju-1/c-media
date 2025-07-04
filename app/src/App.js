import './App.css';
import Home from "./pages/home-page/Home.jsx";
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/register.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom"
// import ProtectedRoute from './pages/ProtectedRoute/index.js';
import NotFound from './pages/NotFound/index.js';

function App() {
  // return <>
  // <Register/>
  // <Login/>
  // <Home/>
  // <Profile/>
  // </>
  return (
    <BrowserRouter > 
         <Routes>
            <Route exact path="/login" element={<Login/>}/>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />} />
            <Route  path="/notfound" element={<NotFound/>}/>
            
        </Routes>
    </BrowserRouter>
  )
}

export default App;
