import httpOperations, { HttpProps } from "../../common/http/http-operations";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import BasicCard from "../../common/Layout/BasicCard";
import { Benefit } from "../../common/models/benefit";
import Input from "../../common/UI/Input";
import SectionHeader from "../../common/UI/SectionHeader";
import classes from "./ShareBenefitComp.module.css";
import { fetchPortalData } from "../../store/ui-actions";
import { getBenefitCode } from "../../common/helpers/generateBenefitCode";
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import { url } from "inspector";
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
    const [urlWA, setUrlWA] = useState<string>("");
    
    const dinamicShareButtonClass = codeGenerated.current ? "shareButtonContainer_visible" : "shareButtonContainer_notVisible" ;
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
        },[sigla, dispatch, router.query]
    )

    const isOkToShareButtonAvailable = useCallback(() =>{
        if(validateName(name).pass && validateLastName(lastName).pass && validateCellPhone(cellPhone).pass && benefitToShare._id !== '' ){
            
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
            console.log("benefitToShare is:", benefitToShare);
            if(benefitToShare && Object.keys(benefitToShare).length === 0 && sigla !== ""){
                console.log("Before routing");
                router.push(`/${sigla}/mainClient`);
            }
        },[benefitToShare, sigla]
    )

    useEffect(
        () =>{
            if(benefitCode.length > 0 && codeGenerated.current){
                const formatedCellPhone = transformCellPhoneNumber(cellPhone);
                setUrlWA(`https://wa.me/${formatedCellPhone}?text=https://www.loyaltyapp.com.py/benefit/${benefitCode}/`);
            }
        },[benefitCode, codeGenerated]
    )

    useEffect(
        () =>{
            const callGenerateCode = async () =>{
                
                    const {error, data, result} = await getBenefitCode(sigla, benefitToShare._id, name, lastName, cellPhone);
                    if(!result.ok){
                        console.log("Ocurrio un error:", error);
                        dispatch(uiActions.showNotification({show:true, 
                            message:`Ocurrió un error al generar el código:${error.message}`, color:"red"}))
                    }else{
                        setBenefitCode(data.code);
                        codeGenerated.current = true;
                    }
                }
            
            
            try{
                
                if(isOkToShareButtonAvailable()){
                    callGenerateCode();
                    
                }
            }catch(error){
                dispatch(uiActions.showNotification({show:true, 
                        message:`Ocurrió un error al generar el código:${error}`, color:"red"}))
            }
            
        },[sigla, benefitToShare._id, name, lastName, cellPhone, dispatch, isOkToShareButtonAvailable]
    )

    


   
    if(loading === true || status === 'loading' || !benefitToShare._id){
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }
    
    
    const generateBenefit = () =>{
        //Almacenar los datos del beneficiario (nombre, apellido, celular, código del beneficio, código de la Campaña)
    }
    
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
                
                <BasicCard additionalStyle={{margin:"auto", 
                backgroundColor:colors.primary, 
                color:"var(--loyalty-backGround-color)",
                maxWidth:"450px",
                textAlign:"center"}}>
                    <p className={classes.benefitText}>{`Este es un Beneficio Exlusivo para ${name} ${lastName}`} </p>
                    <hr />
                    <h6 className={classes.benefitDescription}>{benefitToShare.description}</h6>
                    <hr />
                    {benefitCode !== "" && <p className={classes.benefitText}>{'El código de este Beneficio Exclusivo es:'}</p>}
                    {benefitCode !== "" && <p className={classes.benefitText}>{benefitCode}</p>}
                    <div className={classes[`${dinamicShareButtonClass}`]} style={{backgroundColor:colors.secondaryLight, color:"var(--loyalty-backGround-color)"}}>
                        
                        <a className={classes.shareLink}  target={"_blank"} href={urlWA} rel="noreferrer" onClick={generateBenefit}>
                            Ok Compartir!
                        </a>
                        
                    </div>
                    
                </BasicCard>
                
            </div>
        )
    
}

export default ShareBenefitComp;


