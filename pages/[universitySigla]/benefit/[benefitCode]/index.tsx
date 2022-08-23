import BenefitLayout from "../../../../common/Layout/BenefitLayout";
import CachedUniversityLayout from "../../../../common/Layout/CacheUniversityLayout";
import { Fragment } from "react";
import { GetStaticProps } from "next/types";
import Head from 'next/head';
import PageWithLayoutType from "../../../../types/PageWithLayout";
import { connect } from "../../../../common/DataBase/Connect";
import path from "path";
import { useRouter } from "next/router";

export interface BenefitPageProps{
    name:string;
    lastName:string;
    
}
const BenefitPage = (props:BenefitPageProps) =>{
    const router = useRouter();
    const {benefitCode} = router.query; 

    // console.log("props:", props);
    return(
        <Fragment>
            <p>Su código de beneficio es:{benefitCode}</p>
        </Fragment>
    )
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
    // console.log("paths:", JSON.stringify(paths));
    
    
    return{
        paths:paths,
        fallback:false
    }

    
}

type ParamType = {
    benefitCode:string
}
export const getStaticProps:GetStaticProps = async(context) => {
    // console.log("context:", context);
    const db = await connect();
    const university_campaign_leads_collection = db.collection("university.campaign_leads");
    const campaign_leads_data = await university_campaign_leads_collection.findOne({"campaign_leads.benefit_code":context?.params?.benefitCode});
    console.log("campaign_leads_data:", campaign_leads_data);
    const benefitData = JSON.parse(JSON.stringify(campaign_leads_data));

    return{
        props: {
            headInfo:{
                title:"Beneficio exclusivo para Soledad Gonzalez", 
                description:"Con este beneficio tenés 500.000Gs de descuento en cualquier diplomado UCOM",
                favicon:"/images/ucom/favicon.png",
                social_image:{
                    src:"https://loyaltyapp.com.py/images/ucom/social_ucom1200x630.png",
                    width:"1200",
                    height:"600"
                },
                url:"https://loyaltyapp.com.py/ucom/beneficio/787878UCSG"
            }
        }
    }

}
