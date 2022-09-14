import React, { useCallback, useEffect, useRef, useState } from "react";
import httpOperations, { HttpProps } from "../../common/http/http-operations";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import BasicCard from "../../common/Layout/BasicCard";
import Button from "../../common/UI/Button";
import { ConfiguredBenefit } from "../../common/models/configuredBenefit";
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
   
    const waLink = useRef<HTMLAnchorElement>(null);
    const leadSaved = useRef<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [generatingCode, setGeneratingCode] = useState(false);
    const codeGenerated = useRef<boolean>(false);
    const [benefitCode, setBenefitCode] = useState<string>("");
    const benefitToShare:ConfiguredBenefit = useAppSelector(state => state.shareBenefit);
    const [urlWA, setUrlWA] = useState<string>("");
    const {data:session, status} = useSession();
    const user = useAppSelector(state => state.auth.user);
    
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
        if(nameValueIsValid && lastNameValueIsValid && cellPhoneValueIsValid && benefitToShare.benefit._id !== '' ){
            
            return true;
        }
        return false;
    },[nameValueIsValid, lastNameValueIsValid, cellPhoneValueIsValid, benefitToShare.benefit._id]);

    const dynamicShareButtonClass = isOkToShareButtonAvailable() ? "shareButtonContainer_visible" : "shareButtonContainer_notVisible" ;
    
    const transformCellPhoneNumber = (number:string) =>{
        const formatedNumber = '+595' + number.slice(1);
        // console.log("formatedNumber:", formatedNumber);
        return formatedNumber;
    }

    useEffect(
        () =>{
            // console.log("benefitToShare is:", benefitToShare);
            if(benefitToShare && Object.keys(benefitToShare).length === 0 && sigla !== ""){
                // console.log("Before routing");
                router.push(`/${sigla}/mainClient`);
            }
        },[benefitToShare, sigla, router]
    )

    useEffect(
        () =>{
            if(benefitCode.length > 0 && codeGenerated.current){
                const formatedCellPhone = transformCellPhoneNumber(cellPhone);
                setUrlWA(`https://wa.me/${formatedCellPhone}?text=https://www.loyaltyapp.com.py/${sigla}/benefit/${benefitCode}/`);
            }
        },[benefitCode, codeGenerated, cellPhone, sigla]
    )

    useEffect(
        () =>{
            const callGenerateCode = async () =>{
                    setGeneratingCode(true);
                    const {error, data, result} = await getBenefitCode(sigla, benefitToShare.benefit._id, name, lastName, cellPhone);
                    setGeneratingCode(false);
                    if(!result.ok){
                        // console.log("Ocurrio un error:", error);
                        dispatch(uiActions.showNotification({show:true, 
                            message:`Ocurrió un error al generar el código:${error.message}`, color:"red"}))
                    }else{
                        setBenefitCode(data.code);
                        codeGenerated.current = true;
                    }
                    
                }
            
            
            try{
                // console.log("Before generate code", isOkToShareButtonAvailable());
                if(isOkToShareButtonAvailable()){
                    console.log("Code will be generated");
                    callGenerateCode();
                    
                }else{
                    setBenefitCode("");
                }
            }catch(error){
                dispatch(uiActions.showNotification({show:true, 
                        message:`Ocurrió un error al generar el código:${error}`, color:"red"}))
            }
            
        },[sigla, benefitToShare.benefit._id, name, lastName, cellPhone, dispatch, isOkToShareButtonAvailable]
    )

    const generateBenefit = async () =>{
        //Almacenar los datos del beneficiario (nombre, apellido, celular, código del beneficio, código de la Campaña)
        // console.log("Before send data");
        if(leadSaved.current === false){
            const httpProps:HttpProps = {
                operation:'post',
                url:`/api/v1/university/${sigla}/campaign_lead`,
                data:{
                    source_user:user.id,
                    name,
                    lastName,
                    cellPhone,
                    benefitCode,
                    campaign_id:benefitToShare.campaign_id,
                    sigla
                    
                }
            };
            dispatch(uiActions.setLoading({loading:true}));
            const {data, error, result} = await httpOperations(httpProps);
            dispatch(uiActions.setLoading({loading:false}));
            if(!result.ok){
                leadSaved.current = false;
                dispatch(uiActions.showNotification({message:`Ocurrio un error en la operación:${error.message}`, show:true, color:"red"}));
            }else{
                // dispatch(uiActions.showNotification({message:`Operación exitosa`, show:true, color:"green"}))
                leadSaved.current = true;
                shareBenefitViaWA();
            }
        }else{
            shareBenefitViaWA();
        }
    
    }

    const shareBenefitViaWA = () =>{
        // window.open(urlWA);
        waLink.current?.click();
    }
    if(loading === true || !benefitToShare.benefit._id || status === 'loading'){
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }

    if(status === 'unauthenticated'){
        router.push(`/${sigla}`);
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }
    
    if(status === 'authenticated'){
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
                        <h6 className={classes.benefitDescription}>{benefitToShare.benefit.description}</h6>
                        <hr />
                        
                            {benefitCode !== "" && <p className={classes.benefitText}>{'El código de este Beneficio Exclusivo es:'}</p>}
                            {benefitCode !== "" && <p className={classes.benefitText}>{benefitCode}</p>}
                        {generatingCode && <div className={spinnerClasses.spin}></div>}
                        {!generatingCode &&    
                            <div className={classes[`${dynamicShareButtonClass}`]}>
                                <Button label="OK Compartir" isAvailable={true} onClickHandler={generateBenefit} 
                                    
                                    additionalStyle={{backgroundColor:colors.secondaryLight,
                                    color:"var(--loyalty-backGround-color)", width:"100%",
                                    margin:"16px 0px 32px 0px"}}
                                />
                            </div>
                        }
                        {/* <div className={classes[`${dynamicShareButtonClass}`]} style={{backgroundColor:colors.secondaryLight, color:"var(--loyalty-backGround-color)"}}> */}
                            
                            <a className={classes.shareLink} ref={waLink}  target={"_blank"} href={urlWA} rel="noreferrer" >
                                Ok Compartir!
                            </a>
                            
                        {/* </div> */}
                        
                    </BasicCard>
                    
                </div>
            )
        }else{
            return(
                <div className={spinnerClasses.spin}></div>
            )
        }
    
}

export default ShareBenefitComp;


