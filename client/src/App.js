import './App.css';
import Home from "./pages/home-page/Home.jsx";
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/register.jsx';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
// import ProtectedRoute from './pages/ProtectedRoute/index.js';
import NotFound from './pages/NotFound/index.js';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.js';

function App() {
  // return <>
  // <Register/>
  // <Login/>
  // <Home/>
  // <Profile/>
  // </>
  const {user} =useContext(AuthContext);
  return (
    <BrowserRouter > 
         <Routes>
          
            <Route exact path="/" element={user?<Home />:<Register/>} />
            
                <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
                <Route path="/register" element={user?<Navigate to="/"/>:<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />} />
            <Route  path="/notfound" element={<NotFound/>}/>
            
        </Routes>
    </BrowserRouter>
  )
}

export default App;
