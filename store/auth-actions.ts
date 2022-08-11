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