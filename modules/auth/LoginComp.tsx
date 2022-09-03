import { FaEye, FaEyeSlash } from "react-icons/fa";
import httpOperations, { HttpProps } from "../../common/http/http-operations";
// import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { useCallback, useEffect, useState } from "react";

import Button from "../../common/UI/Button";
import Input from "../../common/UI/Input";
import Link from "next/link";
import { authActions } from "../../store/auth-slice";
import classes from './LoginComp.module.css';
import { fetchPortalData } from "../../store/ui-actions";
import { sendVerificationCode } from "../../store/auth-actions";
import {signIn} from "next-auth/react";
import spineerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import useInput from "../../hooks/use-input";
import { useRouter } from "next/router";

const LoginComp = () =>{
    const dispatch = useAppDispatch();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const colors = useAppSelector(state => state.ui.color);
    // const {data:session, status} = useSession();
    const [showEye, setShowEye] = useState(true);
    const {universitySigla} = router.query;
    const [loading, setLoading] = useState(false);
    

    useEffect(
        () =>{
            
            if(sigla === ""){
                setLoading(true);
                
                universitySigla !== undefined ? dispatch(fetchPortalData(String(universitySigla))) : "";
                 
            }else{
                setLoading(false);
               
            }
        },[sigla, universitySigla, dispatch]
    )

    const validateEmail = useCallback((value:string) =>{
        const empty = value.length === 0;
       
        if(empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        return{
            pass:true,
            errorMessage:""}

    },[]);

    const {value:email, 
        onChangeHandler:onChangeEmailHandler, 
        onBlurHandler:onBlurEmailHandler,
        isInputInvalid: isInputEmailInvalid,
        valueIsValid: emailValueIsValid,
        onFocus:onFocusEmailHandler,
        errorMessage:errorMessageEmail} = useInput(validateEmail);

    const validatePassword = useCallback((value:string) =>{
        const empty = value.length === 0;
        const minSize = value.trim().length < 8 ? false : true;
        
        if(empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        if(!minSize){
            return{
                pass:false,
                errorMessage:"Tu clave debe tener 8 caracteres como mínimo"
            }
        }
        return{
            pass:true,
            errorMessage:""
        }
    },[]);

    

    const {value:password, 
            onChangeHandler:onChangePasswordHandler, 
            onBlurHandler:onBlurPasswordHandler,
            isInputInvalid: isInputPasswordInvalid,
            onFocus:onFocusPasswordHandler,
            valueIsValid:passwordIsValid,
            errorMessage:errorMessagePassword} = useInput(validatePassword);

    const isDataAvailable = () =>{
        if(validateEmail(email).pass && validatePassword(password).pass ){
            return true;
        }
        return false;
    }

    const onSubmit = async (e:React.SyntheticEvent) =>{
                e.preventDefault();
                if(isDataAvailable()){
                    dispatch(uiActions.setLoading({loading:true}));
                    const result:any = await signIn('credentials', {
                        redirect: false,
                        email: email,
                        password: password,
                        sigla:sigla
                    
                    })
                    const data = await result.json();
                    if(result.error){
                        dispatch(uiActions.setLoading({loading:false})); 
                        dispatch(uiActions.showNotification({show:true, message:"Hay un problema con el par usuario/clave", color:'red'}));
                    }else{
                        dispatch(authActions.login({id:data.id, email:data.email}))
                        router.push(`/${sigla}/mainClient`);
                
                        
                    }
                    dispatch(uiActions.setLoading({loading:false}));
                    
                    
                }
               
                
    }

    const onRegisterClickHandler = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        router.push(`/${sigla}/auth/register`);
    }
    
    
    const enableSubmit = !isInputEmailInvalid && !isInputPasswordInvalid;
    
        if(loading){
            return(
                <div className={spineerClasses.spin}></div>
            )
        }
        return (
            <>
                <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
                    <h3 className={classes.title}>Bienvenido!</h3>
                    
                    <Input 
                    required={true}
                    id="emailId" 
                    label="Correo" 
                    value={email} 
                    onFocusHandler={onFocusEmailHandler}
                    onChangeHandler={onChangeEmailHandler}
                    onBlurHandler={onBlurEmailHandler}
                    isInputInvalid={isInputEmailInvalid}
                    errorMessage={errorMessageEmail}
                    additionalAttributes={{type:"email", autoComplete:"off"}}/>
                    <div className={classes.passwordContainer}>
                            <Input 
                            required={true}
                            id="passwordId" 
                            label="Clave" 
                            value={password} 
                            onChangeHandler={onChangePasswordHandler}
                            onFocusHandler={onFocusPasswordHandler}
                            onBlurHandler={onBlurPasswordHandler}
                            isInputInvalid={isInputPasswordInvalid}
                            errorMessage={errorMessagePassword}
                            additionalAttributes={{type:showEye ? "password" : "text", autoComplete:"off"}}/>
                            {showEye && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                            {!showEye && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                        
                    </div>
                    
                    <div className={classes.recoverLink}>

                        <Link href="/recoverpassword"><a>Olvidé mi clave</a></Link>
                    </div>
                    
                    {colors.primary && <div className={classes.submitButton}>
                        <Button 
                        isAvailable={enableSubmit}
                        label="Ingresar" 
                        additionalStyle={{backgroundColor:colors.primary, 
                        color:"var(--loyalty-on-primary-text-color)", width:"100%", height:"49px"}}/>
                    </div>}
                    
                    
                </form>
                <div className={classes["submitButton"] + ' ' + classes["registerButton"]}>
                        <Button 
                        isAvailable={true}
                        label="Registrarme" 
                        onClickHandler={onRegisterClickHandler}
                        additionalStyle={{backgroundColor:colors.secondaryLight, color:"1A1A1A", width:"100%", height:"49px"}}/>
                </div>
                
        
                
            
            </>
        )
}
        
    
    


export default LoginComp;