import { GetServerSideProps, GetStaticProps } from "next";

import API404Error from "../../../common/DataBase/Api404Error";
import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";
import RegisterComp from "../../../modules/auth/RegisterComp";
import UniversityPortalHeadingInfo from "../../../common/models/universityPortalHeadingInfo";
import { connect } from "../../../common/DataBase/Connect";
import { useAppSelector } from "../../../hooks/store-hooks";

export interface RegisterProps{
    children:ReactNode;
    headInfo:UniversityPortalHeadingInfo;
    onPrimaryTextColor:string;
}
const Register = (props:RegisterProps) =>{
    const colors = useAppSelector(state => state.ui.color)
    
    return(
         <RegisterComp primary_color={colors.primary} onPrimaryTextColor={props.onPrimaryTextColor} />
       
    )
}

(Register as PageWithLayoutType).layout = CachedUniversityLayout
export default Register;

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
            const registerData = {
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
                    ...registerData
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