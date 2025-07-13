import axios from "axios";

export const loginCall=async(userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res=await axios.post("/api/auth/login",userCredential);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.jwt_token);//storing jwt_token
        dispatch({
            type:"LOGIN_SUCCESS",
            payLoad:{
                user:res.data.user,
                jwt_token:res.data.jwt_token
            }
        });
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payLoad:err});
    }
}

export const logoutCall=(dispatch)=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });
}