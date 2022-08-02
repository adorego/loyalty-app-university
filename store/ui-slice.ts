import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notification:{
        show:false,
        message:"Hubo un error",
        color:"green"
    },
    color:{
        primary:"",
        secondary:"",
        secondaryLight:""

    },
    loading:false,
    head:{
        title:"",
        description:""
    }
}

const uiSlice = createSlice({
    name:'ui',
    initialState:initialState,
    reducers:{
        showNotification(state, action){
            state.notification = action.payload;
            state.loading = state.loading;
        },
        setLoading(state, action){
            state.loading = action.payload.loading,
            state.notification = state.notification
        },
        setColors(state, action){
            state.color = action.payload
        },
        setHead(state, action){
            state.head = action.payload
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;