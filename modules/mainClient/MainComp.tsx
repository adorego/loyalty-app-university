import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import AwardsTab from "./AwardTab";
import BenefitsToShare from "./BenefitsToShare";
import { ConfiguredAward } from "../../common/models/configuredAward";
import { ConfiguredBenefit } from "../../common/models/configuredBenefit";
import { authActions } from "../../store/auth-slice";
import classes from './MainComp.module.css';
import { fetchAuthData } from "../../store/auth-actions";
import { fetchPortalData } from "../../store/ui-actions";
import spinnerClasses from '../../styles/spinner.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface MainCompProps{
    points:string;
    configuredAwards:Array<ConfiguredAward>;
    benefitsToShare:Array<ConfiguredBenefit>;
}

const MainComp = (props:MainCompProps) =>{
    const [selectedTab, setSelectedTab] = useState("awards");
    const colors = useAppSelector(state => state.ui.color);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const router = useRouter();
    const {universitySigla} = router.query;
    const {data:session, status} = useSession();
    const user = useAppSelector(state => state.auth.user);

    // console.log("props.benefitsToShare:", props.benefitsToShare);


    const awardsStyleSelectedTab = selectedTab === 'awards' ? {color:colors.secondaryLight} : {color:"var(--loyalty-on-surface-text-color)"};
    const winPointsStyleSelectedTab = selectedTab === 'winpoints' ? {color:colors.secondaryLight} : {color:"var(--loyalty-on-surface-text-color)"};
    
    const selectTab = (e:React.SyntheticEvent<HTMLButtonElement>) =>{
        // console.log("selected tab:", e.target.value);
        const currentValue = e.target as any;
        setSelectedTab(currentValue.value as any);
    }

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

    useEffect(
        () =>{
            if(user.id === "" && sigla !== ""){
                dispatch(fetchAuthData(sigla));
            }
        }
    )

    if(loading){
        return(
            <div className={spinnerClasses.spin}></div>
        )
    }
    
    return(
       
        <div className={classes.container}>
            <nav className={classes.tabContainer}>
                <button value={"awards"} style={awardsStyleSelectedTab} className={classes.tabLink} onClick={selectTab}>Tus Puntos</button>
                <button value={"winpoints"} style={winPointsStyleSelectedTab} className={classes.tabLink} onClick={selectTab}>Ganá Puntos</button>
            </nav>
            <div className={classes.mainContentContainer}>
                {selectedTab === "awards" && <AwardsTab points={props.points} 
                primary_color={colors.primary}
                secondary_color={colors.secondaryLight} configuredAwards={props.configuredAwards} />}
                {selectedTab === "winpoints" && <BenefitsToShare benefitsToShare={props.benefitsToShare}
                colors={colors} />}
            </div>
        </div>
        
    )
}

export default MainComp;