import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE={
    // user:{
    //     "_id":"686cbf15fd0227852b262373",
    // "username":"arun",
    // "email": "arun@gmail.com",
    // "password": "$2b$10$KWxUD48io4FemvBN24IW1.tRsNgksUTadoC8E7OYvmJI0DR5tDey.",
    // "profilePicture": "",
    // "coverPicture": "",
    // "relationship": "",
    // "followers":[],
    // "following":[],
    // "isAdmin": false,
    // "description": "",
    // "city": "",
    // "from": "",
    // "profession": "",
    // },
    user:JSON.parse(localStorage.getItem("user"))||null,
    jwt_token:localStorage.getItem("token")||null,
    isFetching:false,
    error:false
}

export const AuthContext=createContext(INITIAL_STATE);


export const AuthContextProvider=({children})=>{
    const [state, dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user:state.user,
            jwt_token:state.jwt_token,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}