export const LoginStart=(user)=>({
    type:"LOGIN_START"
});

export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payLoad: user
});

export const LoginFailure=(error)=>({
    type:"LOGIN_FAILURE",
    payLoad:error
});