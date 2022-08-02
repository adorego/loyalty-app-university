import httpOperations, { HttpProps } from "../../common/http/http-operations";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import BasicCard from "../../common/Layout/BasicCard";
import { Benefit } from "../../common/models/benefit";
import Button from "../../common/UI/Button";
import Input from "../../common/UI/Input";
import SectionHeader from "../../common/UI/SectionHeader";
import classes from "./ShareBenefitComp.module.css";
import { fetchPortalData } from "../../store/ui-actions";
import { getBenefitCode } from "../../common/helpers/generateBenefitCode";
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import useInput from "../../hooks/use-input";
import { useRouter } from "next/router";
import {useSession} from 'next-auth/react';

export interface ShareBenefitCompProps{

}
const ShareBenefitComp = (props:ShareBenefitCompProps) =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const colors = useAppSelector(state => state.ui.color);
    const {data:session, status} = useSession();
    
    const [loading, setLoading] = useState(true);
    const codeGenerated = useRef<boolean>(false);
    const [benefitCode, setBenefitCode] = useState<string>("");
    const benefitToShare:Benefit = useAppSelector(state => state.shareBenefit.benefit);
    let urlWA = '';
    
    
    const validateName = useCallback((value:string) =>{
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

    const {value:name, 
        onChangeHandler:onChangeNameHandler, 
        onBlurHandler:onBlurNameHandler,
        isInputInvalid: isInputNameInvalid,
        valueIsValid: nameValueIsValid,
        onFocus:onFocusNameHandler,
        errorMessage:errorMessageName} = useInput(validateName);
        
    const validateLastName = useCallback((value:string) =>{
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
    
    const {value:lastName, 
            onChangeHandler:onChangeLastNameHandler, 
            onBlurHandler:onBlurLastNameHandler,
            isInputInvalid: isInputLastNameInvalid,
            valueIsValid: lastNameValueIsValid,
            onFocus:onFocusLastNameHandler,
            errorMessage:errorMessageLastName} = useInput(validateLastName);

    const validateCellPhone = useCallback((value:string) =>{
                const empty = value.length === 0;
               
                if(empty){
                    return{
                        pass:false,
                        errorMessage:"Este campo no puede estar vacio"
                    }
                }
                if(value.length < 10){
                    return{
                        pass:false,
                        errorMessage:"El número debe tener 9 digitos como minimo"
                    }
                }
                return{
                    pass:true,
                    errorMessage:""}
        
            },[]);
        
    const {value:cellPhone, 
           onChangeHandler:onChangeCellPhoneHandler, 
           onBlurHandler:onBlurCellPhoneHandler,
           isInputInvalid: isInputCellPhoneInvalid,
           valueIsValid: cellPhoneValueIsValid,
           onFocus:onFocusCellPhoneHandler,
           errorMessage:errorMessageLastCellPhone} = useInput(validateCellPhone);
      

    useEffect(
        () =>{
            
            if(sigla === ""){
                setLoading(true);
                const {universitySigla} = router.query;
                universitySigla !== undefined ? dispatch(fetchPortalData(String(universitySigla))) : "";
                 
            }else{
                setLoading(false);
               
            }
        },[sigla, dispatch]
    )

    const isOkToShareButtonAvailable = useCallback(() =>{
        if(validateName(name).pass && validateLastName(lastName).pass && validateCellPhone(cellPhone).pass){
            
            return true;
        }
        return false;
    },[validateName, name, validateLastName, lastName, validateCellPhone, cellPhone]);

    const transformCellPhoneNumber = (number:string) =>{
        const formatedNumber = '+595' + number.slice(1);
        console.log("formatedNumber:", formatedNumber);
        return formatedNumber;
    }

    

    useEffect(
        () =>{
            const callGenerateCode = async () =>{
                
                    const {error, data, result} = await getBenefitCode(sigla, benefitToShare._id, name, lastName, cellPhone);
                    if(!result.ok){
                        console.log("Ocurrio un error:", error);
                        dispatch(uiActions.showNotification({show:true, 
                            message:`Ocurrió un error al generar el código:${error}`, color:"red"}))
                    }else{
                        setBenefitCode(data.code);
                        codeGenerated.current = true;
                    }
                }
            const createShareUrl = () =>{
                    const formatedCellPhone = transformCellPhoneNumber(cellPhone);
                    urlWA = `https://wa.me/${formatedCellPhone}?text=https://www.google.com.py`
                }
            
            try{
                console.log("before generate code");
                if(isOkToShareButtonAvailable()){
                    callGenerateCode();
                    createShareUrl();
                }
            }catch(error){
                dispatch(uiActions.showNotification({show:true, 
                        message:`Ocurrió un error al generar el código:${error}`, color:"red"}))
            }
            
        },[sigla, benefitToShare._id, name, lastName, cellPhone, dispatch, isOkToShareButtonAvailable]
    )

    


           
    // if(loading === true || status === 'loading'){
    //     return(
    //         <div className={spinnerClasses.spin}></div>
    //     )
    // }
    
    
    // if(Object.keys(benefitToShare).length === 0){
    //     router.push(`/${sigla}/mainClient`);
    // }
    // if(status === 'unauthenticated'){
    //     router.push(`/${sigla}/mainClient`);
    //     return(
    //         <div className={spinnerClasses.spin}></div>
    //     )
    // }
    // if(status === 'authenticated'){
        return(
            <div className={classes.container}>
                <SectionHeader titleText="" centerMarginTitle={false} />
                <h5 className={classes.title}>Datos de tu Referido</h5>
                <Input 
                        required={true}
                        id="nameId" 
                        label="Nombre" 
                        value={name} 
                        onFocusHandler={onFocusNameHandler}
                        onChangeHandler={onChangeNameHandler}
                        onBlurHandler={onBlurNameHandler}
                        isInputInvalid={isInputNameInvalid}
                        errorMessage={errorMessageName}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                <Input 
                        required={true}
                        id="lastNameId" 
                        label="Apellido" 
                        value={lastName} 
                        onFocusHandler={onFocusLastNameHandler}
                        onChangeHandler={onChangeLastNameHandler}
                        onBlurHandler={onBlurLastNameHandler}
                        isInputInvalid={isInputLastNameInvalid}
                        errorMessage={errorMessageLastName}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                <Input 
                        required={true}
                        id="cellPhoneId" 
                        label="Celular" 
                        value={cellPhone} 
                        onFocusHandler={onFocusCellPhoneHandler}
                        onChangeHandler={onChangeCellPhoneHandler}
                        onBlurHandler={onBlurCellPhoneHandler}
                        isInputInvalid={isInputCellPhoneInvalid}
                        errorMessage={errorMessageLastCellPhone}
                        additionalAttributes={{type:"text", autoComplete:"off"}}/>
                {/* <div className={classes.includeNameContainer}>
                    <input className={classes.includeName} type="checkbox" id="includeNameId" />
                    <label htmlFor="includeNameId">Incluir mi nombre</label>
                </div> */}
                <h5 className={classes.benefitTitle}>Beneficio a compartir</h5>
                
                <BasicCard additionalStyle={{margin:"auto"}}>
                    <p className={classes.benefitText}>{`Este es un Beneficio Exlusivo para ${name} ${lastName}`} </p>
                    <hr />
                    <h6 className={classes.benefitDescription}>{benefitToShare.description}</h6>
                    <hr />
                    {benefitCode !== "" && <p className={classes.benefitText}>{'El código de este Beneficio Exclusivo es:'}</p>}
                    {benefitCode !== "" && <p className={classes.benefitText}>{benefitCode}</p>}
                    <div className={classes.shareButtonContainer} style={{backgroundColor:colors.primary, color:"var(--loyalty-backGround-color)"}}>
                        <a className={classes.shareLink}  target={"_blank"} href={urlWA} rel="noreferrer">
                            Ok Compartir!
                        </a>
                        
                    </div>
                    
                </BasicCard>
                
            </div>
        )
    
}

export default ShareBenefitComp;


