import { GetServerSideProps, GetStaticProps } from "next";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

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
import {signOut} from 'next-auth/react';
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

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
    headInfo:UniversityPortalHeadingInfo;
    
    

}
const UniversityHome = ({loading=true, ...props}:UniversityPortalProps) =>{
    const router = useRouter();
    const {universitySigla:sigla} = router.query;
    const dispatch = useAppDispatch();
    const globalLoading = useAppSelector(state => state.ui.loading);
    const {data:session, status} = useSession();
    console.log("UniversityHome props:", props);
    
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
                    secondaryLight:props.secondaryLight_color}));
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

export async function getStaticPaths(){
    const db = await connect();
    const university_collection = db.collection("university");
    const projection = {sigla:1};
    const university_list_cursor = university_collection.find().project(projection);
    const universities = await university_list_cursor.toArray();
   
    let paths:Array<{}> = [];
    universities.map(
        (university) => {
            
                    
                    paths.push({params:{universitySigla:university.sigla}});
                   
        })
           
            
            
    
      console.log("paths:", JSON.stringify(paths));
    
    
    return{
        paths:paths,
        fallback:false
    }

    
}

export const getStaticProps:GetStaticProps = async(context) => {
    //console.log("context:", context);
    const db = await connect();
    const university_collection = db.collection("university");
    const sigla = context?.params?.universitySigla;
    const result = await university_collection.findOne({sigla:sigla});
    if(result !== null){
        const portalData = {
            logo:result.logo, 
            favicon:result.portal.head_information.favicon,
            primary_color:result.configuration.primaryColor,
            secondary_color:result.configuration.secondaryColor,
            secondaryLight_color:result.configuration.secondaryLightColor,
            title:result.portal.title,
            backGroundImage:result.portal.backgroundImage,
            backGroundImage_large:result.portal.backgroundImage_large,
            buttonText:result.portal.buttonText,
            forText:result.portal.forText,
            links:result.portal.links,
            contact_email:result.portal.contact_email,
            contact_phone:result.portal.contact_phone,
            contact_whatsapp:result.portal.contact_whatsapp,
            headInfo:{
                title:result.portal.head_information.title,
                description:result.portal.head_information.description,
                favicon:result.portal.head_information.favicon,
                social_image:result.portal.head_information.social_image,
                url:result.portal.head_information.url
            }

        }
        return{

            props:{
                ...portalData,
            },
            revalidate: 10,
                
        }
    }else{
        return {
            props:{}
        }
    }
}

// export  const getServerSideProps:GetServerSideProps = async (context) =>{
    
//     const {universitySigla} = context.query;
//     const url = new URL(`${process.env.API_HOST}/api/v1/university/${universitySigla}/portal`);
//     const result = await fetch(url.href);
//     const data = await result.json();
    
//     return{
//         props:{
//             ...data,
//             loading:false
//         }
//     }
        
// }