import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import { GetStaticProps } from "next";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";
import RegisterComp from "../../../modules/auth/RegisterComp";
import UniversityPortalHeadingInfo from "../../../common/models/universityPortalHeadingInfo";
import { connect } from "../../../common/DataBase/Connect";
import { useAppSelector } from "../../../hooks/store-hooks";

export interface RegisterProps{
    children:ReactNode;
    headInfo:UniversityPortalHeadingInfo;
}
const Register = (props:RegisterProps) =>{
    const colors = useAppSelector(state => state.ui.color)
    
    return(
         <RegisterComp primary_color={colors.primary} />
       
    )
}

(Register as PageWithLayoutType).layout = CachedUniversityLayout
export default Register;

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
           
            
            
    
    //  console.log("paths:", JSON.stringify(paths));
    
    
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
    const result = await university_collection.findOne({sigla:sigla},{projection:{portal:1}});
    if(result !== null){
        const registerData = {
            headInfo:{
                title:result.portal.head_information.title,
                description:result.portal.head_information.description,
                favicon:result.portal.head_information.favicon,
                social_image:result.portal.head_information.social_image,
                url:result.portal.head_information.url
            }

        }
        return{
            props:JSON.parse(JSON.stringify(registerData))
        }
    }else{
        return {
            props:{}
        }
    }
}