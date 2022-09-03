import { AppThunk } from './index';
import { authActions } from './auth-slice';
import httpOperations from '../common/http/http-operations';
import { uiActions } from './ui-slice';

export const sendVerificationCode = (sigla:string, email:string):AppThunk =>
async dispatch => {
    const httpOperationParam = {
        operation:"post",
        url:`/api/v1/university/${sigla}/auth/sendVerificationCode`,
        data:{
            body:{sigla, email}
        }
    }
    const {data, error, result} = await httpOperations(httpOperationParam);
    if(!result.ok){
        dispatch(uiActions.showNotification({show:true, message:`Ocurrió un error:+ ${error}`, color:"red"}));
    }else{
        dispatch(authActions.setVerificationCode({verificationCode:result.verification_code}));
    }
}

export const fetchAuthData = (sigla:string):AppThunk =>
async dispatch => {
    const httpOperationParam = {
        operation:"post",
        url:`/api/v1/university/${sigla}/auth/loginData`,
        data:{
            body:{sigla:sigla}
        }
    }
    const {data, error, result} = await httpOperations(httpOperationParam);
    console.log("data:", data);
    if(!result.ok){
        dispatch(uiActions.showNotification({show:true, message:`Ocurrió un error:+ ${error}`, color:"red"}));
    }else{
        dispatch(authActions.setUserData({user:{id:data._id, email:data.email, admin:data.admin}}));
    }
}