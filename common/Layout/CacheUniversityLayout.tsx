import { ReactNode, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import { AppDispatch } from "../../store";
import Head from "next/head";
import Notification from "../UI/Notification";
import UniversityHeader from "./UniversityHeader";
import spinnerClasses from '../../styles/spinner.module.css';
import { uiActions } from "../../store/ui-slice";

export interface CachedUniversityLayoutProps{
    children:ReactNode;
}

const CachedUniversityLayout = ({children}:CachedUniversityLayoutProps) =>{
    const colors = useAppSelector(state => state.ui.color);
    const logo = useAppSelector(state => state.auth.university.logo);
    const favicon = useAppSelector(state => state.auth.university.favicon);
    const {title, description} = useAppSelector(state => state.ui.head);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.ui.loading);
    const notification = useAppSelector(state => state.ui.notification);
    const router = useRouter();

    console.log("logo:", logo);
    
    useEffect(
        () =>{
            if(notification.show){
                setTimeout(
                    () => {
                        dispatch(uiActions.showNotification({show:false, message:'', color:"green"}))
                    }, 4000
                )
            }
        },[notification.show]
    )

    useEffect(
        () =>{
          setupRouterEvents(dispatch, router);
          return () => {
                setOffRouterEvents(dispatch, router);
            }
        },[]
    )

    const dataIsAvailable = () =>{
        if(colors.primary !== "" && colors.secondary !== "" && logo && logo.src !== "" && favicon !== ""){
            return true
        }
        return false
    }

    
        return(
                <>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="keywords" content={title} />
                    <meta name="author" content="LoyaltyAPP Inc" />
                    <link rel="icon" href={favicon} />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                {loading && <div className={spinnerClasses.spin} ></div>}
                {notification.show && <Notification message={notification.message} color= {notification.color} />}
                <UniversityHeader 
                        backGroundColor={colors.primary} 
                        logo={logo}
                        loginLinkColor={colors.secondary} /> 
                <main>
                    {children}
                </main>
                
                </>
            )
        
    
    
    
}

const setupRouterEvents = (dispatch:AppDispatch, router:any) =>{
  
  
    const loadingHandler = (loadingState:boolean) =>{
      dispatch(uiActions.setLoading(loadingState));
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