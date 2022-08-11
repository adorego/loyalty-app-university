import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import BenefitsPortal from "../../modules/universityPortal/BenefitsPortal";
import CachedUniversityLayout from "../../common/Layout/CacheUniversityLayout";
import Contacto from "../../modules/universityPortal/Contacto";
import { GetServerSideProps } from "next";
import HowItWorks from "../../modules/universityPortal/HowItWorks";
import ImageModel from "../../common/models/ImageModel";
import PageWithLayoutType from "../../types/PageWithLayout";
import UniversityPortal from "../../modules/universityPortal/UniversityPortal";
import { authActions } from "../../store/auth-slice";
import { benefitsList } from "../../common/models/testing_data";
import classes from '../../styles/portal.module.css';
import {signOut} from 'next-auth/react';
import spinnerClass from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import { useRouter } from "next/router";

export interface UniversityPortalProps{
    logo:ImageModel;
    favicon:string;
    primary_color:string;
    secondary_color:string;
    secondaryLight_color:string;
    title:string;
    backGroundImage:ImageModel;
    backGroundImage_large:ImageModel;
    buttonText:string;
    forText:string;
    links:Array<string>;
    loading:boolean;
    children:ReactNode;
    contact_email:string;
    contact_phone:string;
    contact_whatsapp:string;
    
    

}
const UniversityHome = ({loading=true, ...props}:UniversityPortalProps) =>{
    const router = useRouter();
    const {universitySigla:sigla} = router.query;
    const dispatch = useAppDispatch();
    const globalLoading = useAppSelector(state => state.ui.loading);
    const logOut = useAppSelector(state => state.auth.logOut);
    
    
    useEffect(
        () =>{
            if(globalLoading){
                dispatch(uiActions.setLoading({loading:false}));
            }
        },[]
    )
    useEffect(
        () =>{
            if(logOut){
                signOut();
                dispatch(authActions.setLogout({logout:false}));
                dispatch(uiActions.setLoading({loading:false}));
            }else{
                
            }
        }, [logOut, dispatch]
    )
    
    useEffect(
        () =>{
            dispatch(authActions.setUniversity({logo:props.logo, sigla:sigla, favicon:props.favicon}));
            dispatch(uiActions.setColors({primary:props.primary_color, 
                secondary:props.secondary_color,
                secondaryLight:props.secondaryLight_color}));
            dispatch(uiActions.setHead({title:props.title, description:props.forText}));
        },[]
    )
    
    return(
        <div className={classes.wrapper}>
            <UniversityPortal
                topLinks={props.links} 
                title={props.title} 
                backgroundImage={props.backGroundImage}
                backgroundImage_large={props.backGroundImage_large}
                forText={props.forText}
                primaryColor={props.primary_color}
                buttonText={props.buttonText}/>
            <HowItWorks primaryColor={props.primary_color} secondaryColor={props.secondaryLight_color} />
            <BenefitsPortal awardList={benefitsList} secondaryColor={props.secondaryLight_color} />
            <Contacto email={props.contact_email} 
            phone={props.contact_phone}
            whatsapp={props.contact_whatsapp} 
            secondaryColor={props.secondaryLight_color}/>
            
        </div>
    )
    
    
}

(UniversityHome as PageWithLayoutType).layout = CachedUniversityLayout;




export default UniversityHome;

export  const getServerSideProps:GetServerSideProps = async (context) =>{
    
    const {universitySigla} = context.query;
    const url = new URL(`${process.env.API_HOST}/api/v1/university/${universitySigla}/portal`);
    const result = await fetch(url.href);
    const data = await result.json();
    
    return{
        props:{
            ...data,
            loading:false
        }
    }
        
}