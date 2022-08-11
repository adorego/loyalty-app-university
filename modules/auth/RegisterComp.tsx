import { FaEye, FaEyeSlash } from "react-icons/fa";
import httpOperations, { HttpProps } from "../../common/http/http-operations";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { useCallback, useEffect, useState } from "react";

import Button from "../../common/UI/Button";
import Input from "../../common/UI/Input";
import VerificationCode from "./VerificationCode";
import { authActions } from "../../store/auth-slice";
import classes from './RegisterComp.module.css';
import { fetchPortalData } from "../../store/ui-actions";
import { isNumber } from "../../common/helpers/numberTestHelper";
import spineerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import useInput from "../../hooks/use-input";
import { useRouter } from "next/router";

export interface RegisterCompProps{
    primary_color:string;

}
const RegisterComp = (props:RegisterCompProps) =>{
    const [showEye, setShowEye] = useState(true);
    const [showEyeRecovery, setShowEyeRecovery] = useState(true);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const {universitySigla} = router.query;
    const [verifyEmail, setVerifyEmail] = useState(false);
    

    
    useEffect(
        () =>{
            
            if(sigla === ""){
                dispatch(uiActions.setLoading({loading:true}));
                universitySigla !== undefined ? dispatch(fetchPortalData(String(universitySigla))) : "";
                 
            }else{
                dispatch(uiActions.setLoading({loading:true}));
               
            }
        },[sigla, universitySigla, dispatch]
    )

    const validateEmail = useCallback((value:string) =>{
        const result = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(value);
        return{pass:result, errorMessage:'Email invalido'}

    },[]);

    const {value:email, 
        onChangeHandler:onChangeEmailHandler, 
        onBlurHandler:onBlurEmailHandler,
        isInputInvalid: isInputEmailInvalid,
        errorMessage:errorMessageEmail} = useInput(validateEmail);

    const validateCedula = (value:string) => {
            if(!isNumber(value)){
                return({
                    pass:false,
                    errorMessage:"No es una cédula válida"
                });
            }
            return({pass:true, 
                    errorMessage:'Cédula invalida'
                });
    }


    const {value:cedula, 
            onChangeHandler:onChangeCedulaHandler, 
            onBlurHandler:onBlurCedulaHandler,
            isInputInvalid: isInputCedulaInvalid,
            errorMessage:errorMessageCedula} = useInput(validateCedula);
            

    const validatePassword = useCallback((value:string) =>{
        const empty = value !== '';
        const minSize = value.trim().length < 8 ? false : true;
        
        if(!empty){
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
        errorMessage:errorMessagePassword} = useInput(validatePassword);

    const validateConfirmPassword = useCallback((value:string) =>{
        const empty = value !== '';
        const minSize = value.trim().length < 8 ? false : true;
        
        if(!empty){
            return{
                pass:false,
                errorMessage:"Este campo no puede estar vacio"
            }
        }
        if(value.trim() !== password.trim().slice(0,value.length) ){
            return{
                pass:false,
                errorMessage:"La confirmación debe coincidir con la clave"
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
    },[password]);

    
    const {value:repeatedPassword, 
                    onChangeHandler:onChangeRepeatedPasswordHandler, 
                    onBlurHandler:onBlurRepeatedPasswordHandler,
                    isInputInvalid: isInputRepeatedPasswordInvalid,
                    errorMessage:errorMessageRepeatedPassword} = useInput(validateConfirmPassword);

    const onSubmit = async (e:React.SyntheticEvent) =>{
        e.preventDefault();
        if( !isInputEmailInvalid && 
            !isInputPasswordInvalid && 
            !isInputRepeatedPasswordInvalid &&
            sigla !== ''){
            //Send email verification
                const dataToSend = {email, sigla};
                dispatch(uiActions.setLoading({loading:true}));
                
                const sendParam:HttpProps = {
                    operation:'post',
                    url:`/api/v1/university/${sigla}/auth/sendVerificationCode`,
                    data:dataToSend
                }
                const {error, data, result} = await httpOperations(sendParam);
                console.log("Datos:", "error:", error, "data:", data, "result:", result);
                if(!result.ok){
                    // console.log("Ocurrio un error:", error);
                    dispatch(
                        uiActions.showNotification({show:true, 
                            message:`Ocurrió un error en durante la verificación del correo, ${error.message}`, color:"red"}));
                }else{
                    setVerifyEmail(true);
                }
                dispatch(uiActions.setLoading({loading:false}));
                
            }
    }
    const submitIsAvailable = () =>{
        if(validateEmail(email).pass && validateCedula(cedula).pass && validatePassword(password).pass
        && validateConfirmPassword(repeatedPassword)){
            return true;
        }
        return false;
            
    }

    if(verifyEmail){

        return(
            <VerificationCode registerData={{email:email, ci:cedula, password:password}}/>
        )
    }
    
    return(
            <form className={classes.form} onSubmit={onSubmit}>
            <h3 className={classes.title}>Bienvenido, registráte !</h3>
            <Input id="emailId" 
                    required={true}
                    label="Correo" 
                    value={email} 
                    onChangeHandler={onChangeEmailHandler}
                    onBlurHandler={onBlurEmailHandler}
                    isInputInvalid={isInputEmailInvalid}
                    errorMessage={errorMessageEmail}
                    additionalAttributes={{type:"email", autoComplete:"off"}}/>
            <Input id="cedulaId" 
                    required={true}
                    label="Número de Cédula" 
                    value={cedula} 
                    onChangeHandler={onChangeCedulaHandler}
                    onBlurHandler={onBlurCedulaHandler}
                    isInputInvalid={isInputCedulaInvalid}
                    errorMessage={errorMessageCedula}
                    additionalAttributes={{type:"text", autoComplete:"off"}}/>
                   
            <div className={classes.passwordContainer}>
                        <Input id="passwordId" 
                        required={true}
                        label="Clave" 
                        value={password} 
                        onChangeHandler={onChangePasswordHandler}
                        onBlurHandler={onBlurPasswordHandler}
                        isInputInvalid={isInputPasswordInvalid}
                        errorMessage={errorMessagePassword}
                        additionalAttributes={{type:showEye ? "password" : "text", autoComplete:"off"}}/>
                        {showEye && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                        {!showEye && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowEye(!showEye)}/></i>}
                    </div>
                    
                    <div className={classes.confirmPasswordContainer}>
                        <Input id="confirmId" 
                        required={true}
                        label="Confirmar clave" 
                        value={repeatedPassword} 
                        onChangeHandler={onChangeRepeatedPasswordHandler}
                        onBlurHandler={onBlurRepeatedPasswordHandler}
                        isInputInvalid={isInputRepeatedPasswordInvalid}
                        errorMessage={errorMessageRepeatedPassword}
                        additionalAttributes={{type:showEyeRecovery ? "password" : "text", autoComplete:"off"}}/>
                        {showEyeRecovery && <i><FaEye  className={classes.eyeIcon} onClick={() => setShowEyeRecovery(!showEyeRecovery)}/></i>}
                        {!showEyeRecovery && <i><FaEyeSlash className={classes.eyeIcon} onClick={() => setShowEyeRecovery(!showEyeRecovery)}/></i>}
                    </div>
                    <div className={classes.submitButton}>
                        <Button label="Registrarme" isAvailable={submitIsAvailable()} 
                        
                        additionalStyle={{backgroundColor:props.primary_color,
                        color:"var(--loyalty-on-primary-text-color)", width:"100%",
                        margin:"16px 0px 32px 0px"}}
                         />
                    </div>
                </form>
    )
}

export default RegisterComp;


