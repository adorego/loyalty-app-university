import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";

import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import PageWithLayoutType from "../../../types/PageWithLayout";
import VerificationCode from "../../../modules/auth/VerificationCode";
import { fetchPortalData } from "../../../store/ui-actions";
import spinnerClasses from '../../../styles/spinner.module.css';
import {useRouter} from "next/router";
import {useSession} from 'next-auth/react';

export interface EmailConfirmationProps{
    children:ReactNode;
}

const EmailConfirmation = (props:EmailConfirmationProps) =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {universitySigla} = router.query;
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const [loading, setLoading] = useState(false);
    
    useEffect(
        () =>{
            
            if(sigla === ""){
                setLoading(true);
                universitySigla !== undefined ? dispatch(fetchPortalData(String(universitySigla))) : "";
                 
            }else{
                setLoading(false);
               
            }
        },[sigla, universitySigla, dispatch]
    )
    if(loading){
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }
    return(
        <VerificationCode />
            
    )
    
    
}

(EmailConfirmation as PageWithLayoutType).layout = CachedUniversityLayout
export default EmailConfirmation;


