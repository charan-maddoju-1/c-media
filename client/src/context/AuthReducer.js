const AuthReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                jwt_token:null,
                isFetching:true,
                error:false
            };
            
        case "LOGIN_SUCCESS":
            return{
                user:action.payLoad.user,
                jwt_token:action.payLoad.jwt_token,
                isFetching:false,
                error:false
            };

        case "LOGIN_FAILURE":
            return{
                user:null,
                jwt_token:null,
                isFetching:false,
                error:action.payLoad
            };

        case "LOGOUT":
            return {
                user: null,
                jwt_token: null,
                isFetching: false,
                error: false
            };

        case "UPDATE_FOLLOWING":
            return{
                ...state,
                user: {
                    ...state.user,
                    following: action.payload,
                },
            };
            
        default:
            return state;
    }
}

export default AuthReducer;