import { BUSINESS_EVENTS, GrantingBenefit } from "../../common/models/grantingBenefit";

import BasicCard from "../../common/Layout/BasicCard";
import Button from "../../common/UI/Button";
import Image from "next/image";
import ImageModel from "../../common/models/ImageModel";
import classes from './BenefitToShareCard.module.css';
import { colors_app } from "../../common/models/colors";

export interface BenefitToShareCardProps{
    benefit_id:string;
    benefitDescription:string;
    benefitImage:ImageModel;
    granting_events:Array<GrantingBenefit>;
    colors:colors_app;
    onClickShareHandler: (benefit_id:string) => void;
}
const BenefitToShareCard = (props:BenefitToShareCardProps) =>{
    
    const onShareButtonClickHandler = () =>{
        props.onClickShareHandler(props.benefit_id);
    }
    return(
        <BasicCard>
         <div className={classes.container}>
            <h6 className={classes.benefitDescription}>{props.benefitDescription}</h6>
            {/* <hr /> */}
            <div className={classes.ImagePointsContainer}>
                {props.benefitImage.src && 
                <div className={classes.imageContainer}>
                    <Image src={props.benefitImage.src} 
                    alt={props.benefitDescription} 
                    width={props.benefitImage.width}
                    height={props.benefitImage.height} /> 
                </div>}
                {props.granting_events.map(
                    (grant, index) =>{
                        
                        return(
                            <div key={index} className={classes.grantPointsContainer}>
                                <h5 className={classes.pointsToGrant} style={{color:props.colors.secondaryLight}}>{grant.points_to_grant}</h5>
                                <p className={classes.pointsTitle} style={{color:props.colors.secondaryLight}}>{"Puntos"}</p>
                                {grant.business_event === "REGISTRATION" && 
                                <p className={classes.pointsEvent}>{"p/ Matriculación"}</p>}
                            </div>
                        )
                    }
                )}
            </div>
            {/* <hr /> */}
            <div className={classes.shareButtonContainer}>
                <Button 
                    onClickHandler={onShareButtonClickHandler}
                    isAvailable={true}
                    label="Compartir" 
                    additionalStyle={{backgroundColor:props.colors.primary, 
                    color:"var(--loyalty-on-primary-text-color)", width:"100%", height:"49px"}}/>
            </div>
        </div>
        </BasicCard>
    )
}

export default BenefitToShareCard;