import { GetServerSideProps, GetStaticProps } from "next";

import API404Error from "../../../common/DataBase/Api404Error";
import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import LoginComp from "../../../modules/auth/LoginComp";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";
import UniversityPortalHeadingInfo from "../../../common/models/universityPortalHeadingInfo";
import { connect } from "../../../common/DataBase/Connect";

export interface LoginProps{
    children:ReactNode;
    headInfo:UniversityPortalHeadingInfo;
    headerBackgroundColor:string;
    logoWidth:string;
    loginColor:string;
    onPrimaryTextColor:string;
    onSecondaryTextColor:string;
}
const Login = (props:LoginProps) =>{
    return(
        <LoginComp onPrimaryTextColor={props.onPrimaryTextColor} 
            onSecondaryTextColor={props.onSecondaryTextColor}/>
    )
}

(Login as PageWithLayoutType).layout = CachedUniversityLayout
export default Login;

export const getServerSideProps:GetServerSideProps = async (context) =>{
    try{
        const {universitySigla} = context.query;
        const db = await connect();
        
        const university_collection = db.collection("university");
        const university = await university_collection.findOne({sigla:universitySigla},{projection:{portal:1, configuration:1}});
        
        
        if(university === null){
            throw new API404Error('No existe esta Universidad.');
        }
        if(university !== null){
            const loginData = {
                headInfo:{
                    title:university.portal.head_information.title,
                    description:university.portal.head_information.description,
                    favicon:university.portal.head_information.favicon,
                    social_image:university.portal.head_information.social_image,
                    url:university.portal.head_information.url
                },
                headerBackgroundColor:university.configuration.headerBackgroundColor,
                logoWidth:university.configuration.logoWidth,
                loginColor:university.configuration.loginColor,
                onPrimaryTextColor:university.configuration.onPrimaryTextColor,
                onSecondaryTextColor:university.configuration.onSecondaryTextColor,


    
            }
            return{
                props:{
                    ...loginData
                },
                
            }
        }else{
            return {
                props:{}
            }
        }
    }catch(error){
        return{
            props:{}
        }
    }
}