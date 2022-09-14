import API401Error from "../../../common/DataBase/Api401Error"
import API404Error from "../../../common/DataBase/Api404Error"
import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout"
import { GetServerSideProps } from "next"
import PageWithLayoutType from "../../../types/PageWithLayout"
import { ReactNode } from "react"
import ShareBenefitComp from "../../../modules/benefit/ShareBenefitComp"
import UniversityPortalHeadingInfo from "../../../common/models/universityPortalHeadingInfo"
import { authOptions } from "../../api/auth/[...nextauth]"
import { connect } from "../../../common/DataBase/Connect"
import { unstable_getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export interface ShareBenefitProps{
    children:ReactNode;
    headInfo:UniversityPortalHeadingInfo;
    headerBackgroundColor:string;
    logoWidth:string;
    loginColor:string;
}
const ShareBenefit = (props:ShareBenefitProps) =>{
    const {data:session, status} = useSession();

    console.log("session:", session, "status:", status);
    return(
        <ShareBenefitComp />
    )

}

(ShareBenefit as PageWithLayoutType).layout = CachedUniversityLayout

export default ShareBenefit;



export  const getServerSideProps:GetServerSideProps = async (context) =>{
    try{
    //console.log("context:", context);
        const {universitySigla} = context.query;
        console.log("universitySigla:", universitySigla);
        const session = await unstable_getServerSession(context.req, context.res, authOptions);
        console.log("session:", session);
        if(session === null){
            throw new API401Error('Usuario no autorizado');
        }
        const db = await connect();
        
        const university_collection = db.collection("university");
        const university = await university_collection.findOne({sigla:universitySigla},{projection:{portal:1, configuration:1}});
        console.log("university:", university);
        if(university === null){
            throw new API404Error('No existe esta Universidad.');
        }
        if(university !== null){
        const shareData = {
            headInfo:{
                title:university.portal.head_information.title,
                description:university.portal.head_information.description,
                favicon:university.portal.head_information.favicon,
                social_image:university.portal.head_information.social_image,
                url:university.portal.head_information.url
            },
            headerBackgroundColor:university.configuration.headerBackgroundColor,
            logoWidth:university.configuration.logoWidth,
            loginColor:university.configuration.loginColor

        }
        return{
            props:JSON.parse(JSON.stringify(shareData))
            
        }
        }else{
            return{
                props:{}
            }
        }
    
    }catch(error){
        console.log("Ocurrio un error", error);
        return{
            props:{}
        }
    }
}