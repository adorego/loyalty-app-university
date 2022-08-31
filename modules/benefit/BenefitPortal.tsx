import BasicCard from "../../common/Layout/BasicCard";
import BenefitPortalModel from "../../common/models/benefitPortalModel";
import Button from "../../common/UI/Button";
import classes from "./BenefitPortal.module.css";

export interface BenefitPortalProps{
    mainData:BenefitPortalModel;
    secondaryLightColor:string;

}
const BenefitPortal = (props:BenefitPortalProps) =>{

    return(
        <div className={classes.container}>
            <section id="#topBenefit">
                <BasicCard >
                    <h3 className={classes.title}>{props.mainData.title}</h3>
                    <h5 className={classes.description} style={{color:props.secondaryLightColor}}>{props.mainData.description}</h5>
                    <h5 className={classes.code}>{props.mainData.benefitCode}</h5>
                    <h5 className={classes.validity}>{props.mainData.validity}</h5>
                    <Button label="Contactarme" isAvailable={true} 
                                
                                additionalStyle={{backgroundColor:props.secondaryLightColor,
                                color:"var(--loyalty-on-primary-text-color)", width:"100%",
                                margin:"16px 0px 32px 0px"}}
                                />
                </BasicCard>
            </section>
            <section id="#institucional">
                
            </section>
        </div>
    )
}

export default BenefitPortal;