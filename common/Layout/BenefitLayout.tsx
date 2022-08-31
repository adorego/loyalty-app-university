import { Fragment, ReactNode, useEffect, useState } from "react";

import Head from 'next/head';
import ImageModel from "../models/ImageModel";
import spinnerClasses from '../../styles/spinner.module.css';
import {useRouter} from 'next/router';

export interface BenefitPortalHead{
    title:string;
    description:string;
    favicon:string;
    social_image:ImageModel;
    url:string;


}
export interface BenefitLayoutProps{
    children:ReactNode;
    headInfo:BenefitPortalHead;
}

const BenefitLayout = ({children, ...props}:BenefitLayoutProps) =>{
    const router = useRouter();
    const {universitySigla:sigla} = router.query;
    const [loading, setLoading] = useState(true);
    
    useEffect(
        () =>{
            if(sigla){
                
            }
        },[]
    )
    if(loading){
        <div className={spinnerClasses.spin}></div>
    }
    if(Object.entries(props).length > 0){
        return(
            <Fragment>
            <Head>
            <meta charSet="UTF-8" />
                        <meta name="keywords" content={props.headInfo.title} />
                        <meta name="author" content="LoyaltyAPP Inc" />
                        <link rel="icon" href={props.headInfo.favicon ? props.headInfo.favicon : '/favicon.png'} />
                        <title>{props.headInfo.title}</title>
                        <meta name="description" content={props.headInfo.description} />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta property="og:url" content={props.headInfo.url} key="ogurl" />
                        <meta property="og:image" itemProp="image" content={props.headInfo.social_image.src} key="ogimage" />
                        <meta property="og:type" content="website" />
                        <meta property="og:updated_time" content="1440432930" />
                        <meta property="og:site_name" content={props.headInfo.title} key="ogsitename" />
                        <meta property="og:title" content={props.headInfo.title} key="ogtitle" />
                        <meta property="og:description" content={props.headInfo.description} key="ogdesc" />
            </Head>
        
            <main>
                {children}
            </main>
            </Fragment>
        )
    }else{
        return(
            <main>
                {children}
            </main>
        )
    }
}

export default BenefitLayout;