import { DefaultSession, unstable_getServerSession } from "next-auth";

import API401Error from "../../../common/DataBase/Api401Error";
import API404Error from "../../../common/DataBase/Api404Error";
import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import CampaignModel from "../../../common/models/campaignModel";
import { ConfiguredAward } from "../../../common/models/configuredAward";
import { ConfiguredBenefit } from "../../../common/models/configuredBenefit";
import { GetServerSideProps } from "next/types";
import MainComp from "../../../modules/mainClient/MainComp";
import PageWithLayoutType from "../../../types/PageWithLayout";
import UniversityPortalHeadingInfo from "../../../common/models/universityPortalHeadingInfo";
import { authOptions } from "../../api/auth/[...nextauth]";
import { connect } from "../../../common/DataBase/Connect";
import spinnerClass from '../../../styles/spinner.module.css';
import { useAppSelector } from "../../../hooks/store-hooks";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

export interface MainProps{
    points:string;
    configuredAwards:Array<ConfiguredAward>;
    benefitsToShare:Array<ConfiguredBenefit>;
    headInfo:UniversityPortalHeadingInfo;
}
const Main = (props:MainProps) =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);

    // console.log("props:", props);
    if(status === 'authenticated'){
        if(Object.values(props).length > 0){
            return(
                <MainComp points={props.points} configuredAwards={props.configuredAwards} 
                benefitsToShare={props.benefitsToShare} />
            )
        }else{
            console.log("No se enviaron props");
            
        }
    }
    if(status === "unauthenticated"){
        router.push(`/${sigla}/`)
    }

    if(status === 'loading'){
        <div className={spinnerClass.spin}></div>
    }
}
(Main as PageWithLayoutType).layout = CachedUniversityLayout
export default Main;


export  const getServerSideProps:GetServerSideProps = async (context) =>{
    try{
        const {universitySigla} = context.query;
        const session = await unstable_getServerSession(context.req, context.res, authOptions);
        if(session === null){
            throw new API401Error('Usuario no autorizado');
        }
        const db = await connect();
        
        const university_collection = db.collection("university");
        const university = await university_collection.findOne({sigla:universitySigla, "users.email":session.user?.email});
        if(university === null){
            throw new API404Error('No existe esta Universidad.');
        }
        const user = university.users.find(
            (user:any) =>{
                return user.email === session.user?.email
            }
        );
        
        
        
        const valid_campaigns = university?.campaigns.filter(
            (item:any) =>{
                return new Date(item.initial_date).getTime() <= Date.now() && new Date(item.end_date).getTime() >= Date.now()
            }
        )
        // console.log("Valid Campaigns:", valid_campaigns);
        type BenefitCampaign = {
            benefit:string,
            campaign_id:string
        }
        const benefitsIdsToShare:Array<BenefitCampaign> = valid_campaigns.map(
            (campaign:CampaignModel) =>{
               return{
                    benefit:campaign.benefit.toString(),
                    campaign_id:campaign._id.toString()
               } 
            }
                
                
            
        )
        // console.log("benefitsIdsToShare:", benefitsIdsToShare);
        
        const benefitsToShare = benefitsIdsToShare.map(
            (benefitCampaign:BenefitCampaign) =>{
                const benefitItem = university?.benefits.find(
                    (item:any) =>{
                        return item.benefit._id.toString() === benefitCampaign.benefit
                    }
                )
                return{
                    benefit:benefitItem.benefit,
                    campaign_id:benefitCampaign.campaign_id,
                    granting:benefitItem.granting
                }
            }
        )

        // console.log("benefitToShare:", benefitsToShare);
        
        const headInfo = {
                title:university.portal.head_information.title,
                description:university.portal.head_information.description,
                favicon:university.portal.head_information.favicon,
                social_image:university.portal.head_information.social_image,
                url:university.portal.head_information.url
        }
        return{
            props:{
                points:JSON.parse(JSON.stringify(user.points)),
                configuredAwards:JSON.parse(JSON.stringify(university.awards)),
                benefitsToShare:JSON.parse(JSON.stringify(benefitsToShare)),
                headInfo:JSON.parse(JSON.stringify(headInfo))
                
              }
         }
        // return {
        //     props:{...getDummyData()}
        // }

    }catch(error){
        // errorNextHandler(error, context.res);
        console.log("Ocurrio un error");
        return{
            props:{}
        }
    }
    
}    
    
        
    

    
     
        


// const getMainClientData = async (session:DefaultSession, sigla:string, res:ServerResponse) =>{
//     try{
//         const db = await connect();
//         const university_collection = db.collection("university");
//         const university = await university_collection.findOne({sigla:sigla, "users.email":session.user?.email});
//         const user = university?.users.find(
//             (user:any) =>{
//                 return user.email === session.user?.email
//             }
//         );
        
//         if(university === null){
//             throw new API404Error("No se encontraron los datos de la petición");
//         }
//         const valid_campaigns = university?.campaigns.filter(
//             (item:any) =>{
//                 return item.initial_date <= Date.now() && item.end_date >= Date.now()
//             }
//         )
        

//         const benefitsIdsToShare = valid_campaigns.map(
//             (campaign:any) => campaign.benefit.toString()
//         )

//         const uniqueBenefitIds = [...new Set<string>(benefitsIdsToShare)];

//         const benefitsToShare = uniqueBenefitIds.map(
//             (benefitId) =>{
//                 return university?.benefits.find(
//                     (benefit:any) =>{
//                         return benefit._id.toString() === benefitId;
//                     }
//                 )
//             }
//         )

        
        
//         return{
//             points:user.points,
//             configuredAwards:university?.awards,
//             benefitsToShare

//         }
//     }catch(error){
//         errorNextHandler(error, res);
//     }
   
    

// }

const getDummyData = () =>{
    const data = {
        points:"100",
        configuredAwards:[
            {
                award:{
                    _id:"8989878",
                    imageType:"image",
                    image:{
                        src:"/images/ucom/mochila.jpeg",
                        width:"1000",
                        height:"1000"},
                    icon:null,
                    title:"Mochila deportiva",
                    description:"Hermosa mochila de la marca Chenson, resistente y hermosa"
                },
                requiredPoints:"500",
                detailedValue:null
            },
            {
                award:{
                    _id:"26767689",
                    image:null,
                    imageType:"icon",
                    icon:"money",
                    title:"Dinero en Efectivo",
                    description:"Premios en efectivo desde 500.000 Gs"
                },
                requiredPoints:"1000",
                detailedValue:"500.000Gs"
            }
        ],
        benefitsToShare:[
            {
                benefit:{
                _id:"98989898",
                title:"Descuento en tu matricula",
                description:"-500.000Gs en tu matriculación a Diplomado UCOM",
                image:{
                    src:"/images/ucom/student1.png",
                    width:"700",
                    height:"500"
                    }
                },
                campaign_id:"7878787878",
                granting:[{
                    points_to_grant:"600",
                    business_event:"REGISTRATION"
                }]
            
            },
            {
                benefit:{
                _id:"98989878",
                title:"Descuento en tu matricula a Diplomado",
                description:"-1.000.000Gs en tu matriculación al Diplomado de Inteligencia Empresarial y Automatización de Procesos ",
                image:{
                    src:"/images/ucom/student1.png",
                    width:"700",
                    height:"500"
                    }
                },
                campaign_id:"7878787879",
                granting:[{
                    points_to_grant:"800",
                    business_event:"REGISTRATION"
                }]
            }
        ]
    }
    return data;

}


    