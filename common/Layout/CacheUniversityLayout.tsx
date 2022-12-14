import { ReactNode, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import { AppDispatch } from "../../store";
import Head from "next/head";
import Notification from "../UI/Notification";
import UniversityHeader from "./UniversityHeader";
import UniversityPortalHeadingInfo from "../models/universityPortalHeadingInfo";
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";

export interface CachedUniversityLayoutProps{
    children:ReactNode;
    headInfo:UniversityPortalHeadingInfo;
    headerBackgroundColor:string;
    logoWidth:string;
    loginColor:string;
    
}

const CachedUniversityLayout = ({children, ...props}:CachedUniversityLayoutProps) =>{
    const colors = useAppSelector(state => state.ui.color);
    const logo = useAppSelector(state => state.auth.university.logo);
    const favicon = useAppSelector(state => state.auth.university.favicon);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.ui.loading);
    const notification = useAppSelector(state => state.ui.notification);
    const router = useRouter();

    // console.log("props:", props);
    
    
    useEffect(
        () =>{
            if(notification.show){
                setTimeout(
                    () => {
                        dispatch(uiActions.showNotification({show:false, message:'', color:"green"}))
                    }, 4000
                )
            }
        },[notification.show, dispatch]
    )

    useEffect(
        () =>{
          setupRouterEvents(dispatch, router);
          return () => {
                setOffRouterEvents(dispatch, router);
            }
        },[dispatch, router]
    )

    const dataIsAvailable = () =>{
        if(colors.primary !== "" && colors.secondary !== "" && logo && logo.src !== "" && favicon !== ""){
            return true
        }
        return false
    }

    // console.log("dataIsAvailable:", dataIsAvailable());
    
        return(
                <>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="keywords" content={props?.headInfo?.description} />
                    <meta name="author" content="LoyaltyAPP Inc" />
                    <link rel="icon" href={props?.headInfo?.favicon} />
                    <title>{props?.headInfo?.title}</title>
                    <meta name="description" content={props?.headInfo?.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:url" content={props?.headInfo?.url} key="ogurl" />
                    <meta property="og:image" itemProp="image" content={props?.headInfo?.social_image.src} key="ogimage" />
                    <meta property="og:type" content="website" />
                    <meta property="og:updated_time" content="1440432930" />
                    <meta property="og:site_name" content={props?.headInfo?.title} key="ogsitename" />
                    <meta property="og:title" content={props?.headInfo?.title} key="ogtitle" />
                    <meta property="og:description" content={props?.headInfo?.description} key="ogdesc" />
                </Head>
                {loading && <div className={spinnerClasses.spin} ></div>}
                {notification.show && <Notification message={notification.message} color=??{notification.color} />}
                {dataIsAvailable() && <UniversityHeader 
                        backGroundColor={props.headerBackgroundColor ? props.headerBackgroundColor : colors.primary} 
                        logo={logo}
                        logoWidth={props.logoWidth}
                        loginLinkColor={props.loginColor} />}
                <main>
                    {children}
                </main>
                
                </>
            )
        
    
    
    
}

const setupRouterEvents = (dispatch:AppDispatch, router:any) =>{
  
  
    const loadingHandler = (loadingState:boolean) =>{
      dispatch(uiActions.setLoading({loading:loadingState}));
    }
    //Router events binding
    router.events.on('routeChangeStart', () => loadingHandler(true))
    router.events.on('routeChangeComplete', () => loadingHandler(false));
    router.events.on('routeChangeError', () => loadingHandler(false));
}

const setOffRouterEvents = (dispatch:AppDispatch, router:any) =>{
    const loadingHandler = (loadingState:boolean) =>{
        dispatch(uiActions.setLoading(loadingState));
    }
    router.events.off('routeChangeStart', () => loadingHandler(true))
    router.events.off('routeChangeComplete', () => loadingHandler(false))
    router.events.off('routeChangeError', () => loadingHandler(false))
}

export default CachedUniversityLayout;