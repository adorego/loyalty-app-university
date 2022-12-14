import { AppThunk } from "./index";
import { authActions } from './auth-slice';
import { uiActions } from './ui-slice';

export const fetchPortalData = (sigla:string):AppThunk =>
    async dispatch => {
        const result = await fetch(`/api/v1/university/${sigla}/portal`);
        const data = await result.json();
        if(!result.ok){
            dispatch(uiActions.showNotification({show:true, message:data.message, color:"red"}));
        }else{
            dispatch(authActions.setUniversity({logo:data.logo, sigla:sigla, favicon:data.favicon}));
            dispatch(uiActions.setColors({primary:data.primary_color, secondary:data.secondary_color,
            secondaryLight:data.secondaryLight_color, selectedTabColor:data.selectedTab_color}));
            dispatch(uiActions.setHead({title:data.title, description:data.forText}));
        }


    }