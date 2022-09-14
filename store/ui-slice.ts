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
        secondaryLight:"",
        selectedTabColor:""

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
            
        },
        setLoading(state, action){
            state.loading = action.payload.loading
            
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