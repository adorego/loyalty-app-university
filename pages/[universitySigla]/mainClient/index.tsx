import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import { ConfiguredAward } from "../../../common/models/configuredAward";
import { ConfiguredBenefit } from "../../../common/models/configuredBenefit";
import { GetServerSideProps } from "next/types";
import MainComp from "../../../modules/mainClient/MainComp";
import PageWithLayoutType from "../../../types/PageWithLayout";
import spinnerClass from '../../../styles/spinner.module.css';
import { useAppSelector } from "../../../hooks/store-hooks";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

export interface MainProps{
    points:string;
    configuredAwards:Array<ConfiguredAward>;
    benefitsToShare:Array<ConfiguredBenefit>;
}
const Main = (props:MainProps) =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);

    
    if(status === 'authenticated'){
        return(
            <MainComp points={props.points} configuredAwards={props.configuredAwards} 
            benefitsToShare={props.benefitsToShare} />
        )
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
    const {universitySigla} = context.query;
    // const url = new URL(`http://localhost:3000/api/v1/university/${universitySigla}/portal`);
    // const result = await fetch(url.href);
    // const data = await result.json();
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
                granting:[{
                    points_to_grant:"800",
                    business_event:"REGISTRATION"
                }]
            }
        ]
    }
    
    return{
        props:{
            ...data,
            loading:false
        }
    }
        
}