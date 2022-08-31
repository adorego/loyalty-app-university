import {useEffect, useState} from "react";

import BenefitLayout from "../../../../common/Layout/BenefitLayout";
import BenefitPortal from "../../../../modules/benefit/BenefitPortal";
import BenefitPortalHeadInfo from "../../../../common/models/benefitPortalHeadInfo";
import BenefitPortalHeadProps from "../../../../common/models/benefitPortalHeadProps";
import BenefitPortalModel from "../../../../common/models/benefitPortalModel";
import CampaignModel from "../../../../common/models/campaignModel";
import ErrorApp from "../../../../common/helpers/ErrorApp";
import { GetStaticProps } from "next/types";
import PageWithLayoutType from "../../../../types/PageWithLayout";
import { connect } from "../../../../common/DataBase/Connect";
import spinnerClasses from '../../../../styles/spinner.module.css';

export interface BenefitPageProps{
    error:ErrorApp;
    headInfo:BenefitPortalHeadProps;
    mainData:BenefitPortalModel;
    colors:{primaryColor:string, secondaryColor:string, secondaryLightColor:string}
    
}
const BenefitPage = (props:BenefitPageProps) =>{
    const [loading, setLoading] = useState(true);

    console.log("props:", props, "loading:", loading);
    if(!props.error.hasError){
        return(
            <BenefitPortal mainData={props.mainData} secondaryLightColor={props.colors.secondaryLightColor} />
        )
    }else{
        <h2>{props.error.description}</h2>
    }
}

(BenefitPage as PageWithLayoutType).layout = BenefitLayout;
export default BenefitPage;

export async function getStaticPaths(){
    const db = await connect();
    const university_collection = db.collection("university");
    const projection = {campaign_leads:1, sigla:1};
    const university_list_cursor = university_collection.find().project(projection);
    const universities = await university_list_cursor.toArray();
   
    let paths:Array<{}> = [];
    universities.map(
        (university) => {
            university.campaign_leads.map(
                (lead:any) =>{
                    
                    paths.push({params:{universitySigla:university.sigla, benefitCode:lead.benefit_code}});
                   
                }
            )
           
            
            
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
    const benefitCode_match = await university_collection.findOne({sigla:sigla, 
        "campaign_leads.benefit_code":context?.params?.benefitCode},
        {projection:{"campaign_leads":1, campaigns:1, benefits:1, configuration:1}});
    
    const campaign_lead = benefitCode_match?.campaign_leads.filter(
        (item:any) => item.benefit_code === context?.params?.benefitCode);
    // console.log("campaign_lead:", campaign_lead);  
    const campaign = benefitCode_match?.campaigns.filter(
        (item:any) =>{
            
            return item._id.toString() === campaign_lead[0].campaign_id.toString()
        } 
    );
    // console.log("campaign:", campaign);
    
    const benefit = campaign ?  benefitCode_match?.benefits.filter(
         (item:any) => item.benefit._id.toString() === campaign[0].benefit.toString()
     ) : "";
    // console.log("benefit:", benefit);
    
    const error:ErrorApp = checkCampaignValidity(campaign[0]);
    // console.log("error:", error);
    let portalHead = {} as BenefitPortalHeadProps;
    if(!error.hasError){
        portalHead = createHeadBenefitPortal({name:campaign_lead[0].name, sigla,
            lastName:campaign_lead[0].lastName, favicon:campaign_lead[0]?.head_information.favicon, 
            benefit:benefit[0].benefit, benefitCode:campaign_lead[0].benefit_code  ,...campaign_lead[0].head_information});
        const mainDataBenefitPortal:BenefitPortalModel = {
            title:portalHead.title,
            description:portalHead.description,
            benefitCode:`Código ${campaign_lead[0].benefit_code}`,
            validity:`Beneficio válido hasta el ${campaign_lead[0].validity_date.toLocaleDateString()}`,
            benefit:benefit
        }
        const benefitPortalData = {
                error,
                headInfo:portalHead,
                mainData:mainDataBenefitPortal,
                colors:benefitCode_match?.configuration
        }
        // console.log("benefitData:", benefitPortalData);
        return{
            props:JSON.parse(JSON.stringify(benefitPortalData))
        }
    
    }
    
    // console.log("campaign_data:", campaign_lead);
    // const benefitData = JSON.parse(JSON.stringify(campaign_lead));
    // console.log("benefitData:", benefitData);

    return {
        props:{}
    }
    // return{
    //     props: {
    //         headInfo:{
    //             title:"Beneficio exclusivo para Soledad Gonzalez", 
    //             description:"Con este beneficio tenés 500.000Gs de descuento en cualquier diplomado UCOM",
    //             favicon:"/images/ucom/favicon.png",
    //             social_image:{
    //                 src:"https://loyaltyapp.com.py/images/ucom/social_ucom.png",
    //                 width:"1200",
    //                 height:"600"
    //             },
    //             url:"https://loyaltyapp.com.py/ucom/beneficio/787878UCSG"
    //         }
    //     }
    // }

}

const checkCampaignValidity = (campaign:CampaignModel):ErrorApp  => {
    
    if(campaign.end_date.getTime() < new Date().getTime()){
        return {
            hasError:true,
            description:"Este beneficio personal ha caducado, lo sentimos"
        }
    }else{
        return{
            hasError:false,
            description:""
        }
    }
}

const createHeadBenefitPortal = (benefitPortalHeadInfo:BenefitPortalHeadInfo):BenefitPortalHeadProps =>{
    console.log("benefitPortalHeadInfo:", benefitPortalHeadInfo);
    let title = benefitPortalHeadInfo.title.replace(/\$name/, benefitPortalHeadInfo.name);
    title = title.replace(/\$lastName/, benefitPortalHeadInfo.lastName);
    const description = benefitPortalHeadInfo.benefit.description;
    let url = benefitPortalHeadInfo.url.replace(/\$oferNumber/, benefitPortalHeadInfo.benefitCode);
    url = url.replace(/\$sigla/, benefitPortalHeadInfo.sigla)
    return{
        title,
        description,
        favicon:benefitPortalHeadInfo.favicon,
        social_image:{
            src:benefitPortalHeadInfo.benefit.image.src,
            width:benefitPortalHeadInfo.benefit.image.width,
            height:benefitPortalHeadInfo.benefit.image.height
        },
        url

    }
}
