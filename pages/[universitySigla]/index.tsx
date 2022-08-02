import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import BenefitsPortal from "../../modules/universityPortal/BenefitsPortal";
import CachedUniversityLayout from "../../common/Layout/CacheUniversityLayout";
import { GetServerSideProps } from "next";
import HowItWorks from "../../modules/universityPortal/HowItWorks";
import ImageModel from "../../common/models/ImageModel";
import PageWithLayoutType from "../../types/PageWithLayout";
import UniversityPortal from "../../modules/universityPortal/UniversityPortal";
import { authActions } from "../../store/auth-slice";
import { benefitsList } from "../../common/models/testing_data";
import {signOut} from 'next-auth/react';
import spinnerClass from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import { useRouter } from "next/router";

export interface UniversityPortalProps{
    logo:ImageModel;
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
    children:ReactNode
    
    

}
const UniversityHome = ({loading=true, ...props}:UniversityPortalProps) =>{
    const router = useRouter();
    const {universitySigla:sigla} = router.query;
    const dispatch = useAppDispatch();
    const logOut = useAppSelector(state => state.auth.logOut);
    const [loadingState, setLoadingState] = useState(loading);
    
    useEffect(
        () =>{
            if(logOut){
                setLoadingState(true);
                signOut();
                dispatch(authActions.setLogout(false));
            }else{
                setLoadingState(false);
            }
        }
    )
    
    useEffect(
        () =>{
            dispatch(authActions.setUniversity({logo:props.logo, sigla:sigla}));
            dispatch(uiActions.setColors({primary:props.primary_color, 
                secondary:props.secondary_color,
                secondaryLight:props.secondaryLight_color}));
            dispatch(uiActions.setHead({title:props.title, description:props.forText}));
        },[]
    )
    if(loadingState){
        return(
            <div className={spinnerClass.spin}></div>
        )
    }
    return(
        <>
            <UniversityPortal 
                topLinks={props.links} 
                title={props.title} 
                backgroundImage={props.backGroundImage}
                backgroundImage_large={props.backGroundImage_large}
                forText={props.forText}
                primaryColor={props.primary_color}
                buttonText={props.buttonText}/>
            <HowItWorks primaryColor={props.primary_color} />
            <BenefitsPortal benefitList={benefitsList} />
            
        </>
    )
    
    
}

(UniversityHome as PageWithLayoutType).layout = CachedUniversityLayout;




export default UniversityHome;

export  const getServerSideProps:GetServerSideProps = async (context) =>{
    const {universitySigla} = context.query;
    const url = new URL(`http://localhost:3000/api/v1/university/${universitySigla}/portal`);
    const result = await fetch(url.href);
    const data = await result.json();
    console.log("data:", data);
    return{
        props:{
            ...data,
            loading:false
        }
    }
        
}