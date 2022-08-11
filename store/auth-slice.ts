import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    isLogged:false,
    logOut:false,
    user:{
        name:"",
        lastName:"",
        email:"",
        admin:false,
        university_id:"",
        verified:false,
        verification_code:""

    },
    university:{
        sigla:"",
        logo:{src:"", width:"", height:""},
        favicon:""
        
    }
}
const authSlice = createSlice({
    name:"auth",
    initialState:authInitialState,
    reducers:{
        login(state, action){
            const user = action.payload.user;
            const university = action.payload.university;
            state.isLogged = true;
            state.user = {...user};
            state.university = {...university};
        },
        setUniversity(state, action){
            state.university = action.payload;
        },
        setVerificationCode(state, action){
            state.user.verification_code = action.payload.verification_code;
        },
        validate_email(state, action){
            state.user.verified = action.payload.verified;

        },
        setLogout(state, action){
            state.logOut = action.payload.logOut;
        },
        setUserEmail(state, action){
            state.user.email = action.payload.email;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;