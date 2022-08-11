import httpOperations, { HttpProps } from "../../common/http/http-operations";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import Button from "../../common/UI/Button";
import Input from "../../common/UI/Input";
import { RegisterModel } from "../../common/models/register";
import { authActions } from "../../store/auth-slice";
import classes from './VerificationCode.module.css';
import { uiActions } from "../../store/ui-slice";
import { useRef } from "react";
import { useRouter } from "next/router";
import {useSession} from 'next-auth/react';

export interface VerificationCodeProps{
    registerData:RegisterModel;
}
const VerificationCode = (props:VerificationCodeProps) =>{
    const verification_code = useAppSelector(state => (state.auth.user.verification_code));
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const colors = useAppSelector(state => state.ui.color);
    const dispatch = useAppDispatch();
    const inputValue = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const email = useAppSelector(state => state.auth.user.email);
    
    
    const onValidate = async (event:React.ChangeEvent<HTMLButtonElement>) =>{
        console.log("onValidate:", inputValue.current?.value);
        if(inputValue.current?.value !== ""){
            dispatch(uiActions.setLoading({loading:true}));
             const currentValue = inputValue.current?.value;
             if(currentValue === verification_code){
                const httpParams:HttpProps = {
                    operation:"post",
                    url:`/api/v1/university/${sigla}/auth/register`,
                    data:{
                        email:props.registerData.email,
                        sigla:sigla,
                        cedula:props.registerData.ci,
                        password:props.registerData.password
                    }
                }
                const {error, data, result} = await httpOperations(httpParams);
                if(!result.ok){
                    dispatch(uiActions.showNotification({show:true, message:`Ocurrió un error en el registro:${error.message}`, color:"red"}))
                }else{
                    dispatch(uiActions.showNotification({show:true, message:`Registro Exitoso`, color:"green"}))
                    router.push(`/${sigla}/auth/login`);
                }
                
                
             }
            dispatch(uiActions.setLoading({loading:false}));
        }
       
    }
    return(
            <div className={classes.box}>

                <p>Por favor ingresá el código que te hemos enviado por correo</p>
                <Input label="" ref={inputValue} required={false}  />
                <Button onClickHandler={onValidate}  
                isAvailable={true} 
                label="Confirmar" 
                additionalStyle={{color:"var(--loyalty-on-primary-text-color)", 
                backgroundColor:colors.primary,
                margin:"16px 0px 0px 0px", width:"90vw", maxWidth:"320px"}}/>
            </div>
    )
    
    

}

export default VerificationCode;