import { GetServerSideProps, GetStaticProps } from "next";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import API404Error from "../../common/DataBase/Api404Error";
import BenefitsPortal from "../../modules/universityPortal/BenefitsPortal";
import CachedUniversityLayout from "../../common/Layout/CacheUniversityLayout";
import Contacto from "../../modules/universityPortal/Contacto";
import HowItWorks from "../../modules/universityPortal/HowItWorks";
import ImageModel from "../../common/models/ImageModel";
import PageWithLayoutType from "../../types/PageWithLayout";
import UniversityPortal from "../../modules/universityPortal/UniversityPortal";
import UniversityPortalHeadingInfo from "../../common/models/universityPortalHeadingInfo";
import { authActions } from "../../store/auth-slice";
import { benefitsList } from "../../common/models/testing_data";
import classes from '../../styles/portal.module.css';
import { connect } from "../../common/DataBase/Connect";
import { parse } from "path";
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

export interface UniversityPortalProps{
    logo:ImageModel;
    logoWidth:string;
    loginColor:string;
    favicon:string;
    primary_color:string;
    secondary_color:string;
    secondaryLight_color:string;
    selectedTabColor:string;
    headerBackgroundColor:string;
    title:string;
    backGroundImage:ImageModel;
    backGroundImage_large:ImageModel;
    buttonText:string;
    forText:string;
    forTextColor:string;
    links:Array<string>;
    loading:boolean;
    children:ReactNode;
    contact_email:string;
    contact_phone:string;
    contact_whatsapp:string;
    headInfo:UniversityPortalHeadingInfo;
    
    

}
const UniversityHome = ({loading=true, ...props}:UniversityPortalProps) =>{
    const router = useRouter();
    const {universitySigla:sigla} = router.query;
    const dispatch = useAppDispatch();
    const globalLoading = useAppSelector(state => state.ui.loading);
    const {data:session, status} = useSession();
    
    // console.log("UniversityHome props:", props);
    
    
    useEffect(
        () =>{
            if(globalLoading){
                dispatch(uiActions.setLoading({loading:false}));
            }
        },[]
    )

    
    useEffect(
        () =>{
                dispatch(authActions.setUniversity({logo:props.logo, sigla:sigla, favicon:props.favicon}));
                dispatch(uiActions.setColors({primary:props.primary_color, 
                    secondary:props.secondary_color,
                    secondaryLight:props.secondaryLight_color, selectedTabColor:props.selectedTabColor}));
                dispatch(uiActions.setHead({title:props.title, description:props.forText}));
            
        },[]
    )

    useEffect(
        () =>{
            
            if(status === "authenticated" && sigla !== ""){
                router.push(`/${sigla}/mainClient`);
            }
        },[status, sigla, router]
    )

    if(status === 'authenticated'){
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }
    
    if(Object.entries(props).length > 0){
        return(
            <div className={classes.wrapper}>
                <UniversityPortal
                    topLinks={props.links} 
                    title={props.title} 
                    backgroundImage={props.backGroundImage}
                    backgroundImage_large={props?.backGroundImage_large}
                    forText={props.forText}
                    forTextColor={props.forTextColor}
                    primaryColor={props.primary_color}
                    buttonText={props.buttonText}/>
                <HowItWorks primaryColor={props.primary_color} secondaryColor={props.secondaryLight_color} />
                <BenefitsPortal awardList={benefitsList} secondaryColor={props.secondaryLight_color} />
                <Contacto email={props.contact_email} 
                phone={props.contact_phone}
                whatsapp={props.contact_whatsapp} 
                secondaryColor={props.secondaryLight_color}
                primaryColor={props.primary_color}/>
                
            </div>
        )
    }else{
        return(
            <p>Pagina no encontrada</p>
        )
    }
    
    
}

(UniversityHome as PageWithLayoutType).layout = CachedUniversityLayout;




export default UniversityHome;

export const getServerSideProps:GetServerSideProps = async (context) =>{
    try{
        const {universitySigla} = context.query;
        const db = await connect();
        
        const university_collection = db.collection("university");
        const university = await university_collection.findOne({sigla:universitySigla});
        
        if(university === null){
            throw new API404Error('No existe esta Universidad.');
        }
        const portalData = {
                        logo:university.logo, 
                        logoWidth:university.configuration.logoWidth,
                        loginColor:university.configuration.loginColor,
                        favicon:university.portal.head_information.favicon,
                        primary_color:university.configuration.primaryColor,
                        secondary_color:university.configuration.secondaryColor,
                        secondaryLight_color:university.configuration.secondaryLightColor,
                        selectedTabColor:university.configuration.selectedTabColor,
                        headerBackgroundColor:university.configuration.headerBackgroundColor,
                        title:university.portal.title,
                        backGroundImage:university.portal.backgroundImage,
                        backGroundImage_large:university.portal.backgroundImage_large,
                        buttonText:university.portal.buttonText,
                        forText:university.portal.forText,
                        forTextColor:university.portal.forTextColor,
                        links:university.portal.links,
                        contact_email:university.portal.contact_email,
                        contact_phone:university.portal.contact_phone,
                        contact_whatsapp:university.portal.contact_whatsapp,
                        headInfo:{
                            title:university.portal.head_information.title,
                            description:university.portal.head_information.description,
                            favicon:university.portal.head_information.favicon,
                            social_image:university.portal.head_information.social_image,
                            url:university.portal.head_information.url
                        }
            
                    }
                    
                    return{
            
                        props:{
                            ...portalData,
                        }
                            
                    }
                
    }catch(error){
        return{
            props:{}
        }
    }
}
